var $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    CalendarView = require('./calendar_view'),
    AgendaView = require('./agenda_view'),
    AgendaMonth = require('./agenda_month');

Backbone.$ = $;

var App = Backbone.View.extend({
  initialize: function() {
    this._setMonth(new AgendaMonth({date: new Date()}))
  },

  _setMonth: function(month) {
    var self = this;

    this.listenTo(month, 'sync', function() {
      if (self._calendar) {
        self.stopListening(self._calendar);
        self._calendar.undelegateEvents();
      }

      if (self._agenda) {
        self.stopListening(self._agenda);
        self._agenda.undelegateEvents();
      }

      var day;

      if (month.isCurrentMonth()) {
        day = month.getDay(new Date().getDate());
      } else {
        day = month.getDay(1);
      }

      self._calendar = new CalendarView({
        el: self.$('.calendar'),
        month: month,
        day: day
      });

      self.listenTo(self._calendar, 'selectDay', function(day) {
        self._agenda.setDay(day);
      });

      self._agenda = new AgendaView({
        el: self.$('.agenda'),
        day: day
      });

      self.listenTo(self._agenda, 'nextMonth', function() {
        self._setMonth(month.nextMonth());
      });

      self.listenTo(self._agenda, 'prevMonth', function() {
        self._setMonth(month.prevMonth());
      });
    });

    month.fetch();
  }
});

new App({el: $('#main-container')});
