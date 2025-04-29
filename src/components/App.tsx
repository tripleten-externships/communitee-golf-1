import React from "react";
import { LoginForm } from "./LoginForm";
import { Dropdown } from "./Dropdown";
import { DropdownCourse } from "./DropdownCourse";

export const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const course = ["one", "two", "three"];
  return (
    <div className="w-96 h-96 bg-white p-4">
      {!isLoggedIn ? (
        <LoginForm onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <>
      <div className="mb-1 text-[12px] font-normal text-[#959494] leading-[110%]">
Location
</div>
        <Dropdown 
          buttonText="Gilory Golf Course"
          content={
            <>
              {course.map((item) => (
                <DropdownCourse key={item} onClick={() => {}}>
                  {`Golf Course ${item}`}
                </DropdownCourse>
              ))}
            </>
          }
        />
        <div>Chat interface will go here</div>
        </>
      )}
    </div>
  );
};
