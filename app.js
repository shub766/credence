const express = require('express')
const mongoose = require('mongoose')
const logger = require('..//crypt/logger.js')
const url = 'mongodb://localhost/Author'
const app = express()
mongoose.connect(url,{useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected..............')
})

app.use(express.json())
app.use('uploads',express.static('uploads'))
const authorrouter = require('./routes/author')
app.use('/author',authorrouter)

const encryptcryptrorouter = require('./routes/encryptcrypto')
app.use('/encrypt',encryptcryptrorouter)

const decryptcryptrorouter = require('./routes/decryptcrypto')
app.use('/decrypt',decryptcryptrorouter)

app.listen(9000,() => {
    logger.info('info','server started!!!!!')
})

module.exports = app