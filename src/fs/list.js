
import fs from "fs";
const indexFile = "data/book_index.json";

if (!fs.existsSync(indexFile)) {
    console.error("Нет данных для отображения");
    process.exit(1);
}

const list = JSON.parse(fs.readFileSync(indexFile, "utf8"));
console.table(list);
