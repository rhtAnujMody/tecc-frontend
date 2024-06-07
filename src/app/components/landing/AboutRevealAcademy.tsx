import Image from "next/image";
import about from "../../../../public/landing-about.svg";

export default function AboutRevealAcademy() {
  return (
    <div className="h-auto flex flex-1 px-14 py-24 justify-center flex-col items-center">
      <p className="text-textPrimary font-semibold text-4xl">
        {`About Reveal Academy`}
      </p>
      <p className="text-textPrimary text-xl font-normal mt-5 max-w-[800px] text-center">
        Reveal Academy is an initiative by Reveal Healthtech to bridge the gap
        between healthcare and technology. Our mission is to empower
        professionals with the knowledge and skills needed to craft solutions in
        the healthtech sector.
      </p>
      <Image
        placeholder="empty"
        src={about}
        alt="about"
        className="mt-10 w-auto h-auto"
        priority={false}
      />
    </div>
  );
}
