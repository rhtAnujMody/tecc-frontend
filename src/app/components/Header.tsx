// "use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.svg";

type NavLinks = {
  header: string;
  navigateTo: string;
};

function Header() {
  return (
    <nav className="flex min-h-[80px] sticky top-0 z-10 py-5 px-14 items-center justify-between bg-white">
      <div className="flex">
        <Image src={logo} alt="logo" className="w-auto h-auto"></Image>
      </div>
      <div className="flex items-center " style={{ display: "none" }}>
        <Link href={"/login"} className="font-semibold text-base mr-5">
          Log In
        </Link>

        <Link href={"/signup"}>
          <Button>Sign Up</Button>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
