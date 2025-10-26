
import fs from "fs";

const [filename] = process.argv.slice(2);
if (!filename) {
    console.error("Использование: node write.js <файл>");
    process.exit(1);
}

const stream = fs.createWriteStream(filename);
process.stdin.pipe(stream);
console.log("Введите данные (Ctrl+C для выхода):");
