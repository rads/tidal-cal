var $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore');

Backbone.$ = $;

var App = Backbone.View.extend({
  initialize: function() {
    this._calendar = new Calendar({el: this.$('.calendar')});
  }
});

function daysInMonth(month, year) {
  return new Date(year, (month + 1), 0).getDate();
}

var DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
    'Friday', 'Saturday'];

var Calendar = Backbone.View.extend({
  template: _.template($('#calendar-day-template').html()),

  initialize: function() {
    this._addAllDays();
  },

  _addAllDays: function() {
    var self = this;
    var now = new Date();
    var days = daysInMonth(now.getMonth(), now.getFullYear());

    var startSpacers = now.getDay();
    _.times(startSpacers, function(i) {
      self._addDay(i);
    });

    _.times(days, function(i) {
      var day = new Date(now.getFullYear(), now.getMonth(), i);
      self._addDay((startSpacers + i), (i + 1), DAY_NAMES[day.getDay()]);
    });

    var endSpacers = (7 - ((startSpacers + days) % 7));
    _.times(endSpacers, function(i) {
      self._addDay(startSpacers + days + i);
    });
  },

  _addDay: function(gridNumber, dayOfMonth, dayOfWeek) {
    var day = this.template({
      gridNumber: gridNumber,
      dayOfMonth: dayOfMonth,
      dayOfWeek: dayOfWeek
    });

    this.$el.append(day);
  }
});

new App({el: $('#main-container')});
