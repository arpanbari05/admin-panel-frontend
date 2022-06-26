import React from "react";
import { useGetMeQuery } from "../api/api";
import { NavLink } from "react-router-dom";
import { HiUser } from "react-icons/hi";
import { MdAnalytics } from "react-icons/md";
import { ImUsers } from "react-icons/im";
import { IoMdPersonAdd } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import "styled-components/macro";
import { useMe } from "../customHooks";

function Navbar({ open, handleClose }) {
  const navLinks = [
    {
      label: "Analytics",
      link: "/analytics",
      icon: <MdAnalytics size={24} />,
    },
    {
      label: "Employees",
      link: "/employees",
      icon: <ImUsers size={24} />,
    },
    {
      label: "Add Employee",
      link: "/add-employee",
      icon: <IoMdPersonAdd size={24} />,
    },
  ];

  return (
    <>
      <div
        className={`${
          open ? "block" : "hidden"
        } fixed top-0 left-0 bg-[#00000050] w-[100vw] h-[100vh] z-10 lg:hidden lg:static`}
        onClick={handleClose}
      />
      <nav
        className="px-4 py-6 min-h-[100vh] fixed top-0 left-0 w-[75vw] sm:w-1/3 lg:w-auto z-10 lg:z-0 lg:static lg:p-6 lg:py-10 bg-primary text-white text-base transition-all"
        css={`
          transform: ${open ? "translateX(0)" : "translateX(-100%)"};

          @media (min-width: 1024px) {
            transform: translate(0, 0);
          }
        `}
      >
        <NavProfile handleClose={handleClose} />
        <div className="grid gap-5 mt-12" onClick={handleClose}>
          <p className="text-gray-300 text-sm uppercase">General</p>
          {navLinks.map((navLink) => (
            <NavLink
              className="text-none block w-full font-medium p-3 flex items-center gap-2 rounded-md"
              to={navLink.link}
              activeClassName="bg-[#ffffff30] text-tertiary"
            >
              {navLink.icon}
              <span>{navLink.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
}

function NavProfile({ handleClose }) {
  // const { isFetching, data } = useGetMeQuery();
  const { isFetching, data } = useMe();

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center justify-start">
        {isFetching ? (
          <>
            <div className="bg-slate-100 animate-pulse w-[50px] h-[50px] rounded-full"></div>
            <div className="w-[100] h-[20] bg-slate-100 animate-pulse"></div>
          </>
        ) : (
          <>
            <div className="min-w-[50px] min-h-[50px] rounded-full bg-gray-300 text-tertiary flex items-center justify-center">
              <HiUser size={30} />
            </div>
            <div>{data?.user.name}</div>
          </>
        )}
      </div>
      <button onClick={handleClose} className="block lg:hidden text-white">
        <IoCloseSharp />
      </button>
    </div>
  );
}

export default Navbar;
