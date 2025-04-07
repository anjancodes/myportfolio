"use client"
import React, { useState } from 'react';
import { CgArrowTopRightO } from "react-icons/cg";

type ButtonProps = {
  text?: string;
  bg?: 'black' | 'white';
  className?: string; // Add className prop
};

const Button = ({ text = "Contact", bg = "white", className = "" }: ButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Determine text color based on background
  const textColor = bg === 'black' ? 'white' : 'black';
  
  // Determine hover background color (inverse of bg)
  const hoverBgColor = bg === 'black' ? 'white' : 'black';
  
  // Determine hover text color (inverse of textColor)
  const hoverTextColor = textColor === 'black' ? 'white' : 'black';
  
  // Set initial border color based on background
  // For black background, show white border even before hover
  const initialBorderColor = bg === 'black' ? 'white' : 'transparent';
  
  // Determine border color when hovered
  const hoverBorderColor = bg === 'black' ? 'black' : 'white';
  
  return (
    <button
      className={`
        flex items-center justify-center gap-2 
        rounded-2xl py-2 px-5 font-sora 
        transition-all duration-400
        cursor-pointer
        border-1
        ${className} // Add the custom className here
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: isHovered ? hoverBgColor : bg,
        color: isHovered ? hoverTextColor : textColor,
        borderColor: isHovered ? hoverBorderColor : initialBorderColor
      }}
    >
      {text}
      <div className={`transform transition-transform duration-300 ${isHovered ? 'rotate-45' : ''}`}>
        <CgArrowTopRightO size={18} />
      </div>
    </button>
  );
};

export default Button;
