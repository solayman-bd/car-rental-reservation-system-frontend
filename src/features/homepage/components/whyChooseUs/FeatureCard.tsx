import React from "react";

interface FeatureCardProps {
  heading: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  heading,
  description,
  icon,
}) => {
  return (
    <div className="bg-white p-6  rounded-3xl shadow-lg w-full md:w-1/3 flex flex-col justify-center items-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-4">{heading}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default FeatureCard;
