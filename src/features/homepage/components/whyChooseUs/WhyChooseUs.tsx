import SectionsWraper from "@/components/SectionWrapper";
import React from "react";
import FeatureCard from "./FeatureCard";

const WhyChooseUsSection: React.FC = () => {
  const features = [
    {
      id: 1,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-discount-check"
          width="68"
          height="68"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#00abfb"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7c.412 .41 .97 .64 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1c0 .58 .23 1.138 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1" />
          <path d="M9 12l2 2l4 -4" />
        </svg>
      ),
      heading: "Best Prices",
      description:
        "We offer the most competitive prices on the market, ensuring that you get the best value for your money.",
    },
    {
      id: 2,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-viewport-wide"
          width="68"
          height="68"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#00abfb"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M10 12h-7l3 -3m0 6l-3 -3" />
          <path d="M14 12h7l-3 -3m0 6l3 -3" />
          <path d="M3 6v-3h18v3" />
          <path d="M3 18v3h18v-3" />
        </svg>
      ),
      heading: "Wide Selection",
      description:
        "Our extensive inventory includes a wide range of products to meet all your needs and preferences.",
    },
    {
      id: 3,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-24-hours"
          width="68"
          height="68"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#00abfb"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 13c.325 2.532 1.881 4.781 4 6" />
          <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2" />
          <path d="M4 5v4h4" />
          <path d="M12 15h2a1 1 0 0 1 1 1v1a1 1 0 0 1 -1 1h-1a1 1 0 0 0 -1 1v1a1 1 0 0 0 1 1h2" />
          <path d="M18 15v2a1 1 0 0 0 1 1h1" />
          <path d="M21 15v6" />
        </svg>
      ),
      heading: "24/7 Support",
      description:
        "Our dedicated support team is available around the clock to assist you with any questions or concerns.",
    },
  ];

  return (
    <SectionsWraper heading="Why Choose Us?">
      <div className="flex flex-wrap justify-center gap-8">
        {features.map(({ id, icon, heading, description }) => (
          <FeatureCard
            key={id}
            icon={icon}
            heading={heading}
            description={description}
          />
        ))}
      </div>
    </SectionsWraper>
  );
};

export default WhyChooseUsSection;
