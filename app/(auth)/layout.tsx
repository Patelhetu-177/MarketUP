import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session?.user) redirect("/");

  return (
    <main className="auth-layout">
      <section className="auth-left-section scrollbar-hide-default">
        <Link
          href="/"
          className="auth-logo flex items-center gap-2 group select-none"
        >
          <div className="relative">
            <Image
              src="/favicon.ico"
              alt="MarketUP Logo"
              width={50}
              height={50}
              className="h-8 w-8 md:h-10 md:w-10 object-contain 
                 transition-transform duration-300 
                 group-hover:scale-105"
            />

            {/* subtle glow */}
            <span
              className="absolute inset-0 rounded-full 
                 bg-green-500/20 blur-md 
                 opacity-0 group-hover:opacity-100 
                 transition-opacity duration-300"
            />
          </div>

          <h1
            className={cn(
              "hidden md:block text-2xl md:text-4xl font-extrabold tracking-tight",
              "bg-gradient-to-r from-emerald-400 via-green-700 to-lime-700",
              "bg-clip-text text-transparent",
              "drop-shadow-sm transition-all duration-300",
              "group-hover:from-emerald-300 group-hover:to-lime-300",
            )}
          >
            Market<span className="text-yellow-500">UP</span>
          </h1>
        </Link>

        <div className="pb-6 lg:pb-8 flex-1">{children}</div>
      </section>

      <section className="auth-right-section">
        <div className="z-10 relative lg:mt-4 lg:mb-16">
          <blockquote className="auth-blockquote">
            MarketUP turned my watchlist into a winning list. The alerts are
            spot-on, and I feel more confident making moves in the market
          </blockquote>
          <div className="flex items-center justify-between">
            <div>
              <cite className="auth-testimonial-author">- Yash</cite>
              <p className="max-md:text-xs text-gray-500">Retail Investor</p>
            </div>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Image
                  src="/assets/icons/star.svg"
                  alt="Star"
                  key={star}
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <Image
            src="/assets/images/marketup.png"
            alt="Dashboard Preview"
            width={480}
            height={300}
            className="auth-dashboard-preview"
          />
        </div>
      </section>
    </main>
  );
};

export default Layout;