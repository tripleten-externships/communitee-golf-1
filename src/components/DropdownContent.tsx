import React from "react";

interface DropdownContentProps {
    children: React.ReactNode;
    open: boolean;
  }

export const DropdownContent: React.FC<DropdownContentProps> = ({children, open}) => {
    return (
        <div className={`absolute left-0 top-full mt-2 w-[304px] bg-white rounded-[12px] border border-[#959494] shadow-md transition-all duration-200 ease-in-out transform 
        ${open ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"}`
        }>
        <ul className="py-2 space-y-[10px]">
          {children}
        </ul>
      </div>
    );
};