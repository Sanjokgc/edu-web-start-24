
import React from "react";
import { BookOpen, GraduationCap, Users, Library } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-education-blue" />,
      title: "Diverse Course Selection",
      description: "Access over 10,000 courses across various disciplines - from programming to art, business to science."
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-education-green" />,
      title: "Expert Instructors",
      description: "Learn from industry professionals and academic experts who bring real-world knowledge to every lesson."
    },
    {
      icon: <Users className="h-8 w-8 text-education-orange" />,
      title: "Supportive Community",
      description: "Connect with fellow students and instructors through forums, study groups, and collaborative projects."
    },
    {
      icon: <Library className="h-8 w-8 text-purple-500" />,
      title: "Lifetime Access",
      description: "Purchase once, access forever. Learn at your own pace with unlimited access to course materials."
    }
  ];

  return (
    <section id="features" className="py-20 bg-education-lightGray">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">Why Choose EduLearn?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform offers everything you need to enhance your skills and advance your career.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-4 p-3 inline-block bg-gray-100 rounded-lg">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white shadow-md rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="bg-education-blue text-white p-8 md:p-10">
              <h3 className="text-2xl font-bold mb-4">Ready to start learning?</h3>
              <p className="mb-6">
                Join millions of students worldwide and transform your career with our courses.
              </p>
              <button className="bg-white text-education-blue font-medium py-2 px-6 rounded-md hover:bg-gray-100 transition-colors">
                Get Started
              </button>
            </div>
            <div className="col-span-2 p-8 md:p-10 flex flex-col justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-education-blue">10,000+</div>
                  <p className="text-gray-600">Online courses</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-education-orange">300+</div>
                  <p className="text-gray-600">Expert instructors</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-education-green">50,000+</div>
                  <p className="text-gray-600">Active students</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-500">95%</div>
                  <p className="text-gray-600">Success rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
