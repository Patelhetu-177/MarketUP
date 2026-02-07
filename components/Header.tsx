import Link from "next/link";
import Image from "next/image";
import NavItems from "@/components/NavItems";
import UserDropdown from "@/components/UserDropdown";
// import { searchStocks } from "@/lib/actions/finnhub.actions";

const Header = async ({ user }: { user: User }) => {
//   const initialStocks = await searchStocks();

  return (
    <header className="sticky top-0 header">
      <div className="container header-wrapper">
        <Link href="/">
          <Image
            src="/assets/icons/logo.png"
            alt="MarketUP logo"
            width={180}
            height={80}
            className="cursor-pointer"
            style={{
              borderRadius: "15px",
            }}
          />
        </Link>
        <nav className="hidden sm:block">
          {/* <NavItems initialStocks={initialStocks} /> */}
          <NavItems/>
        </nav>

        {/* <UserDropdown user={user} initialStocks={initialStocks} /> */}

        <UserDropdown user={user} />
      </div>
    </header>
  );
};
export default Header;
