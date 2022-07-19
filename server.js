const express = require('express')
const app = express()

app.use(express.static('views')) // includes bootstrap

app.set('view-engine', 'ejs') //

app.get('/', (req, res) => {
    res.render('index.ejs', { name: 'Kyle' }) //passes variables
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.post('register', (req, res) => {

})


app.listen(3000) //port 3000 @localhost