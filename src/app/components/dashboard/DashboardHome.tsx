import { DASHBOARD, createAPIEndpoint } from "@/lib/constants";
import { fetcher } from "@/lib/utils";
import { TCourse, TDashboard } from "@/types";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import useSWR from "swr";
import CaseStudies from "../../../../public/CaseStudies.svg";
import Certifications from "../../../../public/Certifications.svg";
import KnowledgeBank from "../../../../public/KnowledgeBank.svg";
import Course from "../Course";
import CourseCard from "../CourseCard";
import DashboardBanner from "../DashboardBanner";
import Loader from "../Loader";
import CourseHighlights from "./CourseHighlights";
import SectionHeaders from "./SectionHeaders";

export default function DashboardHome({
  onCategoryCardClick,
  onCourseClick,
  onTopCardsClick,
}: {
  onCategoryCardClick: (items: TCourse) => void;
  onCourseClick: (items: TCourse) => void;
  onTopCardsClick: (index: number) => void;
}) {
  const { data, error, isLoading } = useSWR(
    createAPIEndpoint(`${DASHBOARD}`),
    (url) => fetcher<TDashboard>(url)
  );

  var settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    dotsClass: "!bottom-1.5 slick-dots",
  };

  const bannerItems = [
    {
      header:
        "Unlock your potential with our diverse courses, designed to empower your skills and elevate your career. Start learning today and lead with confidence tomorrow!",
      left: "#87CEFA",
      right: "#CEE4F2",
    },
    {
      header:
        "Discover a treasure trove of knowledge with our extensive library of articles and resources. Stay informed, stay ahead, and fuel your passion for learning.",
      left: "#FF9960",
      right: "#FFD9C4",
    },
    {
      header:
        "Dive into our case studies to explore real-world solutions and success stories. Learn from the best, gain practical insights, and inspire your own journey to success.",
      left: "#8CFF79",
      right: "#CDFFC4",
    },
  ];

  const headerCardItems = [
    {
      thumbnail: KnowledgeBank,
      header: "Knowledge bank",
      description:
        "Dive into a treasure trove of wisdom with our Knowledge Bank. Whether you're curious or ambitious, find the insights and tools you need to fuel your learning journey. Your quest for knowledge starts here!",
    },
    {
      thumbnail: CaseStudies,
      header: "Case studies",
      description:
        "Discover the power of real-world success stories in our Case Studies. See how theory translates into practice, and gain valuable insights from the challenges and triumphs of others. Learn from the best to become the best!",
    },
    {
      thumbnail: Certifications,
      header: "Certifications",
      description:
        "Celebrate your learning milestones with our Certifications. Every badge and certificate you earn reflects your dedication and expertise, empowering you to make a mark in your industry. Proudly display your hard-earned achievements!",
    },
  ];

  return (
    <div className="mt-5 h-full">
      {isLoading ? (
        <div className="flex flex-1 h-full justify-center items-center ">
          <Loader />
        </div>
      ) : (
        <div className="flex w-full flex-col overflow-auto">
          <Slider {...settings}>
            {bannerItems.map((item, index) => (
              <DashboardBanner
                header={item.header}
                left={item.left}
                right={item.right}
                key={index}
              />
            ))}
          </Slider>

          <div className="flex gap-4 mt-10">
            {headerCardItems.map((item, index) => (
              <CourseCard
                header={item.header}
                thumbnail={item.thumbnail}
                description={item.description}
                key={index}
                onClick={() => {
                  onTopCardsClick(index);
                }}
              />
            ))}
          </div>
          <div className="mt-10">
            <CourseHighlights
              creditsEarned={data?.credits ?? 0}
              totalEntrolledCourses={data?.enrolled_course_count ?? 0}
              pendingCourses={data?.pending_course_count ?? 0}
            />
          </div>

          <div className="mt-10">
            <SectionHeaders
              header="Mandatory Courses"
              desc="These Courses are mandatory and needs to be completed within this month"
            />
            <div className="flex w-full gap-5 overflow-x-auto mt-3">
              {data?.mandatory_courses.map((value) => (
                <div key={value.id}>
                  <Course
                    {...value}
                    count_of_lectures={`${value.count_of_lectures} lectures`}
                    onClick={onCourseClick}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 ">
            <SectionHeaders header="Browse through different course category" />
            <div className="flex flex-1 gap-5 overflow-x-auto mt-3">
              {data?.categories.map((value) => (
                <div key={value.id}>
                  <Course
                    id={value.id}
                    title={value.name}
                    description={value.description}
                    thumbnail={value.thumbnail}
                    count_of_lectures={`${value.courses_count} Courses`}
                    onClick={onCategoryCardClick}
                    buttonText="View Courses"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
