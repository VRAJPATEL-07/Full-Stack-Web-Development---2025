const http = require("http");
const fs = require("fs");
const path = require("path");
const { serveFile } = require("./fileHandler"); 

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, "public");

const server = http.createServer((req, res) => {
    let filePath = path.join(PUBLIC_DIR, req.url === "/" ? "index.html" : req.url);

    if (!fs.existsSync(filePath) || fs.lstatSync(filePath).isDirectory()) {
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end("<h1>404 - Page Not Found</h1>");
    }

    serveFile(filePath, res);
});

server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}/`);
});
