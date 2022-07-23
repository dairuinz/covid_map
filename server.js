if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

//LOGIN

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
var bodyParser = require('body-parser');

const initializePassport = require('./passport-config')
initializePassport(
    passport,
    username => users.find(user => user.username === username),
    id => users.find(user => user.id === id)
)

const users = [ { id: '1658505443797',
    username: 'o',
    mail: 'o',
    password:
     '$2b$10$QmLQkcuv1PszaLhsvk7FrOz3RCUgBjdKDH.IIkXjlHAHXE6grAGJi' } ] //instead of database for users

//SQL

var mysql = require('mysql');
var util = require('util');
const url = require('url');
var bodyParser = require('body-parser')
var createError = require('http-errors')
var con = require('./database')
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)
// var formidable = require('formidable');


app.use(express.static('views')) // includes bootstrap

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method')) //to override the post so it can use delete and logout

app.get('/index', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.username }) //passes variables
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/login',
    failureFlash: true //to show the messages we have at passport-config
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async(req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(), //id for each user
            username: req.body.username, //passes the name variable from ejs
            mail: req.body.mail,
            password: hashedPassword
        })
        //   // const query = util.promisify(con.query).bind(con)
        //   var mquery = "SELECT * FROM users WHERE username like \'"+req.body.username+"\' AND mail like \'"+req.body.mail+"\';"
        //   // console.log(req.body.mail)
        //   console.log(con.query)
        // })
        //
        // con.query("SELECT * FROM users WHERE username like \'"+req.body.username+"\' AND mail like \'"+req.body.mail+"\';", function (
        //   error,
        //   response,
        // ) {
        //   console.log(error)
        // })
        // console.log('ok')
        // var sql = "SELECT * FROM USERS;"
        // con.query(sql, function (err, result) {
        //   if (err){
        //     console.log(err)
        //   }else{
        //     console.log('ADDED')
        //   }
        // })
        // console.log('okok')

        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
    console.log(req.body.mail)
})

app.delete('/logout', function(req, res, next) {
    req.logOut(function(err) {
        if (err) {
            return next(err);
        }
        res.redirect('/login');
    });
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login') //if user is not logged in goes to the logic page
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/index')
    }
    next() //if user logged in cant enter login.ejs or register.ejs
}





app.listen(3000) //port 3000 @localhost
