 
  };
  
  fs.writeFileSync(
    timerFilePath,
    JSON.stringify(timerData, null, 2),
    'utf8'// scripts/setup-data.js
const fs = require('fs');
const path = require('path');

// Create data directory if it doesn't exist
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  console.log('Creating data directory...');
  fs.mkdirSync(dataDir, { recursive: true });
}

// Create initial timer.json file with a 7-day countdown
const timerFilePath = path.join(dataDir, 'timer.json');
//if (!fs.existsSync(timerFilePath)) {
 // console.log('Creating initial timer data...');
  
 // const sevenDaysFromNow = new Date();
 // sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
  
 // const timerData = {
   // endTime: sevenDaysFromNow.getTime()
  //);
  
 // console.log(`Timer set to expire on ${new Date(timerData.endTime).toLocaleString()}`);
//} else {
 // console.log('Timer data already exists.');
 // const data = JSON.parse(fs.readFileSync(timerFilePath, 'utf8'));
 // console.log(`Current timer expiration: ${new Date(data.endTime).toLocaleString()}`);
//}

console.log('Setup complete!'); 
