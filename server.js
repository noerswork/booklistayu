// memuat express framework dan body parser
const express = require('express');
const bodyParser = require('body-parser');

// membuat instance dari express untuk end point
const app = express();

//  memuat file system librabry
const fs = require('fs');

// konfigurasi express dengan body parse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.get('/', function (req, res) {
    res.redirect(routes);
});

// memuat route yang akan digunakan
const routes = require('./routes/routes.js')(app, fs);

// menentukan port server
const server = app.listen(3001, () => {
    console.log('listening on port %s ...', server.address())
});