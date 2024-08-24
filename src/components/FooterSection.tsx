interface FooterLink {
  name: string;
  url: string;
  id?: number;
}

interface FooterSection {
  heading: string;
  links: FooterLink[];
}

const footerData: FooterSection[] = [
  {
    heading: "Contact Us",
    links: [
      {
        name: "Email: support@rentride.com",
        url: "mailto:support@rentride.com",
      },
      { name: "Phone: (123) 456-7890", url: "tel:+1234567890" },
      { name: "Address: 123 Outdoor Lane, Adventure City, AC 12345", url: "#" },
    ],
  },
  {
    heading: "Follow Us",
    links: [
      { name: "Facebook", url: "https://www.facebook.com" },
      { name: "Twitter", url: "https://www.twitter.com" },
      { name: "Instagram", url: "https://www.instagram.com" },
    ],
  },
  {
    heading: "Quick Links",
    links: [
      { id: 1, name: "Home", url: "/" },
      { id: 5, name: "About Us", url: "/about" },
      { id: 2, name: "Booking", url: "/booking" },

      {
        id: 4,
        name: "Contact",
        url: "/contact",
      },
      {
        id: 50,
        name: "Login",
        url: "/login",
      },
    ],
  },
];
import React from "react";
import { Link } from "react-router-dom";

const FooterSection: React.FC = () => {
  return (
    <footer className=" text-gray-800 py-10 border-t border-gray-700">
      <div className="flex flex-wrap justify-between">
        {footerData.map((section, index) => (
          <div
            key={index}
            className="w-full md:w-1/3 mb-6 md:mb-0 flex flex-col justify-center items-center"
          >
            <h5 className="text-4xl font-semibold mb-4">{section.heading}</h5>
            <ul>
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex} className="mb-2">
                  <Link to={link.url} className="hover:text-blue-500 text-xl">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-8  pt-4 text-center">
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} RentRide. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
