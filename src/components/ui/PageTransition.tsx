// "use client"
// import { motion } from "framer-motion";
// import React from "react";

// // Define the CSS for the transitions
// const transitionStyles = `
//   .slide-in {
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100vh;
//     background: #0f0f0f;
//     transform-origin: bottom;
//     z-index: 100;
//   }

//   .slide-out {
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100vh;
//     background: #0f0f0f;
//     transform-origin: top;
//     z-index: 100;
//   }
// `;

// // Create a higher-order component for page transitions
// const transition = (OriginalComponent) => {
//   // Return a new component with transitions
//   return function WithTransition(props) {
//     return (
//       <>
//         <style jsx global>{transitionStyles}</style>
        
//         <OriginalComponent {...props} />

//         <motion.div 
//           className="slide-in"
//           initial={{ scaleY: 0 }}
//           animate={{ scaleY: 0 }}
//           exit={{ scaleY: 1 }}
//           transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
//         />

//         <motion.div 
//           className="slide-out"
//           initial={{ scaleY: 1 }}
//           animate={{ scaleY: 0 }}
//           exit={{ scaleY: 0 }}
//           transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
//         />
//       </>
//     );
//   };
// };

// export default transition;
