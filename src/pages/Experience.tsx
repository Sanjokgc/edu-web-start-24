
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, BookOpen, Users, Award } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      id: 1,
      title: "Interactive Learning",
      description: "Engage with hands-on projects and immersive learning experiences",
      icon: BookOpen,
    },
    {
      id: 2,
      title: "Expert-Led Workshops",
      description: "Learn from industry professionals through specialized workshops",
      icon: GraduationCap,
    },
    {
      id: 3,
      title: "Peer Learning",
      description: "Collaborate with fellow learners on group projects and challenges",
      icon: Users,
    },
    {
      id: 4,
      title: "Certification Programs",
      description: "Earn credentials that demonstrate your expertise to potential employers",
      icon: Award,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-24 flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Educational Experiences</h1>
            <p className="text-lg text-gray-600">
              Enhance your learning journey with our immersive educational experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {experiences.map((exp) => (
              <Card key={exp.id} className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <exp.icon size={24} />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{exp.title}</CardTitle>
                    <CardDescription>{exp.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 mb-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Ready to elevate your learning journey?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Join thousands of learners who are transforming their careers through our immersive educational experiences.
              </p>
              <button className="bg-education-blue hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors">
                Explore Experiences
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Experience;
