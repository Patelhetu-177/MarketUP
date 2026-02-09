import nodemailer from 'nodemailer';
import {WELCOME_EMAIL_TEMPLATE, NEWS_SUMMARY_EMAIL_TEMPLATE} from "@/lib/nodemailer/templates";

interface WelcomeEmailData {
    email: string;
    name: string;
    intro: string;
}

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_EMAIL!,
        pass: process.env.NODEMAILER_PASSWORD!,
    }
})

export const sendWelcomeEmail = async ({ email, name, intro }: WelcomeEmailData) => {
    const unsubscribeUrl = `${process.env.BETTER_AUTH_URL}/api/unsubscribe?email=${encodeURIComponent(email)}`;
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE
        .replace('{{name}}', name)
        .replace('{{intro}}', intro)
        .replace('{{unsubscribeUrl}}', unsubscribeUrl);

    const mailOptions = {
        from: `"MarketUP" <hetup9432@gmail.com>`,
        to: email,
        subject: `Welcome to MarketUP - your stock market toolkit is ready!`,
        text: 'Thanks for joining MarketUP',
        html: htmlTemplate,
    }

    await transporter.sendMail(mailOptions);
}

export const sendNewsSummaryEmail = async (
    { email, date, newsContent }: { email: string; date: string; newsContent: string }
): Promise<void> => {
    const unsubscribeUrl = `${process.env.BETTER_AUTH_URL}/api/unsubscribe?email=${encodeURIComponent(email)}`;
    const htmlTemplate = NEWS_SUMMARY_EMAIL_TEMPLATE
        .replace('{{date}}', date)
        .replace('{{newsContent}}', newsContent)
        .replace('{{unsubscribeUrl}}', unsubscribeUrl);

    const mailOptions = {
        from: `"MarketUP News" <hetup9432@gmail.com>`,
        to: email,
        subject: `📈 Market News Summary Today - ${date}`,
        text: `Today's market news summary from MarketUP`,
        html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions);
};