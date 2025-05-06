import React from "react";

type MenuProps = {
    messages: string[];
};

const Menu: React.FC<MenuProps> = ({ messages }) => {
    return(
        <div>
            <p className = {`font-poppins font-medium text-center text-base w-[152px] text-black border-b-2 border-b-black mt-[30px] mx-[auto] py-[10px]`}>Messages ({messages.length})</p>
            <ul className="flex flex-col justify-center items-center mt-[16px]">
                {messages.map((message, index) => {
                    return(<li key={index} className="mb-[12px] mx-[16px]">{message}</li>);
                })}
                {/* import & map the real array of messages on top; then replace inside the <li> element with the real message components*/}
            </ul>
        </div>
 
    )
}

export default Menu;