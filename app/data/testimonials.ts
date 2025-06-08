export interface Testimonial {
  id: string
  name: string
  course: string
  quote: string
  avatarUrl: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Priya Sharma",
    course: "Full Stack Development",
    quote:
      "Techverse transformed my career! The instructors are amazing and the curriculum is top-notch. I landed my dream job within 3 months of completing the course.",
    avatarUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
    rating: 5,
  },
  {
    id: "2",
    name: "Rahul Verma",
    course: "Data Science",
    quote:
      "I learned so much and landed my dream job thanks to Techverse. The practical projects and mentorship made all the difference. Highly recommended!",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    rating: 5,
  },
  {
    id: "3",
    name: "Anjali Singh",
    course: "Digital Marketing",
    quote:
      "The practical skills I gained here are invaluable. The community is also very supportive. I started my own digital marketing agency after completing this course.",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    rating: 5,
  },
  {
    id: "4",
    name: "Arjun Patel",
    course: "Python Programming",
    quote:
      "As a complete beginner, I was worried about learning programming. But Techverse made it so easy and fun. Now I'm working as a Python developer!",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    rating: 5,
  },
  {
    id: "5",
    name: "Sneha Reddy",
    course: "Cyber Security",
    quote:
      "The cybersecurity course was comprehensive and up-to-date. The hands-on labs and real-world scenarios prepared me well for my current role as a security analyst.",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
    rating: 5,
  },
  {
    id: "6",
    name: "Vikram Kumar",
    course: "Cloud Computing",
    quote:
      "Excellent course content and expert instructors. I got AWS certified and doubled my salary. The investment in this course was totally worth it!",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    rating: 5,
  },
]
