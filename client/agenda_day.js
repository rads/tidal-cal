var Backbone = require('backbone'),
    _ = require('underscore'),
    uuid = require('node-uuid'),
    $ = require('jquery');

function AgendaDay(options) {
  _.extend(this, Backbone.Events);

  this._date = options.date;
  this._items = options.items;
}

_.extend(AgendaDay.prototype, {
  url: function() {
    var parts = [
      this.getFullYear(),
      (this.getMonth() + 1),
      this.getDayOfMonth()
    ];

    return 'agenda/' + parts.join('-');
  },

  getFullYear: function() {
    return this._date.getFullYear();
  },

  getMonth: function() {
    return this._date.getMonth();
  },

  getDayOfWeek: function() {
    return this._date.getDay();
  },

  getDayOfMonth: function() {
    return this._date.getDate();
  },

  getItems: function() {
    return this._items;
  },

  addItem: function(attrs) {
    var item = {id: uuid.v1(), body: attrs.body};
    this._items.push(item)
    this.trigger('add', item);
    $.ajax(this.url() + '/items', {type: 'POST', data: item});
  },

  removeItem: function(id) {
    var item = _.findWhere(this._items, {id: id});
    this._items = _.without(this._items, item);
    this.trigger('remove', item);
    $.ajax(this.url() + '/items/' + id, {type: 'DELETE'});
  }
});

module.exports = AgendaDay;
