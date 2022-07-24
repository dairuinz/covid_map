module.exports.login = function login(app, express) {

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

  const users = [{
    id: '1658505443797',
    username: 'o',
    mail: 'o',
    password: '$2b$10$QmLQkcuv1PszaLhsvk7FrOz3RCUgBjdKDH.IIkXjlHAHXE6grAGJi'
  }] //instead of database for users

  app.use(express.static('views')) // includes bootstrap

  app.set('view-engine', 'ejs')
  app.use(express.urlencoded({
    extended: false
  }))
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
    res.render('index.ejs', {
      name: req.user.username
    }) //passes variables
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

  app.post('/register', checkNotAuthenticated, async (req, res) => {
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
    console.log(req.body.mail)
  })

  app.delete('/logout', function(req, res, next) {
    req.logout(function(err) {
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
}
