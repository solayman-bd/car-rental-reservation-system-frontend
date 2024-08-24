import FeaturedCarsSection from "./components/featuredCarsSection/FeaturedCarsSection";
import HeroSection from "./components/heroSection/HeroSection";
import WhyChooseUsSection from "./components/whyChooseUs/WhyChooseUs";
import TestimonialsSection from "./components/testimonialSection/TestimonialSection";

export const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedCarsSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
    </div>
  );
};
