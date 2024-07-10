import Image from "next/image";
import about from "../../../../public/landing-about.svg";

export default function AboutRevealAcademy() {
  return (
    <div className="h-auto flex flex-1 px-14 py-24 justify-center flex-col items-center">
      <p className="text-textPrimary font-semibold text-4xl">
        {`About Reveal Academy`}
      </p>
      <p className="text-textPrimary text-xl font-normal mt-5 max-w-[800px] text-center">
        Reveal Academy, an initiative by Reveal HealthTech, is your one-stop
        solution for comprehensive knowledge transfer, specialized courses,
        product knowledge, insightful case studies, and industry-recognized
        certifications. Our platform is designed to empower healthcare
        professionals and technologists with the expertise and skills needed to
        excel in the dynamic HealthTech sector. Join us to stay ahead with
        cutting-edge education and practical insights, bridging the divide
        between healthcare and technology.
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
