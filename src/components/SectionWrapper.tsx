import { FC, ReactNode } from "react";

interface ISectionProps {
  heading: string;
  children: ReactNode;
}

const SectionsWraper: FC<ISectionProps> = ({ heading, children }) => {
  return (
    <div className="py-10 sm:py-16">
      <h2 className="text-4xl font-bold text-black sm:text-5xl text-center mb-14">
        {heading}
      </h2>
      {children}
    </div>
  );
};

export default SectionsWraper;
