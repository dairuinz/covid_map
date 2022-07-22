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

const initializePassport = require('./passport-config')
initializePassport(
    passport,
    username => users.find(user => user.username === username),
    id => users.find(user => user.id === id)
)

app.use(express.static('views')) // includes bootstrap
const users = [] //instead of database for users


app.set('view-engine', 'ejs') //
app.use(express.urlencoded({ extended: false })) //access mail etc inside request variable in post method
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
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
    console.log(users)
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

//SQL

// var con = require('./connection')
// // var express = require('express')
// // var app = express()

// var bodyParser = require('body-parser')

// app.user(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended:true }))
// app.set('view engine', 'ejs')

// app.get('/', function(req, res){
//   res.sendFile(__dirname+'/register.ejs')
// })

app.listen(3000) //port 3000 @localhost