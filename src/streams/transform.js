
import { Transform, pipeline } from "stream";
import process from "process";

const uppercase = new Transform({
    transform(chunk, encoding, callback) {
        callback(null, chunk.toString().toUpperCase());
    },
});

pipeline(process.stdin, uppercase, process.stdout, (err) => {
    if (err) console.error("Ошибка трансформации:", err.message);
});
