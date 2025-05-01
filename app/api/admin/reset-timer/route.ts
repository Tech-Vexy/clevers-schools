// app/api/admin/reset-timer/route.js
import { promises as fs } from 'fs';
import path from 'path';

// Path to our timer data file
const dataFilePath = path.join(process.cwd(), 'data', 'timer.json');

// Reset timer to 7 days from now (protected admin endpoint)
export async function POST(request: any) {
  try {
    // For a real implementation, you would add authentication here
    // to ensure only authorized users can reset the timer
    
    // Calculate new end time (7 days from now)
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
    const newEndTime = sevenDaysFromNow.getTime();
    
    // Update the timer file
    await fs.writeFile(
      dataFilePath,
      JSON.stringify({ endTime: newEndTime }),
      'utf8'
    );
    
    return Response.json({ 
      success: true, 
      message: 'Timer has been reset to 7 days',
      expiresAt: new Date(newEndTime).toISOString()
    });
  } catch (error) {
    console.error('Error resetting timer:', error);
    return Response.json({ 
      error: 'Failed to reset timer' 
    }, { status: 500 });
  }
}