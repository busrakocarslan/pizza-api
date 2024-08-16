"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

// UPLOAD (Multer Middleware)
// npm i multer
// https://expressjs.com/en/resources/middleware/multer.html

const multer = require('multer')

// module.exports = multer({
//     // dest: './uploads',
//     storage: multer.diskStorage({
//         destination: './uploads',
//         filename: function (req, file, returnCallback) {
//             // console.log('file', file)
//             // returnCallback(error, fileName)
//             // returnCallback(null, file.originalname)
//             returnCallback(null, Date.now() + '_' + file.originalname)// hata göndermiyoruz ve dosya isminiş ayarlıyoruz. dosya ismi aybı olursa üst üste bastığı içinde date.now ile timestamp ekliyoruz.
//         }
//     })
// })
// const multer = require('multer');

module.exports = multer({
    storage: multer.memoryStorage(), // Dosyalar bellekte tutulacak
});
