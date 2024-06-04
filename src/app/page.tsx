import Image from "next/image";
import about from "../../public/landing-about.svg";
import lady from "../../public/landing-girl.svg";
import sdlc from "../../public/sdlc.svg";
import AppButton from "./components/AppButton";
import Header from "./components/Header";
import modulesWeOffer from "./types";

export default function Home() {
  const modulesWeOfferArray: modulesWeOffer[] = [
    { header: "A", desc: "A desc", logo: sdlc, color: "#7F56D9" },
    { header: "B", desc: "B desc", logo: sdlc, color: "#079455" },
    { header: "C", desc: "C desc", logo: sdlc, color: "#1570EF" },
    { header: "D", desc: "D desc", logo: sdlc, color: "#E04F16" },
    { header: "E", desc: "E desc", logo: sdlc, color: "#E04F16" },
    { header: "F", desc: "F desc", logo: sdlc, color: "#E04F16" },
  ];

  return (
    <main className="flex relative flex-col  bg-white">
      <Header />
      <section id="a" className="h-auto flex flex-1 justify-between px-14">
        <div className="flex flex-col max-w-[800px]  justify-center ">
          <p className="text-textPrimary font-semibold text-[60px]">
            {`Welcome to Reveal \nAcademy`}
          </p>
          <p className="text-textPrimary text-xl font-normal mt-5">
            Bridging the divide between Healthcare & Technology. Empowering
            professionals with cutting-edge skills and knowledge.
          </p>
          <div className="mt-5">
            <AppButton title="Get Started" />
          </div>
        </div>
        <Image src={lady} alt="lady" />
      </section>

      <section
        id="b"
        className="h-auto flex flex-1 px-14 py-24 justify-center flex-col items-center"
      >
        <p className="text-textPrimary font-semibold text-4xl">
          {`About Reveal Academy`}
        </p>
        <p className="text-textPrimary text-xl font-normal mt-5 max-w-[800px] text-center">
          Reveal Academy is an initiative by Reveal Healthtech to bridge the gap
          between healthcare and technology. Our mission is to empower
          professionals with the knowledge and skills needed to craft solutions
          in the healthtech sector.
        </p>
        <Image src={about} alt="about" className="mt-10 w-auto"></Image>
      </section>
      <section id="c" className="h-auto flex flex-1 px-14 py-20 flex-col ">
        <div className="flex flex-1 gap-10">
          <div className="flex basis-3/5 flex-col ">
            <p className="text-textPrimary font-semibold text-4xl">
              {`Couses We Offer`}
            </p>
            <p className="mt-5">
              Reveal Academy is an initiative by Reveal Healthtech to bridge the
              gap between healthcare and technology. Our mission is to empower
              professionals with the knowledge and skills needed to craft
              value-based solutions in the healthtech sector.
            </p>
          </div>
          {/* <div className="flex flex-1 justify-end gap-5">
            <div>
              <AppButton title="Explore All Courses"></AppButton>
            </div>
            <div>
              <AppButton title="Create Account"></AppButton>
            </div>
          </div> */}
        </div>
        <div className="mt-10 flex flex-row gap-5 overflow-x-scroll  flex-grow text-white">
          {modulesWeOfferArray.map((value) => (
            <div
              key={value.header}
              className={`flex w-[300px] h-[400px] rounded-md shrink-0 p-5 flex-col justify-between`}
              style={{ backgroundColor: value.color }}
            >
              <div className="flex flex-row items-center">
                <Image
                  src={value.logo}
                  alt="sldc"
                  width={40}
                  height={40}
                ></Image>
                <p className="ml-2 text-2xl font-bold ">{value.header}</p>
              </div>
              <div className="flex p-5 bg-white/70 rounded-md flex-col">
                <span className="font-semibold text-3xl">{value.header}</span>
                <span className="mt-3 text-lg font-medium">{value.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
