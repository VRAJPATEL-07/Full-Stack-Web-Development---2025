import fs from 'fs';
import os from 'os';
import path from 'path';

const getSystemInfo = () => {
  return {
    OS_Type: os.type(),  
    Total_Memory: `${(os.totalmem() / 1e9).toFixed(2)} GB`,
    Free_Memory: `${(os.freemem() / 1e9).toFixed(2)} GB`,
    CPU_Details: os.cpus().map(cpu => cpu.model),
    Uptime: `${(os.uptime() / 3600).toFixed(2)} hours`
  };
};

const saveSystemInfo = () => {
  const systemInfo = getSystemInfo();
  const logData = `System Information:\n${JSON.stringify(systemInfo, null, 2)}\n`;

  const logDir = path.join(process.cwd(), 'logs');
  const logFile = path.join(logDir, 'system-info.txt');

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  fs.writeFileSync(logFile, logData, 'utf8');
  console.log(`✅ System information saved to: ${logFile}`);
};

console.log("🔍 Fetching system details...");
saveSystemInfo();
