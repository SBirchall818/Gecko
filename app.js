var express = require('express');

var app = express();

var port = 3010;

// app.use(express.static('public'));

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/src/views'));

app.listen(port, function(err) {
    console.log('listening on port ' + port);
});