var levelup = require('level'),
    _ = require('underscore');

var DB_PATH = __dirname + '/../agenda.db';

function Agenda() {
  this._db = levelup(DB_PATH, {valueEncoding: 'json'});
}

_.extend(Agenda.prototype, {
  _key: function(params) {
    return params.year + '-' + params.month;
  },

  getMonth: function(params, onComplete) {
    this._db.get(this._key(params), function(err, value) {
      if (err && !err.notFound) return onComplete(err);
      if (err && err.notFound) value = {};

      onComplete(null, value);
    });
  },

  getDay: function(params, onComplete) {
    this.getMonth(params, function(err, value) {
      if (err) return onComplete(err);

      var day = value[params.day] || {items: []};
      onComplete(null, day);
    });
  },

  removeItem: function(params, onComplete) {
    var self = this;
    var key = this._key(params);

    this._db.get(key, function(err, value) {
      if (err && !err.notFound) return onComplete(err);
      if (err && err.notFound) return onComplete(null);

      var day = value[params.day];
      if (!day) return onComplete(null);

      var removed = _.findWhere(day.items, {id: params.itemId});
      day.items = _.without(day.items, removed);

      self._db.put(key, value, onComplete);
    });
  },

  addItem: function(params, onComplete) {
    var self = this;
    var key = this._key(params);

    this._db.get(key, function(err, value) {
      if (err && !err.notFound) return onComplete(err);
      if (err && err.notFound) value = {};

      var day = value[params.day];
      if (!day) day = value[params.day] = {items: []};

      day.items.push({id: params.id, body: params.body});

      self._db.put(key, value, onComplete);
    });
  }
});

module.exports = Agenda;
