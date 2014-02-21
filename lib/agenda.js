var $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore');

var STUB_ITEMS = {'2014-2': ['one', 'two', 'three']};

var Agenda = Backbone.View.extend({
  template: _.template($('#agenda-item-template').html()),

  initialize: function(options) {
    this._addItems(options.date);
  },

  _addItems: function(date) {
    var self = this;

    var items = STUB_ITEMS[date.getFullYear() + '-' + (date.getMonth()+1)];
    _.each(items, function(body) {
      var item = self.template({body: body});
      self.$el.append(item);
    });
  }
});

module.exports = Agenda;
