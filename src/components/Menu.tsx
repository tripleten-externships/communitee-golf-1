const messagesArray=["Bob", "Bud", "Bobby", "Buddy"];

function Menu () {
    return(
        <div>
            <p className = {`font-poppins font-medium text-center text-base w-[152px] text-black border-b-2 border-b-black mt-[30px] mx-[auto] py-[10px]`}>Messages ({messagesArray.length})</p>
            <ul className="flex flex-col justify-center items-center mt-[16px]">
                {messagesArray.map((message, index) => {
                    return(<li key={index} className="mb-[12px] mx-[16px]">{message}</li>);
                })}
                {/* import & map the real array of messages on top; then replace inside the <li> element with the real message components*/}
            </ul>
        </div>
 
    )
}

export default Menu;