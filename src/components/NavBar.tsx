import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FC } from "react";
import brandImageUrl from "../assets/brand.svg";
type TNavItem = {
  id: number;
  name: string;
  url: string;
  active: boolean;
};

const Navbar: FC = () => {
  const navItemData: TNavItem[] = [
    { id: 1, name: "Home", url: "/", active: true },
    { id: 5, name: "About Us", url: "/about", active: false },
    { id: 2, name: "Booking", url: "/booking", active: false },
    {
      id: 51,
      name: "Cars",
      url: "/cars",
      active: false,
    },

    {
      id: 4,
      name: "Contact",
      url: "/contact",
      active: false,
    },
    {
      id: 50,
      name: "Login",
      url: "/login",
      active: false,
    },
    // {
    //   id: 51,
    //   name: "Sign Up",
    //   url: "/sign-up",
    //   active: false,
    // },
  ];

  const [navItems, setNavItems] = useState<TNavItem[]>(navItemData);
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavItemClick = (id: number) => {
    setNavItems(
      navItems.map((item) => ({
        ...item,
        active: item.id === id,
      }))
    );
  };

  return (
    <nav>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between min-w-full">
        <Link
          to="/"
          className="flex items-center space-x-0 sm:space-x-3 rtl:space-x-reverse"
        >
          <img src={brandImageUrl} alt="brand" />
          <span className="self-center text-2xl md:text-3xl font-semibold md:font-bold whitespace-nowrap">
            RentRide
          </span>
        </Link>
        <button
          onClick={toggleNavbar}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            {navItems.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.url}
                  className={`flex items-center py-2 px-3 ${
                    item.active ? "bg-blue-700 text-white" : "bg-transparent"
                  } rounded md:bg-transparent md:text-blue-700 md:p-0 my-1 md:my-0  text-xl md:text-2xl hover:animate-pulse`}
                  aria-current={item.active ? "page" : undefined}
                  onClick={() => handleNavItemClick(item.id)}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
