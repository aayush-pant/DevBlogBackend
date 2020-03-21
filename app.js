const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const mongoConnnect = require('./util/database').mongoConnect
const routes = require('./routes/routes')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(routes)

mongoConnect(() => {
    app.listen(3000);
})