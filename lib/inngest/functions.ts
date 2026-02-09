import { inngest } from "@/lib/inngest/client";
import {
  NEWS_SUMMARY_EMAIL_PROMPT,
  PERSONALIZED_WELCOME_EMAIL_PROMPT,
} from "@/lib/inngest/prompts";
import { sendNewsSummaryEmail, sendWelcomeEmail } from "@/lib/nodemailer";
import { getAllUsersForNewsEmail } from "@/lib/actions/user.actions";
import { getWatchlistSymbols } from "../actions/watchlist.actions";
import { getNews } from "../actions/indianMarket.actions";
import { getFormattedTodayDate } from "@/lib/utils";

export type MarketNewsArticle = {
  title: string;
  url: string;
  source: string;
  datetime: number;
  related?: string;
};

export type UserForNewsEmail = {
  id: string;
  email: string;
  name?: string | null;
};

export const sendSignUpEmail = inngest.createFunction(
  { id: "sign-up-email" },
  { event: "app/user.created" },
  async ({ event, step }) => {
    const userProfile = `
            - Country: ${event.data.country}
            - Investment goals: ${event.data.investmentGoals}
            - Risk tolerance: ${event.data.riskTolerance}
            - Preferred industry: ${event.data.preferredIndustry}
        `;

    const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace(
      "{{userProfile}}",
      userProfile,
    );

    const response = await step.ai.infer("generate-welcome-intro", {
      model: step.ai.models.gemini({ model: "gemini-2.5-flash-lite" }),
      body: {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      },
    });

    await step.run("send-welcome-email", async () => {
      const part = response.candidates?.[0]?.content?.parts?.[0];
      const introText =
        (part && "text" in part ? part.text : null) ||
        "Thanks for joining MarketUP. You now have the tools to track markets and make smarter moves.";

      const {
        data: { email, name },
      } = event;

      return await sendWelcomeEmail({ email, name, intro: introText });
    });

    return {
      success: true,
      message: "Welcome email sent successfully",
    };
  },
);

export const sendDailyNewsSummary = inngest.createFunction(

  { id: "daily-news-summary" },
    [{ event: "app/send.daily.news" }, { cron: "30 6 * * *" }], // 12 PM IST
  // [{ event: "app/send.daily.news" }, { cron: "*/2 * * * *" }],

  async ({ step }) => {
    const users = (await step.run(
      "get-all-users",
      getAllUsersForNewsEmail,
    )) as UserForNewsEmail[];

    if (!users.length) {
      return { success: false, message: "No users found" };
    }

    const results = await step.run("fetch-user-news", async () => {
      const perUser: {
        user: UserForNewsEmail;
        articles: MarketNewsArticle[];
      }[] = [];

      for (const user of users) {
        try {
          // Pass user.email to fetch symbols for this specific user
          const symbols = await getWatchlistSymbols(user.email);

          let articles = await getNews(symbols);
          articles = articles.slice(0, 6);

          // Fallback to general Indian market news
          if (!articles.length) {
            articles = (await getNews()).slice(0, 6);
          }

          const formattedArticles: MarketNewsArticle[] = articles.map((article: any) => ({
            title: article.headline || "",
            url: article.url || "",
            source: article.source || "",
            datetime: article.datetime || 0,
            related: article.related,
          }));

          perUser.push({ user, articles: formattedArticles });
        } catch (err) {
          console.error("News fetch failed for:", user.email, err);
          perUser.push({ user, articles: [] });
        }
      }

      return perUser;
    });

    const summaries: {
      user: UserForNewsEmail;
      newsContent: string | null;
    }[] = [];

    for (const { user, articles } of results) {
      try {
        const prompt = NEWS_SUMMARY_EMAIL_PROMPT.replace(
          "{{newsData}}",
          JSON.stringify(articles, null, 2),
        );

        const response = await step.ai.infer(`summarize-news-${user.email}`, {
          model: step.ai.models.gemini({
            model: "gemini-2.5-flash-lite",
          }),
          body: {
            contents: [{ role: "user", parts: [{ text: prompt }] }],
          },
        });

        const part = response.candidates?.[0]?.content?.parts?.[0];
        const newsContent = part && "text" in part ? part.text : null;

        summaries.push({ user, newsContent });
      } catch (err) {
        console.error("AI summary failed for:", user.email);
        summaries.push({ user, newsContent: null });
      }
    }

    await step.run("send-news-emails", async () => {
      await Promise.all(
        summaries.map(({ user, newsContent }) => {
          if (!newsContent) return Promise.resolve(false);

          return sendNewsSummaryEmail({
            email: user.email,
            date: getFormattedTodayDate(),
            newsContent,
          });
        }),
      );
    });

    return {
      success: true,
      message: "Daily Indian market news emails sent",
    };
  },
);
