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
  const navArray: NavLinks[] = [
    { header: "Home", navigateTo: "#a" },
    { header: "Courses", navigateTo: "#c" },
    { header: "Resources", navigateTo: "#d" },
    { header: "Contact Us", navigateTo: "#e" },
  ];

  // const path = usePathname();
  // console.log("path", path);

  // useEffect(() => {
  //   console.log("path", path);
  // }, [path]);

  return (
    <nav className="flex min-h-[80px] sticky top-0 z-10 py-5 px-14 items-center justify-between bg-white">
      <div className="flex">
        <Image src={logo} alt="logo" className="w-auto h-auto"></Image>
        {/* <div className="ml-10 flex gap-5">
          {navArray.map((value) => {
            return (
              <Link
                key={value.header}
                href={value.navigateTo}
                className="text-textPrimary font-semibold text-base"
              >
                {value.header}
              </Link>
            );
          })}
        </div> */}
      </div>
      <div className="flex items-center">
        <Link href={"/login"} className="font-semibold text-base mr-5">
          Log In
        </Link>
        <Button>
          <Link href={"/signup"}>Sign Up</Link>
        </Button>
      </div>
    </nav>
  );
}

export default Header;
