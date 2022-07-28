module.exports.user_settings = function user_settings(app, express, connection) {

  app.use(express.static('views')) // includes bootstrap


  app.get('/user_settings', checkAuthenticated, (req, res) => {
    res.render('user_settings.ejs', {
      name: req.user.username,
      password: req.user.password,
      mail: req.user.mail
    }) //passes variables
  })

  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }

    res.redirect('/login') //if user is not logged in goes to the logic page
  }

}
