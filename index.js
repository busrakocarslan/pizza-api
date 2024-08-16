"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
/*
    $ cp .env-sample .env
    $ npm init -y
    $ npm i express dotenv mongoose express-async-errors
    $ npm i morgan swagger-autogen swagger-ui-express redoc-express
    $ mkdir logs
    $ nodemon
*/
const express = require("express");
const app = express();

/* ------------------------------------------------------- */
// Required Modules:

// envVariables to process.env:
require("dotenv").config();
const PORT = process.env?.PORT || 8000;

// asyncErrors to errorHandler:
require("express-async-errors");
const path = require("path")

/* ------------------------------------------------------- */
// Configrations:

// Connect to DB:
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

/* ------------------------------------------------------- */
// Middlewares:

// Accept JSON:
app.use(express.json());

app.use(express.static(path.resolve(__dirname, "./public")))

// Logger:
//  app.use(require("./src/middlewares/logger"));

Auhentication: app.use(require("./src/middlewares/authentication"));

// findSearchSortPage / res.getModelList:
app.use(require("./src/middlewares/queryHandler"));

/* ------------------------------------------------------- */
//?E-MAİL
//npm install nodemailer--NodeMailer.com
// const nodemailer = require("nodemailer");
//?fayk mail oluşturma
//nodemailer.createTestAccount().then((data)=>console.log(data))// bana etherial.mail den fayk mail açıyor.bir kere oluşturdukta sonra yoruma aldım tekrar oluşturmasın diye
/*{
  user: 'tmvrab4lfgngjb34@ethereal.email',-->
  pass: 'tFPNDmXaK3vb9hVvfM',
  smtp: { host: 'smtp.ethereal.email', port: 587, secure: false },-->email alırken geçerli protokol
  imap: { host: 'imap.ethereal.email', port: 993, secure: true },,-->email gönderirken geçerli protokol
  pop3: { host: 'pop3.ethereal.email', port: 995, secure: true },,-->email gönderirken geçerli protokol
  web: 'https://ethereal.email',
  mxEnabled: false
}*/
// mail göndermeden sunucuya bağlanma

//? Connect to MailServer/SMTP:
// const transporter = nodemailer.createTransport({
//   // sunucuya bağlı obj
//   // SMTP: yani gönderme protokolü ayarları
//   host: "smtp.ethereal.email", // hangi sunucu
//   port: 587, //  sucunun hangi prtu
//   secure: false, // güvenlik olsun mu olmasın mı
//   auth: {
//     // bağlanacağım kullanıcı adi va şifresi
//     user: "tmvrab4lfgngjb34@ethereal.email",
//     pass: "tFPNDmXaK3vb9hVvfM",
//   },
// });
// // console.log(transporter)
// //?SEND MAİL
// //transporter.sendMail({},funtion(err,success))

// transporter.sendMail(
//   {
//     from: "tmvrab4lfgngjb34@ethereal.email", // kullanıcı adınla aynı olmalı yoksa spam a düşüyor.
//     to: "beraybusrakocarslan@gmail.com", // 'abc@def.com, def@ghi.com'
//     subject: "Hello",
//     text: "Hello There. How are you?",
//     html: "<p> <b> Hello There </b> <br> How are you? </p>",
//   },
//   function (err, success) {
//     success ? console.log('SUCCESS:', success) : console.log('ERROR: ', error)
//   }
// );
//!GOOGLE İÇİN
// //* Google -> AccountHome -> Security -> Two-Step-Verify -> App-Passwords
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'beraybusrakocarslan@gmail.com',
//         pass: 'jlrk sjya jlka xtmj'//!uygulama şifresi kısmından
//     }
// })
//sendMail:
// transporter.sendMail(
//   {
//     from: "beraybusrakocarslan@gmail.com", // kullanıcı adınla aynı olmalı yoksa spam a düşüyor.
//     to: "veyselkocarslan@gmail.com", // 'abc@def.com, def@ghi.com'
//     subject: "Hello",
//     text: "Bu meil sana olan aşkımın koda dökülmüş halidir.?",
//     html: "<p> <h1> Canım yarim  </h1> <br> I love Code </p>",
//   },
//   function (err, success) {
//     success ? console.log('SUCCESS:', success) : console.log('ERROR: ', error)
//   }
// );
//!YandexMail (yandex)
// const transporter = nodemailer.createTransport({
//     service: 'yandex',
//     auth: {
//         user: 'test@yandex.com',
//         pass: '11' // your email-password
//     }
// })

// SendMail:
// transporter.sendMail({

//     from: 'qadir@clarusway.com',
//     to: 'qadir@clarusway.com', // 'abc@def.com, def@ghi.com'
//     subject: 'Hello',
//     text: 'Hello There. How are you?',
//     html: '<p> <b> Hello There </b> <br> How are you? </p>',

// }, function (error, success) {

//     success ? console.log('SUCCESS:', success) : console.log('ERROR: ', error)
// })

//! tüm emil kodları için helper/sendMail

/* ------------------------------------------------------- */
// Routes:

// routes/index.js:
app.use("/", require("./src/routes/")); // tüm routesleri topladığım dosyadan hepsnii çekiyorum!!!

// HomePath:
app.all("/api/v1", (req, res) => {
  res.json({
    message: "Welcome to Stock api!",
    documents: [
      "/api/v1/documents/json",
      "/api/v1/documents/swagger",
      "/api/v1/documents/redoc",
    ],
    user: req.user,
  });
});

//main route index
app.use("/api/v1", require("./src/routes/routerIndex"));

//? nodejs gelen her veriyi dimatik-router kabul edip bir controller a havale etmek ister;ancak static dosyaları bu şekilde belirtmemiz gerekir.
// StaticFile:
// app.use('/uploads', express.static('./uploads'))
app.use("/images", express.static("./uploads")); //1.parametre URL,2.parametre verinin alınacağı dısya adı.
/* ------------------------------------------------------- */

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')() // !!! It clear database.
