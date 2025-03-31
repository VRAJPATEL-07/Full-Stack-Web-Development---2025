const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware: Log visits (IP, time) to visits.log
app.use((req, res, next) => {
  const logEntry = `${new Date().toISOString()} - ${req.ip}\n`;
  fs.appendFile("visits.log", logEntry, (err) => {
    if (err) console.error("Error writing to log file:", err);
  });
  next();
});

// Middleware: Serve static files from "public" directory
app.use(express.static("public"));

// API Endpoint: Retrieve log data
app.get("/logs", (req, res) => {
  fs.readFile("visits.log", "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ message: "Error reading log file" });
    } else {
      const logs = data.trim().split("\n").map((entry) => {
        const [timestamp, ip] = entry.split(" - ");
        return { timestamp, ip };
      });
      res.json(logs);
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
