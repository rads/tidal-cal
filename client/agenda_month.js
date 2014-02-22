var _ = require('underscore'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    AgendaDay = require('./agenda_day');

function AgendaMonth(options) {
  _.extend(this, Backbone.Events);

  this._date = options.date;
  this._data = null;
  this._days = {};
}

_.extend(AgendaMonth.prototype, {
  url: function() {
    return '/agenda/' + this._date.getFullYear() + '-' +
      (this._date.getMonth() + 1);
  },

  fetch: function() {
    var self = this;

    $.get(this.url(), function(resp) {
      self._data = resp;
      self.trigger('sync');
    });
  },

  getDay: function(dayOfMonth) {
    if (this._days[dayOfMonth]) return this._days[dayOfMonth];

    var newDate = new Date(this._date.getFullYear(),
      this._date.getMonth(), dayOfMonth);
    var dayData = this._data[dayOfMonth];

    var newDay = new AgendaDay({
      date: newDate,
      items: (dayData && dayData.items) || []
    });

    this._days[dayOfMonth] = newDay;

    return newDay;
  },

  nextMonth: function() {
    var year, month;

    if (this._date.getMonth() === 11) {
      year = this._date.getFullYear() + 1;
      month = 0;
    } else {
      year = this._date.getFullYear();
      month = this._date.getMonth() + 1;
    }

    return new AgendaMonth({date: new Date(year, month, 1)});
  },

  prevMonth: function() {
    var year, month;

    if (this._date.getMonth() === 0) {
      year = this._date.getFullYear() - 1;
      month = 11;
    } else {
      year = this._date.getFullYear();
      month = this._date.getMonth() - 1;
    }

    return new AgendaMonth({date: new Date(year, month, 1)});
  },

  isCurrentMonth: function() {
    return (this._date.getMonth() === new Date().getMonth());
  },

  getDayCount: function() {
    return new Date(this._date.getFullYear(), (this._date.getMonth() + 1), 0).getDate();
  }
});

module.exports = AgendaMonth;
