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
  }
});

module.exports = AgendaDay;
