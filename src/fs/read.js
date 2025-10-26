
import fs from "fs";
import path from "path";

const [id] = process.argv.slice(2);
if (!id) {
    console.error("Использование: node read.js <id>");
    process.exit(1);
}

const dataDir = path.join("data", "books");
const indexFile = path.join("data", "book_index.json");
if (!fs.existsSync(indexFile)) {
    console.error("Индексный файл не найден");
    process.exit(1);
}

const index = JSON.parse(fs.readFileSync(indexFile, "utf8"));
const record = index.find((r) => r.id === id);

if (!record) {
    console.error("Запись не найдена");
    process.exit(1);
}

const filePath = path.join(dataDir, record.filename);
const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
console.log(data);
