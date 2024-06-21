import { DASHBOARD, createAPIEndpoint } from "@/lib/constants";
import { fetcher } from "@/lib/utils";
import { TDashboard } from "@/types";
import useSWR from "swr";
import Course from "../Course";
import Loader from "../Loader";
import CourseHighlights from "./CourseHighlights";
import SectionHeaders from "./SectionHeaders";
import CourseCard from "../CourseCard";
import DashboardBanner from "../DashboardBanner";
import KnowledgeBank from "../../../../public/KnowledgeBank.svg";
import CaseStudies from "../../../../public/CaseStudies.svg";
import Certifications from "../../../../public/Certifications.svg";
import {
  Carousel,
  CarouselContent,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

export default function DashboardHome({
  onClick,
}: {
  onClick: (id: string, title: string, thumbnail: string) => void;
}) {
  const { data, error, isLoading } = useSWR(
    createAPIEndpoint(`${DASHBOARD}`),
    (url) => fetcher<TDashboard>(url)
  );

  const bannerItems = [
    { header: 'Ignite Your Potential, Achieve Greatness: Start Learning with Our Courses', color: '#3498DB' },
    { header: 'Your Gateway to Unlimited Learning Resources', color: '#7F56D9' },
    { header: 'Real Stories, Real Impact: In-Depth Case Studies Await', color: '#F2A000' }
  ];

  const headerCardItems = [
    {
      thumbnail: KnowledgeBank,
      header:"Knowledge bank",
      description:"Dive into a treasure trove of wisdom with our Knowledge Bank. Whether you're curious or ambitious, find the insights and tools you need to fuel your learning journey. Your quest for knowledge starts here!"
    },{
      thumbnail: CaseStudies,
      header:"Case studies",
      description:"Discover the power of real-world success stories in our Case Studies. See how theory translates into practice, and gain valuable insights from the challenges and triumphs of others. Learn from the best to become the best!"
    },{
      thumbnail: Certifications,
      header:"Certifications",
      description:"Celebrate your learning milestones with our Certifications. Every badge and certificate you earn reflects your dedication and expertise, empowering you to make a mark in your industry. Proudly display your hard-earned achievements!"
    }
  ]

  return (
    <div className="mt-5 h-full">
      {isLoading ? (
        <div className="flex flex-1 h-full justify-center items-center ">
          <Loader />
        </div>
      ) : (
        <div className="flex w-full flex-col overflow-auto">
          
          <Carousel className="mx-auto" plugins={[
                  Autoplay({
                           delay: 4000,
                          }),
          ]}>
              <CarouselContent className="ml-0 flex gap-4">
              {bannerItems.map((item,index) => (
                  <DashboardBanner header={item.header} color={item.color} key={index}/>
              ))}
              </CarouselContent>
          </Carousel>
         
          <div className="flex gap-4 mt-10">
              {headerCardItems.map((item,index) => (
                  <CourseCard header={item.header} thumbnail={item.thumbnail} description={item.description} key={index} />
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

            <div className=" flex w-full gap-5 overflow-x-auto mt-3">
              {data?.mandatory_courses.map((value) => (
                <div key={value.id}>
                  <Course
                    {...value}
                    count_of_lectures={`${value.count_of_lectures} lectures`}
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
                    onClick={onClick}
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
