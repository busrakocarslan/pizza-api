"use strict"
/* -------------------------------------------------------
	EXPRESS - PiZZA API
------------------------------------------------------- */
require('dotenv').config()
const HOST = process.env?.HOST || '127.0.0.1'
const PORT = process.env?.PORT || 8000
/* ------------------------------------------------------- */
const swaggerAutogen = require('swagger-autogen')()
const packageJson = require('./package.json')
//?ön temel ayarlar burada burası manual olarak girilecek kısım

const document = {
	info: {
		version: packageJson.version,
		title: packageJson.title,
		description: packageJson.description,
		// termsOfService: "http://www.CourseName.com/#",
		contact: { name: packageJson.author, email: "abc@abc.com" },
		license: { name: packageJson.license, },
	},
	host: `${HOST}:${PORT}`,
	basePath: '/',
	schemes: ['http', 'https'],
	// consumes: ["application/json"],
	// produces: ["application/json"],
	securityDefinitions: {// sistemde kullanacağım güvenlik
		Token: {
			type: 'apiKey',
			in: 'header',
			name: 'Authorization',
			description: 'Simple Token Authentication * Example: <b>Token ...tokenKey...</b>'
		},
		Bearer: {
			type: 'apiKey',
			in: 'header',
			name: 'Authorization',
			description: 'JWT Authentication * Example: <b>Bearer ...accessToken...</b>'
		},
	},
	security: [{ Token: [] }, { Bearer: [] }],
	definitions: {
		"Order":require("./src/models/order").schema.obj,
		"Topping":require("./src/models/topping").schema.obj,
		"Pizza":require("./src/models/pizza").schema.obj,
		"User":require("./src/models/user").schema.obj
		// Models:
		// "User": require('./src/models/user').schema.obj,
	}
}

const routes = ['./index.js']
const outputFile = './src/configs/swagger.json'

// Create JSON file:
swaggerAutogen(outputFile, routes, document)