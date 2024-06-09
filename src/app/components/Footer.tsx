import Image from "next/image";
import facebook from "../../../public/facebook.svg";
import linkedIn from "../../../public/linkedin.svg";
import logoTransparent from "../../../public/logo-transparent.svg";
import x from "../../../public/x.svg";
import { TSocialHandles } from "@/types";

export default function Footer() {
  const socialHandles: TSocialHandles[] = [
    {
      logo: x,
      link: "https://www.linkedin.com/company/reveal-healthtech/",
    },
    {
      logo: linkedIn,
      link: "https://www.linkedin.com/company/reveal-healthtech/",
    },
    {
      logo: facebook,
      link: "https://www.linkedin.com/company/reveal-healthtech/",
    },
  ];

  return (
    <div className="bg-[#1B1C1F] p-10 ">
      <div className="pb-5 border-slate-50 border-b ">
        <Image src={logoTransparent} alt="logo" />
        <span className="text-white">
          We prioritize clinical perspectives throughout software development
        </span>
      </div>
      <div className="mt-5 flex flex-1 justify-between items-center ">
        <span className="text-white">
          © 2024 Reveal Healthtech. All rights reserved.
        </span>
        {/* <div className="flex gap-5">
          {socialHandles.map((value, index) => (
            <div key={index}>
              <a href={value.link} target="_blank">
                <Image src={value.logo} alt="X" width={20} height={20} />
              </a>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}
