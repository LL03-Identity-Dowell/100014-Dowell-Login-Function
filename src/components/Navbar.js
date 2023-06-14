import React, { useEffect, useState } from "react";
import DoWellLogo from "../assets/images/Dowell-logo.webp";
import { Link, NavLink } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]);

  const menuLinks = [
    { name: "Home", path: "/" },
    { name: "Chat", path: "/chat" },
    { name: "Policy", path: "/policy" },
    { name: "Help", path: "/help" },
    { name: "FAQ", path: "/faq" },
    { name: "LogIn", path: "/signin" },
  ];

  const socialLink = [
    { icon: <FaFacebook className="customIcon" />, link: "www.facebook.com" },
    { icon: <FaInstagram className="customIcon" />, link: "www.instagram.com" },
    { icon: <FaLinkedin className="customIcon" />, link: "www.linkedin.com" },
    { icon: <FaYoutube className="customIcon" />, link: "www.youtube.com" },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div
      className={`"absolute fixed z-50 top-0 left-0 w-full flex items-center" ${
        isScrolled && "bg-white drop-shadow-md"
      }`}
    >
      <div className="container">
        <div className="relative flex items-center lg:justify-around justify-between">
          <div className="max-w-full px-4">
            <Link href="/" className="navbar-log w-full block py-5">
              <img
                src={DoWellLogo}
                alt="logo"
                width={100}
                height={100}
                className=""
              />
            </Link>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <div
                onClick={() => setOpen(!open)}
                className={`"outline-none text-slate-600 text-5xl absolute right-5 top-18 -translate-y-1/2 lg:hidden  border-white" ${
                  isScrolled && "text-black"
                }`}
              >
                <ion-icon name={open ? "close" : "menu"}></ion-icon>
              </div>
              <nav
                className={`absolute py-5 lg:py-0 lg:px-4 xl:px-6 bg-slate-100 lg:bg-transparent shadow-lg max-w-[250px] w-full lg:max-w-full lg:w-full right-4 top-full lg:block lg:static lg:shadow-none ${
                  open ? "" : "hidden"
                }`}
              >
                <ul className="block lg:flex">
                  {menuLinks.map((element, index) => (
                    <li
                      key={index}
                      className="relative group "
                      onClick={() => setOpen(!open)}
                    >
                      <NavLink
                        to={element.path}
                        className="lg:border-none border-b border-gray-400 font-medium text-black group-hover:text-danger py-2 lg:py-6 lg:inline-flex lg:px-0 flex mx-8 lg:mr-0"
                      >
                        {element.name}
                      </NavLink>
                    </li>
                  ))}
                  <li className="relative group" onClick={() => setOpen(!open)}>
                    <NavLink
                      to="/contact"
                      className="font-medium text-black group-hover:text-danger py-2 lg:py-6 lg:inline-flex lg:px-0 flex mx-8 lg:mr-0 "
                    >
                      Contact
                    </NavLink>
                  </li>
                  <li className="md:hidden mt-2 flex py-2 justify-center">
                    <ul
                      className="w-full flex items-center justify-around"
                      onClick={() => setOpen(!open)}
                    >
                      {socialLink.map((item, index) => (
                        <li key={index}>
                          <Link href={item.link} target="_blank">
                            {item.icon}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
