var $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    AgendaDay = require('./agenda_day');

var AgendaView = Backbone.View.extend({
  template: _.template($('#agenda-item-template').html()),

  events: {
    'submit .agenda-form': '_addItemFromForm',
    'click .agenda-item-remove': '_removeItemFromButton'
  },

  initialize: function(options) {
    this._day = options.day;
    this.$items = this.$('.agenda-items');
    this.$form = this.$('.agenda-form');
    this.$input = this.$('.agenda-form-input');
    this.setDay(this._day);
  },

  setDay: function(day) {
    var self = this;

    if (this._onAdd || this._onRemove) {
      this._day.off('add', this._onAdd);
      this._day.off('remove', this._onRemove);
    }

    this._day = day;

    this._onAdd = function(item) {
      self._addItem(item);
    };

    this._onRemove = function(item) {
      self._removeItem(item);
    };

    day.on('add', this._onAdd);
    day.on('remove', this._onRemove);

    this.$items.empty();

    _.each(day.getItems(), function(item) {
      self._addItem(item);
    });
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
  }
});

module.exports = AgendaView;
