var $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore');

var DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
    'Friday', 'Saturday'];

var CalendarView = Backbone.View.extend({
  template: _.template($('#calendar-day-template').html()),

  events: {
    'click .calendar-day': '_clickDay'
  },

  initialize: function(options) {
    this._month = options.month;

    this.$el.empty();
    this._addAllDays();

    var startDay = options.day.getDayOfMonth();
    var dayEl = this.$('[data-day-of-month=' + startDay + ']');
    this._setSelectedDay(dayEl);
  },

  _addAllDays: function() {
    var self = this;
    var days = this._month.getDayCount();

    var startSpacers = this._month.getDay(1).getDayOfWeek();
    _.times(startSpacers, function(i) {
      self._addSpacer(i);
    });

    _.times(days, function(i) {
      self._addDay((startSpacers + i), self._month.getDay(i + 1));
    });

    var endSpacers = (7 - ((startSpacers + days) % 7));
    _.times(endSpacers, function(i) {
      self._addSpacer(startSpacers + days + i);
    });
  },

  _addSpacer: function(gridNumber) {
    this.$el.append(this.template({gridNumber: gridNumber}));
  },

  _addDay: function(gridNumber, day) {
    var self = this;

    function dayTpl() {
      return $(self.template({
        gridNumber: gridNumber,
        dayOfMonth: day.getDayOfMonth(),
        dayOfWeek: DAY_NAMES[day.getDayOfWeek()],
        itemCount: day.getItems().length
      }));
    }

    var $el = dayTpl();

    this.listenTo(day, 'add remove', function() {
      var wasSelected = $el.hasClass('selected');

      var newEl = dayTpl();
      $el.replaceWith(newEl);
      $el = newEl;

      if (wasSelected) newEl.addClass('selected');
    });

    this.$el.append($el);
  },

  _setSelectedDay: function(dayEl) {
    this.$('.selected').removeClass('selected');
    dayEl.addClass('selected');
  },

  _clickDay: function(event) {
    event.preventDefault();

    var $target = $(event.currentTarget);
    if ($target.hasClass('calendar-spacer')) return;

    this._setSelectedDay($target);

    var day = this._month.getDay($target.data('day-of-month'));
    this.trigger('selectDay', day);
  }
});

module.exports = CalendarView;
