import { courses } from "@/app/data/courses"
import CourseCard from "./course-card"
import { GraduationCap } from "lucide-react"

export default function CoursesSection() {
  return (
    <section id="courses" className="py-16 sm:py-20 bg-slate-950 text-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <GraduationCap className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-bold text-cyan-400">Our Courses</h2>
          <p className="text-lg text-slate-400 mt-2 max-w-xl mx-auto">
            Choose from a wide range of courses designed to boost your career.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  )
}
