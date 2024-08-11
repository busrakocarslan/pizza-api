"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Authentication Controller: 
//?token login işleminde lazım olunacağından ve oluşturulacağından token rouertden sonra bu kısma geçildi. 


// token model gerekiyor
const Token = require("../models/token");
// kullanıcı bilgileri için user model de gerekiyor
const User = require("../models/user");
// benzersiz bnit token için helper dosyasındaki func da gerekiyor. 
const passwordEncrypt = require("../helpers/passwordEncrypt");

const jwt = require('jsonwebtoken')

module.exports = {

    login: async (req, res) => {
        /*
                #swagger.tags = ["Authentication"]
                #swagger.summary = "Login"
                #swagger.description = 'Login with username (or email) and password for get simpleToken and JWT'
                #swagger.parameters["body"] = {
                    in: "body",
                    required: true,
                    schema: {
                        "username": "test",
                        "password": "aA?123456",
                    }
                }
            */
        const { username, email, password } = req.body;// req.body den destruc ile alıyoruz. 
        if (!((username || email) && password)) {// ya username ya da email ile password olmalı 
            res.errorStatusCode = 401;
            throw new Error("username/email and password are required");
        }
        const user = await User.findOne({ $or: [{ username }, { email }] });// kullanıcı adı veya email yazımı mongoose ile 
        if (user?.password !== passwordEncrypt(password)) {// password db deki ile uyuşuyormu 
            res.errorStatusCode = 401;
            throw new Error("incorrect username/email or password.");
        }
        if (!user.isActive) {// kullanıcı aktif mi
            res.errorStatusCode = 401;
            throw new Error("This account is not active.");
        }

        /* SIMPLE TOKEN */
        let tokenData = await Token.findOne({ userId: user.id });// daha önce verilmiş bir token var mı
        if (!tokenData) {// yoksa oluştur. 
            tokenData = await Token.create({
                userId: user.id,
                token: passwordEncrypt(user.id + Date.now()),//timestamp
            });
        }
      

        /* JWT */
        // ACCESS TOKEN
        const accessData = {
            _id: user._id,
            username: user.username,
            email: user.email,
            isActive: user.isActive,
            isAdmin: user.isAdmin,
        }
        // Convert to JWT:
        // jwt.sign(payload, key, { expiresIn: '30m' })
        const accessToken = jwt.sign(accessData, process.env.ACCESS_KEY, { expiresIn: '30m' })// jwt oluşturma methodu. 

        // REFRESH TOKEN
        const refreshData = {
            _id: user._id,
            password: user.password
        }
        // Convert to JWT:
        const refreshToken = jwt.sign(refreshData, process.env.REFRESH_KEY, { expiresIn: '3d' })
        /* JWT */

        res.send({
            error: false,
            token: tokenData.token,
            bearer: {// JWT ALANI
                access: accessToken,
                refresh: refreshToken
            },
            user,
        });
    },


    
    refresh: async (req, res) => {
    //     
    //         #swagger.tags = ["Authentication"]
    //         #swagger.summary = "Refresh"
    //         #swagger.description = 'Refresh with refreshToken for get accessToken'
    //         #swagger.parameters["body"] = {
    //             in: "body",
    //             required: true,
    //             schema: {
    //                 "bearer": {
    //                     refresh: '...refresh_token...'
    //                 }
    //             }
    //         }
    //     

        const refreshToken = req.body?.bearer?.refresh

        if (refreshToken) {

            const refreshData = await jwt.verify(refreshToken, process.env.REFRESH_KEY)
            // console.log(refreshData)

            if (refreshData) {

                const user = await User.findOne({ _id: refreshData._id })
                
                if (user && user.password == refreshData.password) {

                    if (user.isActive) {

                        res.status(200).send({
                            error: false,
                            bearer: {
                                access: jwt.sign(user.toJSON(), process.env.ACCESS_KEY, { expiresIn: '30m' })
                            }
                        })

                    } else {
                        res.errorStatusCode = 401
                        throw new Error("This account is not active.")
                    }
                } else {
                    res.errorStatusCode = 401
                    throw new Error('Wrong id or password.')
                }
            } else {
                res.errorStatusCode = 401
                throw new Error('JWT refresh data is wrong.')
            }
        } else {
            res.errorStatusCode = 401
            throw new Error('Please enter bearer.refresh')
        }

    },

    logout: async (req, res) => {
        /*
                #swagger.tags = ["Tokens"]
                #swagger.summary = "Create Token"
            */

        const auth = req.headers?.authorization; //"Token token"
        const tokenKey = auth ? auth.split(" ") : null; // [ "Token", tokenKey]// stringi boşluktan ikiye ayırıyoruz split ile

        if (tokenKey[0] == "Token") {

            const result = await Token.deleteOne({ token: tokenKey[1] });// 0 index token stringine eşitse 1 inseksteki tokenkey i siliyoruz. 
    
            res.send({
                error: false,
                message: "Token deleted. Logout was OK.",
                result,
            });

        }else if (tokenKey[0] == "Bearer") {

            res.send({
                error: false,
                message: 'JWT: No need any process for logout.',
            })
        }
    },
};

