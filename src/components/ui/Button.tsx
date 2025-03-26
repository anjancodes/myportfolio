"use client"
import React, { useState } from 'react';
import { CgArrowTopRightO } from "react-icons/cg";

type ButtonProps = {
  text?: string;
  bg?: 'black' | 'white'; 
};

const Button = ({ text = "Contact", bg = "white" }: ButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Determine text color based on background
  const textColor = bg === 'black' ? 'white' : 'black';
  
  // Determine hover background color (inverse of bg)
  const hoverBgColor = bg === 'black' ? 'white' : 'black';
  
  // Determine hover text color (inverse of textColor)
  const hoverTextColor = textColor === 'black' ? 'white' : 'black';
  
  // Determine border color (same as text color when hovered)
  const borderColor = isHovered ? textColor : 'transparent';
  
  return (
    <button
      className={`
        flex items-center justify-center gap-2 
        rounded-2xl py-2 px-5 font-sora 
        transition-all duration-400
        cursor-pointer
        border-1
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: isHovered ? hoverBgColor : bg,
        color: isHovered ? hoverTextColor : textColor,
        borderColor: isHovered ? (bg === 'black' ? 'black' : 'white') : 'transparent'
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
