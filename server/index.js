var express = require('express'),
    _ = require('underscore');

var app = express();

app.use(express.static(__dirname + '/../public'));
app.use(express.json());
app.use(express.urlencoded());

var STUB_ITEMS = {
  '2014-2': {
    '21': {
      items: [
        {id: '1', body: 'one'},
        {id: '2', body: 'two'},
        {id: '3', body: 'three'}
      ]
    }
  }
};

function getMonth(year, month) {
  var key = (year + '-' + month);
  var entry;

  if (STUB_ITEMS[key]) {
    entry = STUB_ITEMS[key];
  } else {
    entry = STUB_ITEMS[key] = {};
  }

  return entry;
}

function getDay(year, month, day) {
  var month = getMonth(year, month);
  var entry;

  if (month[day]) {
    entry = month[day];
  } else {
    entry = month[day] = {items: []};
  }

  return entry;
}

app.get('/agenda/:year-:month-:day', function(req, res) {
  res.json(getDay(req.params.year, req.params.month, req.params.day));
});

app.get('/agenda/:year-:month', function(req, res) {
  res.json(getMonth(req.params.year, req.params.month));
});

app.delete('/agenda/:year-:month-:day/items/:itemId', function(req, res) {
  var day = getDay(req.params.year, req.params.month, req.params.day);
  day.items = _.without(day.items, _.findWhere(day.items, {id: req.params.itemId}));
  res.send(200);
});

app.post('/agenda/:year-:month-:day/items', function(req, res) {
  var day = getDay(req.params.year, req.params.month, req.params.day);
  day.items.push({id: req.body.id, body: req.body.body});
});

app.listen(process.env.PORT || 3000);
