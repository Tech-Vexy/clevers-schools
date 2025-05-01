// app/api/admin/set-timer/route.js
import { promises as fs } from 'fs';
import path from 'path';

// Path to our timer data file
const dataFilePath = path.join(process.cwd(), 'data', 'timer.json');

// Set timer to a custom date/time (protected admin endpoint)
export async function POST(request: { json: () => any; }) {
  try {
    // For a real implementation, you would add authentication here
    // to ensure only authorized users can set the timer
    
    const body = await request.json();
    
    if (!body.endTime) {
      return Response.json({ 
        error: 'Missing endTime parameter' 
      }, { status: 400 });
    }
    
    // Validate that endTime is a valid timestamp
    const endTime = Number(body.endTime);
    if (isNaN(endTime)) {
      return Response.json({ 
        error: 'Invalid endTime value' 
      }, { status: 400 });
    }
    
    // Update the timer file
    await fs.writeFile(
      dataFilePath,
      JSON.stringify({ endTime }),
      'utf8'
    );
    
    return Response.json({ 
      success: true, 
      message: 'Timer has been updated',
      expiresAt: new Date(endTime).toISOString()
    });
  } catch (error) {
    console.error('Error setting timer:', error);
    return Response.json({ 
      error: 'Failed to set timer' 
    }, { status: 500 });
  }
}