var express = require('express');
var app = express();
app.use(express.static(__dirname + '/../public'));

var STUB_ITEMS = {'2014-2': {'21': {items: ['one', 'two', 'three']}}};

app.get('/agenda/:year-:month-:day', function(req, res) {
  res.json(STUB_ITEMS[req.params.year + '-' + req.params.month][req.params.day]);
});

app.get('/agenda/:year-:month', function(req, res) {
  res.json(STUB_ITEMS[req.params.year + '-' + req.params.month]);
});

app.listen(process.env.PORT || 3000);
