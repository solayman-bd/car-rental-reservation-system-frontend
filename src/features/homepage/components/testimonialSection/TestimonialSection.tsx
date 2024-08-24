import SectionsWraper from "@/components/SectionWrapper";
import { testimonials } from "./TestimonialData";
import TestimonialCard from "./TestimonialCard";

const TestimonialsSection: React.FC = () => {
  return (
    <SectionsWraper heading="Testimonial">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </SectionsWraper>
  );
};

export default TestimonialsSection;
