'use client';

import { useState } from 'react';
import DraggableHomeCard from './DraggableHomeCard';
import { IoCloseCircle, IoHeartCircle } from 'react-icons/io5';

// Mock API call (remains the same)
async function logLikedHome(userData, homeData) {
 try {
   const response = await fetch('/api/like', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ user: userData, home: homeData }),
   });
   const result = await response.json();
   console.log(result.message);
 } catch (error) {
   console.error('Failed to log like:', error);
 }
}

export default function HomeSwipeDeck({ homes: initialHomes, userProfile }) {
 const [homes, setHomes] = useState(initialHomes);

 const handleSwipe = (direction, swipedHome) => {
   console.log(`You swiped ${direction} on ${swipedHome.homeAddressInfo}`);
   
   if (direction === 'right') {
     logLikedHome(userProfile, swipedHome);
   }
   
   // Remove the swiped card from the stack
   setTimeout(() => {
       setHomes((prevHomes) => prevHomes.filter((h) => h.id !== swipedHome.homeConfigurationID));
   }, 300); // Wait for animation to finish
 };
 
 return (
   <div className="relative w-full h-screen flex flex-col items-center justify-center bg-gray-200 overflow-hidden">
     <h1 className="text-3xl font-bold text-gray-700 mb-4 absolute top-10">Swipe to Find Your Home</h1>
     
     {/* Card Stack */}
     <div className="w-[90vw] max-w-[400px] h-[65vh] relative">
       {homes.length > 0 ? (
         // We reverse the array to stack them correctly with z-index
         homes.slice().reverse().map((home, index) => (
           <DraggableHomeCard
             key={home.homeConfigurationID}
             home={home}
             onSwipe={handleSwipe}
             index={homes.length - 1 - index} // Pass original index for styling
           />
         ))
       ) : (
         <div className="flex items-center justify-center w-full h-full bg-white rounded-xl shadow-lg">
            <p className="text-center text-gray-600 text-xl p-4">No more homes to show. Check back later!</p>
         </div>
       )}
     </div>

     {/* Swipe Buttons (Functionality can be added later if needed) */}
     <div className="flex items-center justify-center space-x-8 mt-6 absolute bottom-10">
       <button className="text-red-500 hover:text-red-400 disabled:text-gray-400" disabled={homes.length === 0}>
         <IoCloseCircle size={70} />
       </button>
       <button className="text-green-500 hover:text-green-400 disabled:text-gray-400" disabled={homes.length === 0}>
         <IoHeartCircle size={80} />
       </button>
     </div>
   </div>
 );
}