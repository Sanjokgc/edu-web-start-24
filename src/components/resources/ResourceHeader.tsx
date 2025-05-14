
import React from "react";

interface ResourceHeaderProps {
  title: string;
  description: string;
}

const ResourceHeader = ({ title, description }: ResourceHeaderProps) => {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold font-display mb-6">{title}</h1>
      <p className="text-lg text-gray-600 mb-8">
        {description}
      </p>
    </div>
  );
};

export default ResourceHeader;
