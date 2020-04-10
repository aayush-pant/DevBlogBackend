const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)

const User = require('./models/user');

const MONGODB_URI = 'mongodb://localhost:27017/devBlog'

const app = express()
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
})

// const routes = require('./routes/routes')
const authRoutes = require('./routes/auth')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store
    })
)

app.use((req, res, next) => {
    if (!req.session.user) {
        return next()
    }
    User.findById(req.session.user._id)
        .then(user => {
            req.user = user
            next()
        })
        .catch(err => console.log(err))
})

// app.use(routes)
app.use(authRoutes)

mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });
