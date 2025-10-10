// app/page.js

'use client';

import { useState } from 'react';
import ProfileForm from '../components/ProfileForm';
import HomeSwipeDeck from '../components/HomeSwipeDeck';
import { homesData } from '../data/inventory'; // Import our mock data

export default function Home() {
 const [userProfile, setUserProfile] = useState(null);

 // This function will be called by the ProfileForm on successful submission
 const handleProfileCreate = (profileData) => {
   console.log('Profile created:', profileData);
   setUserProfile(profileData);
   // In a real app, you might save this to localStorage or a global state manager
 };

 // Dynamically load homes based on the user's selected city
 const homesForCity = userProfile ? homesData[userProfile.city.toLowerCase()] || [] : [];

 return (
   <main>
     {!userProfile ? (
       <ProfileForm onProfileCreate={handleProfileCreate} />
     ) : (
       <HomeSwipeDeck homes={homesForCity} userProfile={userProfile} />
     )}
   </main>
 );
}