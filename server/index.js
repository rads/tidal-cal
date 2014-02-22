var express = require('express'),
    _ = require('underscore'),
    addPages = require('./pages');

var app = express();

app.use(express.static(__dirname + '/../public'));
app.use(express.json());
app.use(express.urlencoded());

addPages(app);

app.listen(process.env.PORT || 3000);
