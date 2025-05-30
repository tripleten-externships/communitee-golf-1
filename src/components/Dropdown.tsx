import React from "react";
import {DropdownButton} from "./DropdownButton";
import {DropdownContent} from "./DropdownContent";
import { useState, useEffect, useRef } from "react";

export interface Item {
  id: string;
  title: string;
}
// items is an array of objects
interface DropdownProps {
  buttonText: string;
  onSelect?: (item: Item) => void;
  items: Item[];
}

  export const Dropdown: React.FC<DropdownProps> = ({buttonText, onSelect, items}: DropdownProps) => {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string>(buttonText || items[0].title);

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

    const handleSelect = (item: Item) => {
        setSelectedItem(item.title);
        onSelect?.(item);
        setOpen(false);
      };

    return (
        <div className="font-poppins font-regular relative flex flex-col gap-2" ref={dropdownRef}>
            <DropdownButton toggle={toggleDropdown} open={open}>{selectedItem} </DropdownButton>
            <DropdownContent open={open}>
              <ul> {items.map((item) => ( <li key={item.id}>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => handleSelect(item)}
                >
                  {item.title}
                </button>
                </li>
                ))}
              </ul> 
            </DropdownContent>
        </div>
    );
};