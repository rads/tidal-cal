var $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    Calendar = require('./calendar'),
    AgendaView = require('./agenda_view'),
    AgendaMonth = require('./agenda_month');

Backbone.$ = $;

var App = Backbone.View.extend({
  initialize: function() {
    var self = this;
    var now = new Date();
    var month = new AgendaMonth({date: now});

    month.on('sync', function() {
      var day = month.getDay(now.getDate());

      self._calendar = new Calendar({
        el: self.$('.calendar'),
        month: month,
        day: day
      });

      self._calendar.on('selectDay', function(day) {
        self._agenda.setDay(day);
      });

      self._agenda = new AgendaView({
        el: self.$('.agenda'),
        day: day
      });
    });

    month.fetch();
  }
});

new App({el: $('#main-container')});
