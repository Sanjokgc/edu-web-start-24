
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Software Developer",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&auto=format&fit=crop&crop=faces&q=60",
      quote: "EduLearn completely transformed my career. The programming courses were comprehensive and taught me everything I needed to land my dream job.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Marketing Manager",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&auto=format&fit=crop&crop=faces&q=60",
      quote: "The digital marketing courses exceeded my expectations. The instructors were incredibly knowledgeable and the content was up-to-date with industry trends.",
      rating: 5,
    },
    {
      id: 3,
      name: "Jessica Rivera",
      role: "Graphic Designer",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&auto=format&fit=crop&crop=faces&q=60",
      quote: "As a self-taught designer, EduLearn filled in all my knowledge gaps. The design courses offered practical skills that I use daily in my work.",
      rating: 4,
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            What Our Students Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from some of our students who have transformed their careers through our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="mb-4 text-yellow-400">
                  {"★".repeat(testimonial.rating)}
                  {"☆".repeat(5 - testimonial.rating)}
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a href="#" className="text-education-blue font-medium hover:underline">
            Read more testimonials →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
