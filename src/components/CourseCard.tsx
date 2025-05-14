
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CourseCardProps {
  title: string;
  instructor: string;
  image: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  reviews: number;
  price: string;
  category: string;
  duration: string;
}

const CourseCard = ({
  title,
  instructor,
  image,
  level,
  rating,
  reviews,
  price,
  category,
  duration,
}: CourseCardProps) => {
  
  const getLevelColor = () => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-blue-100 text-blue-800";
      case "Advanced":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <Badge className="absolute top-3 right-3 bg-white text-gray-800 hover:bg-gray-100">{category}</Badge>
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className={`${getLevelColor()} border-none`}>{level}</Badge>
          <div className="text-sm text-gray-500">{duration}</div>
        </div>
        <h3 className="text-lg font-bold mt-3 line-clamp-2">{title}</h3>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-sm text-gray-500">By {instructor}</p>
        <div className="flex items-center mt-2">
          <div className="flex text-yellow-400">
            {"★".repeat(Math.floor(rating))}
            {"☆".repeat(5 - Math.floor(rating))}
          </div>
          <span className="text-sm text-gray-500 ml-2">
            {rating} ({reviews} reviews)
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t pt-4">
        <div className="font-bold text-lg">{price}</div>
        <button className="bg-education-blue hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
          Enroll Now
        </button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
