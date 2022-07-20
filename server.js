if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt') //for passwords
const passport = require('passport')
const flash = require('express-flash')

const initializePassport = require('./passport-config')
const { session } = require('passport')
initializePassport(
    passport,
    username => users.find(user => user.username === username)
)

const users = [] //instead of database for users

app.use(express.static('views')) // includes bootstrap

app.set('view-engine', 'ejs') //
app.use(express.urlencoded({ extended: false })) //access mail etc inside request variable in post method
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUnitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())


app.get('/', (req, res) => {
    res.render('index.ejs', { name: 'Kyle' }) //passes variables
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.post('/register', async(req, res) => {
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


app.listen(3000) //port 3000 @localhost