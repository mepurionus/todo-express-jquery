const express = require('express');

const backend = require('./backend/main');
const frontend = require('./frontend/main');

const app = express();
const port = 3000;

app.use('/back', backend);
app.use('/', frontend);

app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})