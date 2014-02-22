var $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore');

var DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
    'Friday', 'Saturday'];

var Calendar = Backbone.View.extend({
  template: _.template($('#calendar-day-template').html()),

  events: {
    'click .calendar-day': '_clickDay'
  },

  initialize: function(options) {
    this._month = options.month;
    this._day = options.day;

    this._addAllDays();

    var dayEl = this.$('[data-day-of-month=' + this._day.getDayOfMonth() + ']');
    this._setSelectedDay(dayEl);
  },

  _addAllDays: function() {
    var self = this;
    var days = this._month.getDayCount();

    var startSpacers = this._month.getDay(0).getDayOfWeek() + 1;
    _.times(startSpacers, function(i) {
      self._addDay(i);
    });

    _.times(days, function(i) {
      self._addDay((startSpacers + i), self._month.getDay(i + 1));
    });

    var endSpacers = (7 - ((startSpacers + days) % 7));
    _.times(endSpacers, function(i) {
      self._addDay(startSpacers + days + i);
    });
  },

  _addDay: function(gridNumber, day) {
    var data = {gridNumber: gridNumber};

    if (day) {
      _.extend(data, {
        dayOfMonth: day.getDayOfMonth(),
        dayOfWeek: DAY_NAMES[day.getDayOfWeek()],
        itemCount: day.get('items').length
      });
    }

    this.$el.append(this.template(data));
  },

  _setSelectedDay: function(dayEl) {
    this.$('.selected').removeClass('selected');
    dayEl.addClass('selected');
  },

  _clickDay: function(event) {
    event.preventDefault();

    var $target = $(event.currentTarget);
    this._setSelectedDay($target);

    var day = this._month.getDay($target.data('day-of-month'));
    this.trigger('selectDay', day);
  }
});

module.exports = Calendar;
