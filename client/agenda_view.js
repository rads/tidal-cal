var $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    AgendaDay = require('./agenda_day');

var MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

var AgendaView = Backbone.View.extend({
  template: _.template($('#agenda-item-template').html()),

  events: {
    'submit .agenda-form': '_addItemFromForm',
    'click .agenda-item-remove': '_removeItemFromButton',
    'click .agenda-next': '_bubbleNext',
    'click .agenda-prev': '_bubblePrev'
  },

  initialize: function(options) {
    this.$items = this.$('.agenda-items');
    this.$form = this.$('.agenda-form');
    this.$input = this.$('.agenda-form-input');
    this.$header = this.$('.agenda-header');
    this.setDay(options.day);
    this._updateHeader();
  },

  _updateHeader: function() {
    this.$header.text(MONTH_NAMES[this._day.getMonth()] + ' ' + this._day.getFullYear());
  },

  setDay: function(day) {
    if (this._day) this.stopListening(this._day);

    this._day = day;
    this.listenTo(day, 'add', _.bind(this._addItem, this));
    this.listenTo(day, 'remove', _.bind(this._removeItem, this));

    this.$items.empty();
    _.each(day.getItems(), _.bind(this._addItem, this));
  },

  _addItem: function(item) {
    this.$items.append(this.template(item));
  },

  _removeItem: function(item) {
    this.$items.find('[data-item-id=' + item.id + ']').remove();
  },

  _removeItemFromButton: function(event) {
    event.preventDefault();
    var $item = $(event.currentTarget).closest('.agenda-item');
    this._day.removeItem($item.data('item-id') + '');
  },

  _addItemFromForm: function(event) {
    event.preventDefault();
    this._day.addItem({body: this.$input.val()});
    this.$form[0].reset();
  },

  _bubbleNext: function(event) {
    event.preventDefault();
    this.trigger('nextMonth');
  },

  _bubblePrev: function(event) {
    event.preventDefault();
    this.trigger('prevMonth');
  }
});

module.exports = AgendaView;
