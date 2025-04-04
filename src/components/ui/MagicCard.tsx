"use client";
import React, { useState, useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MagicCardProps {
  children: ReactNode;
  className?: string;
  spotlightSize?: number;
}

export const MagicCard: React.FC<MagicCardProps> = ({
  children,
  className,
  spotlightSize = 800,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative overflow-hidden rounded-xl border border-gray-600 bg-black p-6 shadow-md transition-all duration-200 dark:border-neutral-800 dark:bg-neutral-900",
        "hover:border-neutral-400 hover:shadow-lg",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Spotlight effect - moved to be the first child and added z-index to ensure it stays behind content */}
      <div
        className="pointer-events-none absolute -inset-px -z-0 rounded-xl opacity-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.05), transparent 40%)`,
        }}
      />
      {/* Wrapper for children with relative positioning and z-index to ensure they appear above the spotlight */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
