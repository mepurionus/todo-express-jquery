const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'pug_files'));

app.use(express.static(path.join(__dirname, '..', 'node_modules', 'jquery', 'dist')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('', (req, res) => {
    res.render('index');
})

module.exports = app;