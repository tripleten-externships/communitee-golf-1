import React from "react";

interface DropdownButtonProps {
    children: React.ReactNode;
    open: boolean;
    toggle: () => void;
  }

export const DropdownButton: React.FC<DropdownButtonProps> = ({children, open, toggle}) => {
return (
  <button
    onClick={toggle}
      type="button"
      className={`w-[304px] h-[42px] flex items-center justify-between px-3 py-2 bg-white border-[1px] border-[#030303] rounded-lg text-gray-700 text-sm font-medium transition-all duration-200 
      hover:bg-gray-100  ${open ? "shadow-md" : ""}`}
    >
       <span>{children}</span>
       <img src="/icons/dropdown-arrow.png" alt="Dropdown Icons" className={`w-4 h-4 mr-2 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
 HEAD
       <img src="/icons/dropdown-arrow.png" alt="Dropdown Icons" className={`w-4 h-4 mr-2 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />

       <img src={icons} alt="Dropdown Icons" className={`w-4 h-4 mr-2 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
([CG1-11] Implement Location Dropdown after revert)
    </button>
);
};