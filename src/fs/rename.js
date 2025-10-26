
import fs from "fs";

const [oldName, newName] = process.argv.slice(2);
if (!oldName || !newName) {
    console.error("Использование: node rename.js <старое имя> <новое имя>");
    process.exit(1);
}

try {
    if (!fs.existsSync(oldName)) throw new Error("Файл не найден");
    fs.renameSync(oldName, newName);
    console.log(`✅ Файл переименован: ${newName}`);
} catch (err) {
    console.error("Ошибка переименования:", err.message);
}
