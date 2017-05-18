const express = require('express');
const app = express();

app.set('port', process.env.PORT || 8080);

app.use(express.static('static'));

app.get('/*', (req, res) => {
    res.sendFile(__dirname  + '/static/index.html');
});

app.listen(app.get('port'), function () {
    console.log(`Server listening on port ${app.get('port')}!`);
});
