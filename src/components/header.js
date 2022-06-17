import { Button } from "@mui/material";
import React from "react";
import "styled-components/macro";
import { IoExitOutline } from "react-icons/io5";
import { AiOutlineMenu } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { useHeaderTitle } from "../customHooks";

function Header({ handleOpenNav }) {
  const history = useHistory();

  const { title } = useHeaderTitle();

  const handleLogout = () => {
    localStorage.clear();
    history.replace("/login");
  };

  return (
    <header className="bg-primary text-white lg:text-black lg:bg-[transparent] h-[70px] flex items-center justify-between px-5 shadow-md">
      <div className="flex gap-2 items-center">
        <button
          className="block lg:hidden text-blue-500"
          onClick={handleOpenNav}
        >
          <AiOutlineMenu />
        </button>
        <p className="w-max font-medium text-lg md:text-3xl">{title}</p>
      </div>
      <Button
        onClick={handleLogout}
        color="error"
        className="flex gap-2 items-center bg-red-500 text-white lg:bg-[transparent] lg:text-red-500"
      >
        <span>Log out</span>
        <IoExitOutline size={20} />
      </Button>
    </header>
  );
}

export default Header;
