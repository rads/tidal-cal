var $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    Calendar = require('./calendar'),
    Agenda = require('./agenda');

Backbone.$ = $;

var App = Backbone.View.extend({
  initialize: function() {
    var now = new Date();

    this._calendar = new Calendar({
      el: this.$('.calendar'),
      date: now
    });

    this._agenda = new Agenda({
      el: this.$('.agenda'),
      date: now
    });
  }
});

new App({el: $('#main-container')});
