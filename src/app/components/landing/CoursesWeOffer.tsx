import ModulesWeOffer from "../../../types";

export default function CoursesWeOffer() {
  const modulesWeOfferArray: ModulesWeOffer[] = [
    {
      header: "Healthcare",
      desc: "Empower your healthcare career with comprehensive cutting-edge medical practices and patient care.",
      color: "#7F56D9",
    },
    {
      header: "Technology",
      desc: "Stay ahead with the latest technology trends and innovations.",
      color: "#079455",
    },
    {
      header: "Security & Compliance",
      desc: "Achieve industry standards with rigorous security and compliance training.",
      color: "#1570EF",
    },
    {
      header: "Professional Ethics",
      desc: "Learn the principles of professional behavior and ethical practice.",
      color: "#EE6B9A",
    },
    {
      header: "Finance & Operations",
      desc: "Optimize your financial and operational strategies with expert-led training.",
      color: "#EA9354",
    },
  ];
  return (
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
      </div>
      <div className="mt-10 flex flex-row gap-5 overflow-x-scroll  flex-grow text-white">
        {modulesWeOfferArray.map((value) => (
          <div
            key={value.header}
            className={`flex flex-1 h-[400px] rounded-md shrink-0 p-5 flex-col justify-between`}
            style={{ backgroundColor: value.color }}
          >
            <div className="flex flex-row items-center">
              <p className="ml-2 text-2xl font-bold ">{value.header}</p>
            </div>
            <div className="flex p-5 bg-white/15 rounded-md flex-col min-h-[200px]">
              <span className="font-semibold text-2xl">{value.header}</span>
              <span className="mt-3 text-sm font-medium">{value.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
