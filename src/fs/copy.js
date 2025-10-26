import fs from "fs";
import path from "path";

function copyRecursive(src, dest) {
    fs.mkdirSync(dest, { recursive: true });
    const items = fs.readdirSync(src, { withFileTypes: true });

    for (const item of items) {
        const srcPath = path.join(src, item.name);
        const destPath = path.join(dest, item.name);

        if (item.isDirectory()) {
            copyRecursive(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

const [srcDir, destDir] = process.argv.slice(2);
if (!srcDir || !destDir) {
    console.error("Использование: node copy.js <source_folder> <destination_folder>");
    process.exit(1);
}

try {
    copyRecursive(srcDir, destDir);
    console.log("✅ Копирование завершено успешно!");
} catch (err) {
    console.error("Ошибка копирования:", err.message);
}
