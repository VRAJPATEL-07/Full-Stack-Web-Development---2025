const http = require("http");
const fs = require("fs");
const url = require("url");

const PORT = 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method;
  const pathname = parsedUrl.pathname;

  // GET all users
  if (pathname === "/users" && method === "GET") {
    fs.readFile("users.json", "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Error reading users file" }));
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(data);
      }
    });

  // POST a new user
  } else if (pathname === "/users" && method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        if (!body) {
          throw new Error("Empty request body");
        }

        const newUser = JSON.parse(body);
        if (!newUser.name || !newUser.email) {
          throw new Error("Missing required fields: name and email");
        }

        fs.readFile("users.json", "utf8", (err, data) => {
          let users = [];
          if (!err) {
            users = JSON.parse(data);
          }

          newUser.id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
          users.push(newUser);

          fs.writeFile("users.json", JSON.stringify(users, null, 2), (err) => {
            if (err) {
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ message: "Error saving user" }));
            } else {
              res.writeHead(201, { "Content-Type": "application/json" });
              res.end(JSON.stringify(newUser));
            }
          });
        });

      } catch (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: error.message }));
      }
    });

  // DELETE a user by ID
  } else if (pathname.match(/^\/users\/\d+$/) && method === "DELETE") {
    const id = parseInt(pathname.split("/")[2]);

    fs.readFile("users.json", "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Error reading users file" }));
        return;
      }

      let users = JSON.parse(data);
      const newUsers = users.filter(user => user.id !== id);

      if (users.length === newUsers.length) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "User not found" }));
        return;
      }

      fs.writeFile("users.json", JSON.stringify(newUsers, null, 2), (err) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Error deleting user" }));
        } else {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "User deleted successfully" }));
        }
      });
    });

  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
