var $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    CalendarView = require('./calendar_view'),
    AgendaView = require('./agenda_view'),
    AgendaMonth = require('./agenda_month');

Backbone.$ = $;

var App = Backbone.View.extend({
  initialize: function() {
    this._setMonth(new AgendaMonth({date: new Date()}));
  },

  _setMonth: function(month) {
    var self = this;

    this.listenTo(month, 'sync', function() {
      var selectedDay;

      if (month.isCurrentMonth()) {
        selectedDay = month.getDay(new Date().getDate());
      } else {
        selectedDay = month.getDay(1);
      }

      self._setAgenda(month, selectedDay);
      self._setCalendar(month, selectedDay);
    });

    month.fetch();
  },

  _setAgenda: function(month, day) {
    var self = this;

    if (this._agenda) {
      this.stopListening(this._agenda);
      this._agenda.undelegateEvents();
    }

    this._agenda = new AgendaView({
      el: this.$('.agenda'),
      day: day
    });

    this.listenTo(this._agenda, 'nextMonth', function() {
      self._setMonth(month.nextMonth());
    });

    this.listenTo(this._agenda, 'prevMonth', function() {
      self._setMonth(month.prevMonth());
    });
  },

  _setCalendar: function(month, day) {
    var self = this;

    if (this._calendar) {
      this.stopListening(this._calendar);
      this._calendar.undelegateEvents();
    }

    this._calendar = new CalendarView({
      el: this.$('.calendar'),
      month: month,
      day: day
    });

    this.listenTo(this._calendar, 'selectDay', function(day) {
      self._agenda.setDay(day);
    });
  }
});

new App({el: $('#main-container')});
