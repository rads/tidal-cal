var express = require('express');
var app = express();
app.use(express.static(__dirname + '/../public'));

var STUB_ITEMS = {'2014-2-21': {items: ['one', 'two', 'three']}};

app.get('/agenda-day/:date', function(req, res) {
  res.json(STUB_ITEMS[req.params.date]);
});

app.listen(process.env.PORT || 3000);
