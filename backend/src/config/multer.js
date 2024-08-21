const multer = require('multer');
const path = require('path');

// Configuração do multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public'); // Diretório onde as imagens serão armazenadas
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nome único para a imagem
    }
});

const dowload = multer({ storage: storage });

module.exports = dowload;