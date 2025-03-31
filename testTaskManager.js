import { addTask, sortTasksByPriority, getTasksDueIn, sendReminders, tasks } from './taskManager.js';

addTask("Complete MERN Project", 15, "high");
addTask("Revise JavaScript", 5, "medium");
addTask("Check Emails", 10, "low");

console.log("📋 Tasks Sorted by Priority:", sortTasksByPriority());

console.log("🕒 Tasks Due in 10 Minutes:", getTasksDueIn(10));

sendReminders();

const maxDueTime = Math.max(...tasks.map(task => task.dueTime - new Date()));
setTimeout(() => {
  console.log("✅ All reminders have been sent. Exiting...");
  process.exit();
}, maxDueTime + 1000); 
