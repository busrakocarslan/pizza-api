"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
// sendMail(to, subject, message)

const nodemailer = require('nodemailer')

module.exports = function sendMail(to, subject, message) {

    //* GoogleMail (gmail)
    //* Google -> AccountHome -> Security -> Two-Step-Verify -> App-Passwords
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'abc@gmail.com',
            pass: 'jlrk sjya jlka xtmj'//!uygulama şifresi kısmından 
        }
    })

    // SendMail:
    transporter.sendMail({

        from: 'abc@gmail.com',
        // to: 'qadir@clarusway.com', // 'abc@def.com, def@ghi.com'
        to: to,//? parametreden geliyor
        // subject: 'Hello',
        subject: subject,//? parametreden geliyor
        // text: 'Hello There. How are you?',
        text: message,//? parametreden geliyor
        // html: '<p> <b> Hello There </b> <br> How are you? </p>',
        html: message,//? parametreden geliyor

    }, function (error, success) {

        success ? console.log('SUCCESS:', success) : console.log('ERROR: ', error)
    })

}