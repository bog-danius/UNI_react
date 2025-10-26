
import fs from "fs";
import path from "path";

const [id] = process.argv.slice(2);
if (!id) {
    console.error("Использование: node delete.js <id>");
    process.exit(1);
}

const dataDir = path.join("data", "books");
const indexFile = path.join("data", "book_index.json");

if (!fs.existsSync(indexFile)) {
    console.error("Индексный файл отсутствует");
    process.exit(1);
}

const index = JSON.parse(fs.readFileSync(indexFile, "utf8"));
const record = index.find((r) => r.id === id);

if (!record) {
    console.error("Запись не найдена");
    process.exit(1);
}

const filePath = path.join(dataDir, record.filename);
if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

const newIndex = index.filter((r) => r.id !== id);
fs.writeFileSync(indexFile, JSON.stringify(newIndex, null, 2), "utf8");

console.log(`✅ Запись ${id} удалена`);
