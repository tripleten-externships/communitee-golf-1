import React from "react";
import { DropdownButton } from "./DropdownButton";
import { DropdownContent } from "./DropdownContent";
import { useState, useEffect, useRef } from "react";
// import icons from "../../dist/icons/Icon.png"

interface DropdownProps {
    buttonText: string;
    content: React.ReactNode;
    
  }

  export const Dropdown: React.FC<DropdownProps> = ({buttonText, content}: DropdownProps) => {
    const [open, setOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setOpen((open)=> !open);
    };
    
    useEffect (() => {
        const handler = (event: MouseEvent) => {
            if(dropdownRef.current && ! dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

            document.addEventListener("click", handler)

            return () => {
                document.removeEventListener ("click", handler);
        };
    }, []);

    return (
        <div className="font-poppins font-regular relative flex flex-col gap-2" ref={dropdownRef}>
            <DropdownButton toggle={toggleDropdown} open={open}>{buttonText} </DropdownButton>
             <DropdownContent open={open}>{content} </DropdownContent>
        </div>
    );
};