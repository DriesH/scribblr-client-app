const express = require('express');
const app = express();

const LISTEN_PORT = 8080;

app.use(express.static('static'));

app.get('/*', (req, res) => {
    res.sendFile(__dirname  + '/static/index.html');
});

app.listen(LISTEN_PORT, function () {
    console.log(`Server listening on port ${LISTEN_PORT}!`);
});