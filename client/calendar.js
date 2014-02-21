var $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore');

function daysInMonth(month, year) {
  return new Date(year, (month + 1), 0).getDate();
}

var DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
    'Friday', 'Saturday'];

var Calendar = Backbone.View.extend({
  template: _.template($('#calendar-day-template').html()),

  initialize: function(options) {
    this._addAllDays(options.date);
    this._selectDay(options.date);
  },

  _addAllDays: function(date) {
    var self = this;
    var days = daysInMonth(date.getMonth(), date.getFullYear());

    var startSpacers = date.getDay();
    _.times(startSpacers, function(i) {
      self._addDay(i);
    });

    _.times(days, function(i) {
      var day = new Date(date.getFullYear(), date.getMonth(), i);
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
  },

  _selectDay: function(date) {
    this.$('.calendar-day-' + date.getDate()).addClass('selected');
  }
});

module.exports = Calendar;
