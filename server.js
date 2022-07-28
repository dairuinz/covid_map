if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

var login = require('./backend/login.js')
var user_settings = require('./backend/user_settings.js')
// var geoloc = require('./backend/geoloc.js')

const express = require('express')
const mysql = require('mysql')
const app = express()
// const exphbs = require('express-handbars')


app.set('view-engine', 'ejs')
app.use(express.urlencoded({
  extended: false
}))

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "roheyan22",
  database: "covidmap",
  multipleStatements: true
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("SQL Connected");
});

app.use(express.static('views')) // includes bootstrap

app.listen(3000) //port 3000 @localhost


login.login(app, express, connection)
user_settings.user_settings(app, express, connection)
// geoloc.geoloc()
