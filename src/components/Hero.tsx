
import React from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-white to-blue-50 pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center">
        {/* Left side content */}
        <div className="md:w-1/2 space-y-6 animate-fade-in pb-8 md:pb-0">
          <div className="inline-block bg-blue-100 text-education-blue px-4 py-2 rounded-full font-medium">
            Learn at your own pace
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-display leading-tight">
            Discover a new way to <span className="text-education-blue">master skills</span> online
          </h1>
          <p className="text-lg text-gray-600 max-w-lg">
            Join our community of learners and gain access to thousands of courses taught by industry experts. Start your learning journey today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-education-blue hover:bg-blue-700 text-white text-lg py-6 px-8">
              Browse Courses
            </Button>
            <Button variant="outline" className="border-education-blue text-education-blue hover:bg-blue-50 text-lg py-6 px-8">
              Learn More
            </Button>
          </div>
          <div className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-yellow-500 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-red-500 border-2 border-white"></div>
            </div>
            <p className="text-sm text-gray-600">
              <span className="font-bold">50,000+</span> students already enrolled
            </p>
          </div>
        </div>

        {/* Right side image */}
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-lg">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-education-lightBlue rounded-full mix-blend-multiply filter blur-xl opacity-50"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-education-orange rounded-full mix-blend-multiply filter blur-xl opacity-50"></div>
            <div className="relative">
              <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="bg-education-blue rounded-full p-2">
                      <GraduationCap size={24} className="text-white" />
                    </div>
                    <span className="font-bold">EduLearn</span>
                  </div>
                  <span className="bg-blue-100 text-education-blue text-xs px-2 py-1 rounded-full">Featured</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Start your learning journey</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-700">Access to 10,000+ courses</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-700">Expert instructors</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-700">Lifetime access</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-700">Learn at your own pace</span>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-education-blue hover:bg-blue-700">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
