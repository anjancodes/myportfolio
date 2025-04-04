"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import React, { ReactNode, useState, useEffect } from "react";

// Define the CSS for the transitions
// You can customize the background color of the transition slides here
const transitionStyles = `
  .slide-in {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: #0f0f0f; /* Customize transition color here */
    transform-origin: bottom;
    z-index: 100;
  }

  .slide-out {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: #0f0f0f; /* Customize transition color here */
    transform-origin: top;
    z-index: 100;
  }
`;

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState<ReactNode>(children);
  const [transitionState, setTransitionState] = useState<'idle' | 'exiting' | 'entering'>('idle');
  
  // Update children when pathname changes
  useEffect(() => {
    if (pathname) {
      // Start exit animation
      setTransitionState('exiting');
      
      // After exit animation starts, schedule the content update
      const updateTimer = setTimeout(() => {
        // Update the content that will be shown after transition
        setDisplayChildren(children);
        
        // Start the entering phase
        setTransitionState('entering');
      }, 500); // Half of exit animation duration - customize timing here
      
      return () => clearTimeout(updateTimer);
    }
  }, [pathname, children]);

  return (
    <>
      <style jsx global>{transitionStyles}</style>
      
      {/* Content container with proper fade animations */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          transition: { 
            duration: 0.5, // Customize fade-in duration
            delay: 0.5 // Delay fade-in until slide animation is mostly complete
          }
        }}
        exit={{ 
          opacity: 0,
          transition: { 
            duration: 0.5 // Customize fade-out duration
          }
        }}
        style={{ width: '100%' }}
      >
        {displayChildren}
      </motion.div>
      
      {/* Slide animations - keeping these the same as requested */}
      <AnimatePresence mode="wait">
        {pathname && (
          <React.Fragment key={pathname}>
            {/* Slide that comes from bottom during exit */}
            <motion.div
              className="slide-in"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 0 }}
              exit={{ scaleY: 1 }}
              transition={{ 
                duration: 1, // Customize exit slide duration
                ease: [0.22, 1, 0.36, 1] // Customize easing function
              }}
            />
            {/* Slide that exits to top during enter */}
            <motion.div
              className="slide-out"
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              exit={{ scaleY: 0 }}
              transition={{ 
                duration: 1, // Customize enter slide duration
                ease: [0.22, 1, 0.36, 1] // Customize easing function
              }}
              onAnimationComplete={() => {
                if (transitionState === 'entering') {
                  setTransitionState('idle');
                }
              }}
            />
          </React.Fragment>
        )}
      </AnimatePresence>
    </>
  );
};

export default PageTransition;
