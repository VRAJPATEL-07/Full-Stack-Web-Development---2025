import fs from 'fs/promises';
import path from 'path';

const fileCategories = {
    Images: ['.jpg', '.jpeg', '.png', '.gif', '.bmp'],
    Documents: ['.pdf', '.docx', '.txt', '.xlsx', '.pptx'],
    Videos: ['.mp4', '.mkv', '.avi', '.mov'],
};

const getFileCategory = (fileName) => {
    const ext = path.extname(fileName).toLowerCase();
    for (const [category, extensions] of Object.entries(fileCategories)) {
        if (extensions.includes(ext)) return category;
    }
    return 'Others';
};

const organizeFiles = async (directoryPath) => {
    try {

        const files = await fs.readdir(directoryPath);
        if (files.length === 0) {
            console.log("📂 The directory is empty. Nothing to organize.");
            return;
        }

        const logsDir = path.join(directoryPath, 'logs');
        await fs.mkdir(logsDir, { recursive: true });

        let logMessages = [`📂 File Organization Summary (${new Date().toLocaleString()})\n`];

        const fileOperations = files.map(async (file) => {
            const filePath = path.join(directoryPath, file);
            const stat = await fs.stat(filePath);

            if (stat.isDirectory()) return;

            const category = getFileCategory(file);
            const categoryFolder = path.join(directoryPath, category);

            await fs.mkdir(categoryFolder, { recursive: true });

            const newFilePath = path.join(categoryFolder, file);
            await fs.rename(filePath, newFilePath);

            logMessages.push(`✅ Moved: ${file} → ${category}/`);
        });

        await Promise.all(fileOperations);

        const logFilePath = path.join(logsDir, 'summary.txt');
        await fs.writeFile(logFilePath, logMessages.join("\n"), 'utf8');

        console.log("✅ Files organized successfully! Check 'summary.txt' for details.");
    } catch (error) {
        console.error("❌ Error organizing files:", error.message);
    }
};

const directoryPath = process.argv[2];

if (!directoryPath) {
    console.log("❌ Please provide a directory path.");
    console.log("Example: node organizer.js ./test-folder");
    process.exit(1);
}

organizeFiles(directoryPath);
