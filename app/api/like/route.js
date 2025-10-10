// app/api/like/route.js

import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request) {
 try {
   const data = await request.json();
   const { user, home } = data;

   // Create a log entry
   const logEntry = `
-----------------------------------------
Like Recorded at: ${new Date().toISOString()}
User: ${user.name} (${user.email}, ${user.phone})
City: ${user.city}
Liked Home Address: ${home.address}
Price: $${home.price}
Home ID: ${home.id}
-----------------------------------------
`;

   // --- Logging Logic ---
   // In a real app, this is where you'd send data to a CRM (e.g., Salesforce, HubSpot).
   // For this example, we'll log to the server console and append to a file.
   
   console.log('--- NEW LIKE ---');
   console.log(logEntry);

   // Define the path to the log file
   const logFilePath = path.join(process.cwd(), 'likes.log');
   
   // Append the log entry to the file
   await fs.appendFile(logFilePath, logEntry);

   return NextResponse.json({ message: 'Like recorded successfully.' }, { status: 200 });
 } catch (error) {
   console.error('API Error:', error);
   return NextResponse.json({ message: 'Failed to record like.', error: error.message }, { status: 500 });
 }
}