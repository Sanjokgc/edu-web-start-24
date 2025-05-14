
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CourseCard from "@/components/CourseCard";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Index = () => {
  const featuredCourses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      instructor: "Dr. Sarah Williams",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=60",
      level: "Beginner" as const,
      rating: 4.8,
      reviews: 2435,
      price: "$89.99",
      category: "Programming",
      duration: "12 weeks"
    },
    {
      id: 2,
      title: "Data Science & Machine Learning Fundamentals",
      instructor: "Prof. Michael Chen",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=60",
      level: "Intermediate" as const,
      rating: 4.9,
      reviews: 1876,
      price: "$94.99",
      category: "Data Science",
      duration: "10 weeks"
    },
    {
      id: 3,
      title: "Digital Marketing Strategy Masterclass",
      instructor: "Alicia Rodriguez",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60",
      level: "Beginner" as const,
      rating: 4.7,
      reviews: 1250,
      price: "$69.99",
      category: "Marketing",
      duration: "8 weeks"
    },
    {
      id: 4,
      title: "Advanced UI/UX Design Principles",
      instructor: "Jason Taylor",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=60",
      level: "Advanced" as const,
      rating: 4.9,
      reviews: 920,
      price: "$109.99",
      category: "Design",
      duration: "14 weeks"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <Hero />
      
      {/* Featured Courses */}
      <section id="courses" className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">Featured Courses</h2>
              <p className="text-lg text-gray-600">Explore our most popular courses with high student satisfaction</p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0 border-education-blue text-education-blue hover:bg-blue-50">
              View All Courses
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard
                key={course.id}
                {...course}
              />
            ))}
          </div>
        </div>
      </section>
      
      <Features />
      
      <Testimonials />
      
      {/* Call to Action */}
      <section className="py-20 bg-education-blue text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">Start Your Learning Journey Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already mastering new skills and advancing their careers with EduLearn.
          </p>
          <Button className="bg-white text-education-blue hover:bg-gray-100 font-medium text-lg px-8 py-6">
            Get Started Now
          </Button>
          <p className="mt-4 text-blue-100">No credit card required</p>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
