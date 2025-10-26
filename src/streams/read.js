
import fs from "fs";

const [filename] = process.argv.slice(2);
if (!filename) {
    console.error("Использование: node read.js <файл>");
    process.exit(1);
}

const stream = fs.createReadStream(filename, { encoding: "utf8" });
stream.on("data", (chunk) => console.log("Часть данных:", chunk));
stream.on("end", () => console.log("Чтение завершено"));
stream.on("error", (err) => console.error("Ошибка:", err.message));
