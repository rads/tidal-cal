var $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    AgendaDay = require('./agenda_day');

var Agenda = Backbone.View.extend({
  template: _.template($('#agenda-item-template').html()),

  initialize: function(options) {
    var day = options.day;
    this.$items = this.$('.agenda-items');
    this.setDay(day);
  },

  setDay: function(day) {
    var self = this;
    var items = day.get('items');
    debugger;

    this.$items.empty();

    _.each(items, function(body) {
      var item = self.template({body: body});
      self.$items.append(item);
    });
  },
});

module.exports = Agenda;
