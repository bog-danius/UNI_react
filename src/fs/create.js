
import fs from "fs";
import path from "path";

const [title, author, isbn, year] = process.argv.slice(2);
if (!title || !author || !isbn || !year) {
    console.error("Использование: node create.js <Название> <Автор> <ISBN> <Год>");
    process.exit(1);
}

const dataDir = path.join("data", "books");
const indexFile = path.join("data", "book_index.json");

if (!fs.existsSync("data")) fs.mkdirSync("data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(indexFile)) fs.writeFileSync(indexFile, "[]", "utf8");

const id = Date.now().toString();
const filename = `book_${id}.json`;
const filePath = path.join(dataDir, filename);

if (fs.existsSync(filePath)) {
    console.error("Ошибка операции FS: Запись уже существует");
    process.exit(1);
}

const bookData = { id, title, author, isbn, year };
fs.writeFileSync(filePath, JSON.stringify(bookData, null, 2), "utf8");

const index = JSON.parse(fs.readFileSync(indexFile, "utf8"));
index.push({ id, title, author, filename });
fs.writeFileSync(indexFile, JSON.stringify(index, null, 2), "utf8");

console.log(`✅ Создана запись: ${filename}`);
