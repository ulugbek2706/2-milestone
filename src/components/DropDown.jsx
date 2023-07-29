import React, { useState } from "react";
import user from "../img/user.png";
import key from "../img/key.png";
import billing from "../img/billing.png";
import exit from "../img/exit.png";

const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="bg-gray-600 text-white  rounded "
      >
        <img className="w-7 h-7" src={user} alt="" />
      </button>
      {isOpen && (
        <div className="absolute top-10 right-1 w-[300px] bg-white shadow-md rounded">
          {/* Add dropdown options here */}
          <p className="flex items-center gap-2 px-4 py-2 hover:bg-gray-400 hover:text-white">
            <img className="w-5 h-5" src={key} alt="" /> Change login and
            password
          </p>
          <p className="flex items-center gap-2 px-4 py-2 hover:bg-gray-400 hover:text-white">
            <img className="w-5 h-5" src={billing} alt="" /> Biling
          </p>
          <p className="flex items-center gap-2 px-4 py-2 hover:bg-gray-400 hover:text-white">
            <img className="w-5 h-5" src={exit} alt="" /> Exit
          </p>
        </div>
      )}
    </div>
  );
};

export default DropDown;
