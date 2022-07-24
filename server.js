if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

var login = require('./backend/login.js')

const express = require('express')
const mysql = require('mysql')
const app = express()

app.set('view-engine', 'ejs')
app.use(express.urlencoded({
  extended: false
}))

// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "covidmap",
//   multipleStatements: true
// });
//
// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected");
// });

app.use(express.static('views')) // includes bootstrap

app.listen(3000) //port 3000 @localhost


login.login(app, express)
