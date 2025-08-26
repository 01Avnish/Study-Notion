import React from "react"

export default function HighlightText(props){
    return(
        <span className='bg-gradient-to-b from-[#3b82f6] via-[#9333ea] to-[#ec4899] 
        text-transparent bg-clip-text font-bold'>
            {" "}
            {props.text}
        </span>
    );
}