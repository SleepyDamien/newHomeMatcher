// components/ProfileForm.js

'use client';

import { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaCity } from 'react-icons/fa';

export default function ProfileForm({ onProfileCreate }) {
 const [formData, setFormData] = useState({
   name: '',
   email: '',
   phone: '',
   city: 'dallas', // Default city
   consent: false,
 });

 const handleChange = (e) => {
   const { name, value, type, checked } = e.target;
   setFormData((prevData) => ({
     ...prevData,
     [name]: type === 'checkbox' ? checked : value,
   }));
 };

 const handleSubmit = (e) => {
   e.preventDefault();
   if (!formData.consent) {
     alert('You must consent to be contacted to proceed.');
     return;
   }
   // Pass data up to the parent component (page.js)
   onProfileCreate(formData);
 };

 return (
   <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
     <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
       <h1 className="text-3xl font-bold text-center text-gray-800">Find Your Dream Home</h1>
       <p className="text-center text-gray-500">First, let's get to know you.</p>
       <form onSubmit={handleSubmit} className="space-y-4">
         {/* Form Fields */}
         <div className="relative">
           <FaUser className="absolute top-3.5 left-3 text-gray-400" />
           <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} className="w-full pl-10 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
         </div>
         <div className="relative">
           <FaEnvelope className="absolute top-3.5 left-3 text-gray-400" />
           <input type="email" name="email" placeholder="Email Address" required onChange={handleChange} className="w-full pl-10 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
         </div>
         <div className="relative">
           <FaPhone className="absolute top-3.5 left-3 text-gray-400" />
           <input type="tel" name="phone" placeholder="Phone Number" required onChange={handleChange} className="w-full pl-10 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
         </div>
         <div className="relative">
            <FaCity className="absolute top-3.5 left-3 text-gray-400" />
            <select name="city" value={formData.city} onChange={handleChange} className="w-full pl-10 p-3 border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500">
               {/* For this example, only Dallas is available */}
               <option value="dallas">Dallas, TX</option> 
            </select>
         </div>

         {/* Consent Checkbox */}
         <div className="flex items-center space-x-2">
           <input type="checkbox" id="consent" name="consent" checked={formData.consent} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/>
           <label htmlFor="consent" className="text-sm text-gray-600">
             I consent to be contacted by a representative about my liked properties.
           </label>
         </div>

         <button type="submit" disabled={!formData.consent} className="w-full p-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400">
           Start Swiping
         </button>
       </form>
     </div>
   </div>
 );
}