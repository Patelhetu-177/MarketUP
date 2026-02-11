import Link from "next/link";
import Image from "next/image";
import NavItems from "@/components/NavItems";
import UserDropdown from "@/components/UserDropdown";
import { searchStocks } from "@/lib/actions/indianMarket.actions";
import { cn } from "@/lib/utils";

const Header = async ({ user }: { user: User }) => {
  const initialStocks = await searchStocks();

  return (
    <header className="sticky top-0 header">
      <div className="container header-wrapper">
        <Link href="/" className=" flex items-center gap-1">
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
        <nav className="hidden sm:block">
          <NavItems initialStocks={initialStocks} />
        </nav>

        <UserDropdown user={user} initialStocks={initialStocks} />
      </div>
    </header>
  );
};

export default Header;