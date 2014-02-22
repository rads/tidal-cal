var _ = require('underscore'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    AgendaDay = require('./agenda_day');

function AgendaMonth(options) {
  _.extend(this, Backbone.Events);

  this.date = options.date;
}

_.extend(AgendaMonth.prototype, {
  url: function() {
    return '/agenda/' + this.date.getFullYear() + '-' +
      (this.date.getMonth() + 1);
  },

  fetch: function() {
    var self = this;

    $.get(this.url(), function(resp) {
      self.data = resp;
      self.trigger('sync');
    });
  },

  getDay: function(dayOfMonth) {
    var newDate = new Date(this.date.getFullYear(),
      this.date.getMonth(), dayOfMonth);
    var dayData = this.data[dayOfMonth];

    return new AgendaDay({
      date: newDate,
      items: (dayData && dayData.items) || []
    });
  },

  getDayCount: function() {
    return new Date(this.date.getFullYear(), (this.date.getMonth() + 1), 0).getDate();
  }
});

module.exports = AgendaMonth;
