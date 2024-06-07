import Image from "next/image";
import lady from "../../../../public/landing-girl.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Welcome() {
  return (
    <div id="a" className="h-auto flex flex-1 justify-between px-14">
      <div className="flex flex-col  basis-3/6    justify-center ">
        <p className="text-textPrimary font-semibold text-[60px]">
          {`Welcome to Reveal \nAcademy`}
        </p>
        <p className="text-textPrimary text-xl font-normal mt-5">
          Bridging the divide between Healthcare & Technology. Empowering
          professionals with cutting-edge skills and knowledge.
        </p>
        <div className="mt-5">
          <Link href={"/login"}>
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
      <div className=" flex flex-1 py-10 ">
        <Image
          placeholder="empty"
          src={lady}
          alt="lady"
          className="w-full rounded-lg"
          priority={false}
        />
      </div>
    </div>
  );
}
