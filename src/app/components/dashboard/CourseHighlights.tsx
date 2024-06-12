import CourseHighlightCard from "./CourseHighlightCard";
import SectionHeaders from "./SectionHeaders";

export default function CourseHighlights({
  totalEntrolledCourses,
  pendingCourses,
  creditsEarned,
}: {
  totalEntrolledCourses: number;
  pendingCourses: number;
  creditsEarned: number;
}) {
  return (
    <div>
      <SectionHeaders
        header="Course Highlights"
        desc="Here’s your course highlights"
      />
      <div className="flex flex-1 gap-5 mt-3">
        {[1, 2, 3].map((value, index) => {
          switch (index) {
            case 0:
              return (
                <CourseHighlightCard
                  key={value}
                  header="Total Courses Enrolled"
                  value={totalEntrolledCourses}
                />
              );
            case 1:
              return (
                <CourseHighlightCard
                  key={value}
                  header="Pending Courses"
                  value={pendingCourses}
                />
              );
            case 2:
              return (
                <CourseHighlightCard
                  key={value}
                  header="Credits Earned"
                  value={creditsEarned}
                  color="#DDA73D"
                />
              );
          }
        })}
      </div>
    </div>
  );
}
