const fs = require("fs");
const path = require("path");
const mime = require("mime-types"); 

const serveFile = (filePath, response) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            response.writeHead(404, { "Content-Type": "text/html" });
            response.end("<h1>404 - File Not Found</h1>");
        } else {
            const contentType = mime.lookup(filePath) || "application/octet-stream";
            response.writeHead(200, { "Content-Type": contentType });
            response.end(data);
        }
    });
};

module.exports = { serveFile };
