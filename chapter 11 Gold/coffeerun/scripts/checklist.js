(function (window) {
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;

  function CheckList(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }

    this.$element = $(selector);
    if (this.$element.lenght == 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

 var itemClick = {};
  CheckList.prototype.addClickHandler = function (fn) {
    this.$element.on('click', 'input', function (event) {
    if (itemClick[this.$element] == null) {
      itemClick[this.$element] = 1;
      this.$element.class = 'gray-text';
      setTimeout(function () {
        var email = event.target.value;
        this.removeRow(email);
        itemClick[this.$element] = null;
        fn(email);
      }.bind(this), 2000);
    }
    else
    {
      itemClick[this.$element] = itemClick[this.$element] + 1;

      var items = event.target.labels[0].innerText.split(', ');
      var strength = items[0].replace('[', '').replace(']', '').replace('x', '');
      $('input[name=strength]').val(strength);

      var size = items[1];
      SelectRadioButton('size', size);

      var flavor = items[2];
      if (flavor == 'none')
        flavor = '';
      $("#flavorShot").val(flavor);

      var coffee = items[3];
      var email = event.target.value;
      if (coffee != email)// description is optional
      {
        $('input[name=coffee]').val(coffee);
      }
      $('input[name=emailAddress]').val(email);

    }

    }.bind(this));
  }

  function SelectRadioButton(name, value) {
    $('input:radio[name="' + name + '"][value="' + value +'"]').prop('checked', true);
  }

  CheckList.prototype.addRow = function (coffeeOrder) {
    // Remove any existing rows that match the email address
    this.removeRow(coffeeOrder.emailAddress);

    // create a new instance of a row, using the coffee order info
    var rowElement = new Row(coffeeOrder);

    // Add the new row instance's $element property to the Checklist
    this.$element.append(rowElement.$element);
  };

  CheckList.prototype.removeRow = function (email) {
    this.$element
      .find('[value="' + email + '"]')
      .closest('[data-coffee-order="checkbox"]')
      .remove();
  };

  function Row(coffeeOrder) {

    var $div = $('<div></div>', {
      'data-coffee-order': 'checkbox',
      'class': 'checkbox'
    });

    var $colorDiv = $('<div></div>', {
      'class': coffeeOrder.flavor + '-text'
    });


    var $label = $('<label></label>');

    var $checkbox = $('<input></input>', {
      type: 'checkbox',
      value: coffeeOrder.emailAddress,
    });

    var description = ' [' + coffeeOrder.strength + 'x]';
    description += ', ' + coffeeOrder.size + ', '
    if (coffeeOrder.flavor != '') {
      description += coffeeOrder.flavor + ', ';
    }
    else {
      description += 'none, ';
    }

    description += coffeeOrder.coffee + ', ';
    description += ' (' + coffeeOrder.emailAddress + ')';

    $label.append($checkbox);
    $label.append(description);
    $colorDiv.append($label);
    $div.append($colorDiv)

    this.$element = $div;
  }

  App.CheckList = CheckList;
  window.App = App;
})(window);
