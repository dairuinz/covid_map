var path= require('path');
var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser'); //all http requests ta opoia eksagonte sto body.request
var login= require('./backend/login.js');
var signup =require('./backend/signup.js');
var app = express();
app.use(express.json());

//var login =require('./backend/login.js');



if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

//var login = require('./backend/login.js')
//var user_settings = require('./backend/user_settings.js')
// var geoloc = require('./backend/geoloc.js')


app.use(express.static('html'));
// const exphbs = require('express-handbars')


//app.set('view-engine', 'ejs')
app.use(express.urlencoded({
  extended: false
}))

//app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json({limit:"50mb" , extended:true , parameterLimit:50000}));
app.use(bodyParser.urlencoded({limit:"50mb" , extended:true,parameterLimit:50000}));

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "aek",
  multipleStatements: true
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("SQL Connected");
});


var PORT = 3000;
 
app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})



login.login(app,connection,path);

signup.signup(app,connection);

//user_settings.user_settings(app, express, connection);
// geoloc.geoloc()


app.use(express.static('login-signup')); // includes bootstrap
