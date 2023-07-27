
import multer from "multer";

//delimitar tamanho de imagem aceita
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {fileSize: 2 * 1024 * 1024},
});

export {upload};