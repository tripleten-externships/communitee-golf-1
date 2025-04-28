import {useState, useEffect} from "react";
const messagesArray = ["Bob", "Bud", "Bobby", "Buddy"];
const eventsArray = ["Event1"];

function Menu () {
    const [tab, setTab] = useState("messages");
    const [messagesTabStyle, setMessagesTabStyle] = useState("text-[#959494] border-b border-b-[#959494]");
    const [eventsTabStyle, setEventsTabStyle] = useState("text-[#959494] border-b border-b-[#959494]");

    const changeToMessages = () => {
        setTab("messages");
        setEventsTabStyle("text-[#959494] border-b border-b-[#959494]");
    }
    const changeToEvents = () => {
        setTab("events");
        setMessagesTabStyle("text-[#959494] border-b border-b-[#959494]");
    }

    useEffect(()=>{
        if(tab === "messages"){
            setMessagesTabStyle("text-black border-b-2 border-b-black");
        }
        else{
            setEventsTabStyle("text-black border-b-2 border-b-black");
        }
    },[tab]);

    return(
        <div>
            <div className = {`flex justify-center items-center mt-[30px] font-poppins font-medium text-center text-base `}>
                <button className = {`w-[152px] ${eventsTabStyle} py-[10px]`} onClick={changeToEvents}>Events ({eventsArray.length})</button>
                <button className = {`w-[152px] ${messagesTabStyle} py-[10px]`} onClick={changeToMessages}>Messages ({messagesArray.length})</button>
            </div>
            
                {tab === "messages" ? 
                <ul className="flex flex-col justify-center items-center w-[304px] mt-[16px]">
                    {messagesArray.map((message, index) => {
                        return(<li key={index} className="mb-[12px] mx-[16px]">{message}</li>);
                    })}
                    {/* import & map the real array of messages on top; then replace inside the <li> element with the real message components*/}
                </ul> : 
                 <ul className="flex flex-col justify-center items-center w-[304px] mt-[16px]">
                 {eventsArray.map((event, index) => {
                     return(<li key={index} className="mb-[12px] mx-[16px]">{event}</li>);
                 })}
                 {/* import & map the real array of messages on top; then replace inside the <li> element with the real message components*/}
                </ul>}
        </div>
 
    )
}

export default Menu;