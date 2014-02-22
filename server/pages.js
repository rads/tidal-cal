var Agenda = require('./agenda'),
    _ = require('underscore');

function addPages(app) {
  var agenda = new Agenda();

  app.get('/agenda/:year-:month-:day', function(req, res) {
    agenda.getDay(req.params, function(err, day) {
      if (err) throw err;
      res.json(day);
    });
  });

  app.get('/agenda/:year-:month', function(req, res) {
    agenda.getMonth(req.params, function(err, month) {
      if (err) throw err;
      res.json(month);
    });
  });

  app.delete('/agenda/:year-:month-:day/items/:itemId', function(req, res) {
    agenda.removeItem(req.params, function(err) {
      if (err) throw err;
      res.send(200);
    });
  });

  app.post('/agenda/:year-:month-:day/items', function(req, res) {
    var allParams = _.extend({}, req.params, req.body);
    agenda.addItem(allParams, function(err) {
      if (err) throw err;
      res.send(200);
    });
  });
}

module.exports = addPages;
