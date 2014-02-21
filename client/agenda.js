var $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    AgendaDay = require('./agenda_day');

var Agenda = Backbone.View.extend({
  template: _.template($('#agenda-item-template').html()),

  initialize: function(options) {
    this._setDay(options.date);
  },

  _setDay: function(date) {
    var self = this;
    var agendaDay = new AgendaDay({date: date});

    agendaDay.once('sync', function() {
      _.each(agendaDay.get('items'), function(body) {
        var item = self.template({body: body});
        self.$el.append(item);
      });
    });

    agendaDay.fetch();
  }
});

module.exports = Agenda;
