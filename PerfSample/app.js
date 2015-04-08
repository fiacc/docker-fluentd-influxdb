var express = require('express');
var path = require('path');

var bodyParser = require('body-parser');

var routes = require('./routes/index');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);


app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});

app.set('port', 3000);

var server = app.listen(app.get('port'), function() {
    console.log('Perf Test server listening on port ' + server.address().port);
    console.log('Go to http://localhost:' + server.address().port);
});

