const express = require('express')
const app = express()
const { syncAndSeed } = require('../db')
const students = require('./students')
const schools = require('./schools')
const path = require('path')
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000

syncAndSeed()

app.use(bodyParser.json())

app.use('/api/schools', schools)
app.use('/api/students', students)

app.use('/dist', express.static(path.join(__dirname, '..', 'dist')))

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'))
})

app.listen(port, () => {
  console.log(`listening to port: ${port}`)
})

