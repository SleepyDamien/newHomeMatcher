'use client';

import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';
import { FaLocationCrosshairs } from "react-icons/fa6";

// Define a threshold for a swipe to be considered "committed"
const SWIPE_THRESHOLD = 80;

export default function DraggableHomeCard({ home, onSwipe, index }) {
 // Motion values to track card position and rotation
 const x = useMotionValue(0);
 const controls = useAnimation();

 // Rotate the card as it's dragged
 const rotate = useTransform(
   x,
   [-200, 0, 200],
   [-25, 0, 25],
   { clamp: false }
 );

 // Handle the end of a drag gesture
 const handleDragEnd = (event, info) => {
   if (Math.abs(info.offset.x) < SWIPE_THRESHOLD) {
     // If not dragged far enough, animate back to center
     controls.start({ x: 0 });
     return;
   }

   // Determine swipe direction and fly the card off-screen
   const swipeDirection = info.offset.x > 0 ? 'right' : 'left';
   controls.start({ x: swipeDirection === 'right' ? 300 : -300, opacity: 0 });
   
   // Trigger the parent component's onSwipe function
   onSwipe(swipeDirection, home);
 };

 return (
   <motion.div
     className="absolute w-full h-full cursor-grab"
     style={{ 
       x, 
       rotate,
       zIndex: index, // Ensure the top card is always draggable
     }}
     drag="x"
     dragConstraints={{ left: 0, right: 0 }}
     onDragEnd={handleDragEnd}
     animate={controls}
     whileTap={{ cursor: 'grabbing' }}
   >
     <div className="relative w-full h-full bg-white rounded-xl shadow-lg overflow-hidden pointer-events-none">
       <img loading='lazy' src={home.homeDefaultImage} alt={home.homeAddressInfo} className="w-full h-full object-cover" />
       <div className="absolute bottom-0 w-full p-4 text-black bg-white h-1/3">
         <h2 className="text-2xl font-bold mb-1.5">{`$${home.homePriceInfo}`}</h2>
         <span className="flex text-lg text-base/normal"><FaLocationCrosshairs className="mr-1" /> X miles from your location</span>
         <span className="flex text-lg">{home.homeAddressInfo}, {home.homeCity} {home.homeZipCode}</span>
         <div className="inline-flex flex-row flex-wrap justify-start mt-2 text-sm">
           <div className="flex items-center m-1.5 w-1/4"><FaBed className="mr-1" /> {home.homeBedInfo} beds</div>
           <div className="flex items-center m-1.5 w-1/4"><FaBath className="mr-1" /> {home.homeBathInfo} baths</div>
           <div className="flex items-center m-1.5 w-1/4"><FaRulerCombined className="mr-1" /> {home.homeSqFtInfo} sqft</div>
           <div className="flex items-center m-1.5 w-1/4"><FaRulerCombined className="mr-1" /> {home.homeGarageInfo} garage</div>
           <div className="flex items-center m-1.5 w-1/4"><FaRulerCombined className="mr-1" /> {home.homeStoryInfo} story</div>
         </div>
       </div>
     </div>
   </motion.div>
 );
}