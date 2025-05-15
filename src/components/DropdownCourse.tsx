import React from "react";

interface DropdownCourseProps {
  children: React.ReactNode;
  onClick: () => void;
}

export const DropdownCourse: React.FC<DropdownCourseProps> = ({children, onClick}) => {

  return (
<li
  className="w-full px-3 py-2 text-sm text-gray-800 hover:bg-blue-100 rounded-md last:border-none cursor-pointer transition-all"
  onClick={onClick}
>
  {children}
</li>
  );
};