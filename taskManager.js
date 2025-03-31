const tasks = [];

export const addTask = (title, dueTime, priority) => {
  try {
    if (!title || typeof title !== "string") throw new Error("Title must be a non-empty string.");
    if (isNaN(dueTime) || dueTime <= 0) throw new Error("Due time must be a positive number.");
    if (!["high", "medium", "low"].includes(priority)) throw new Error("Priority must be 'high', 'medium', or 'low'.");

    const newTask = {
      title,
      dueTime: new Date(Date.now() + dueTime * 60 * 1000), 
      priority,
    };

    tasks.push(newTask);
    console.log(`✅ Task "${title}" added successfully.`);
  } catch (error) {
    console.error(`❌ Error adding task: ${error.message}`);
  }
};

export const sortTasksByPriority = () => {
  const priorityOrder = { high: 1, medium: 2, low: 3 };
  return tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
};

export const getTasksDueIn = (minutes) => {
  const now = new Date();
  const futureTime = new Date(now.getTime() + minutes * 60 * 1000);
  return tasks.filter(task => task.dueTime >= now && task.dueTime <= futureTime);
};

export const sendReminders = () => {
  tasks.forEach(task => {
    const timeUntilDue = task.dueTime - new Date();
    if (timeUntilDue > 0) {
      setTimeout(() => {
        console.log(`🔔 Reminder: Task "${task.title}" is due now!`);
      }, timeUntilDue);
    }
  });
};

export { tasks };
