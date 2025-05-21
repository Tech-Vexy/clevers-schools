// app/api/timer/route.js
import { promises as fs } from 'fs';
import path from 'path';

// Path to our timer data file
const dataFilePath = path.join(process.cwd(), 'data', 'timer.json');

// Initialize data directory and file if they don't exist
async function ensureDataFile() {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    
    try {
      await fs.access(dataDir);
    } catch {
      // Create data directory if it doesn't exist
      await fs.mkdir(dataDir, { recursive: true });
    }
    
    try {
      await fs.access(dataFilePath);
    } catch {
      // Create timer.json with default value if it doesn't exist
      const sevenDaysFromNow = new Date();
      sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
      
      await fs.writeFile(
        dataFilePath, 
        JSON.stringify({ 
          endTime: sevenDaysFromNow.getTime() 
        }),
        'utf8'
      );
    }
  } catch (error) {
    console.error('Error ensuring data file exists:', error);
  }
}

// Get timer data
export async function GET() {
  await ensureDataFile();
  
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return Response.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading timer data:', error);
    return Response.json({ error: 'Failed to read timer data' }, { status: 500 });
  }
}

// Update timer data (not used in current implementation but could be useful)
export async function POST(request: { json: () => any; }) {
  await ensureDataFile();
  
  try {
    const body = await request.json();
    
    if (!body.endTime) {
      return Response.json({ error: 'Missing endTime parameter' }, { status: 400 });
    }
    
    await fs.writeFile(
      dataFilePath,
      JSON.stringify({ endTime: body.endTime }),
      'utf8'
    );
    
    return Response.json({ success: true });
  } catch (error) {
    console.error('Error updating timer data:', error);
    return Response.json({ error: 'Failed to update timer data' }, { status: 500 });
  }
}