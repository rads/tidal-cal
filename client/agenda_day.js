var Backbone = require('backbone');

var AgendaDay = Backbone.Model.extend({
  initialize: function(options) {
    this.date = options.date;
  },

  url: function() {
    var parts = [
      this.date.getFullYear(),
      (this.date.getMonth() + 1),
      this.date.getDate()
    ];

    return 'agenda-day/' + parts.join('-');
  },

  getFullYear: function() {
    return this.date.getFullYear();
  },

  getMonth: function() {
    return this.date.getMonth();
  },

  getDayOfWeek: function() {
    return this.date.getDay();
  },

  getDayOfMonth: function() {
    return this.date.getDate();
  }
});

module.exports = AgendaDay;
