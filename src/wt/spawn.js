import fs from "fs";
import path from "path";

const [keyword] = process.argv.slice(2);
if (!keyword) {
    console.error("Использование: node spawn.js <ключевое слово>");
    process.exit(1);
}

function searchInDir(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
        const filePath = path.join(dir, file.name);
        if (file.isDirectory()) {
            searchInDir(filePath);
        } else {
            const content = fs.readFileSync(filePath, "utf8");
            if (content.toLowerCase().includes(keyword.toLowerCase())) {
                console.log("Найдено в:", filePath);
            }
        }
    }
}

searchInDir("data/books");
console.log("✅ Поиск завершён");
