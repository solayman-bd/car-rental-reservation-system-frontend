// src/components/TestimonialCard.tsx
import React from "react";
import { ITestimonial } from "./TestimonialData";

interface TestimonialCardProps {
  testimonial: ITestimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:animate-pulse hover:cursor-pointer text-gray-600">
      <img
        className="w-16 h-16 rounded-full mx-auto"
        src={testimonial.image}
        alt={testimonial.name}
      />
      <h3 className="mt-4 text-center text-xl font-semibold">
        {testimonial.name}
      </h3>
      <p className="text-center text-gray-500">{testimonial.designation}</p>
      <p className="mt-2 text-center text-gray-700">{testimonial.message}</p>
    </div>
  );
};

export default TestimonialCard;
