const express = require('express')
const mongoose = require('mongoose')
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

app.listen(9000,() => {
    console.log('server started!!!!!')
})