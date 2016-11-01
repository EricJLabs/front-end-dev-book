(function (window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function FormHandler(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }

    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  FormHandler.prototype.addSubmitHandler = function (fn) {
    console.log('Setting submit hander for form');
    this.$formElement.on('submit', function (event) {
      event.preventDefault();

      var data = {};
      $(this).serializeArray().forEach(function (item) {
        data[item.name] = item.value;
        console.log(item.name + ' is ' + item.value);
      });
      console.log(data);
      fn(data);
      this.reset();
      this.elements[0].focus();
    });
  };

  FormHandler.prototype.addInputHandlers = function (emailValidation, strengthValidation) {
    console.log('Setting input handler for form');
    this.$formElement.on('input', '[name="emailAddress"]', function (event) {
      var emailAddress = event.target.value;
      var  message = '';
      if (emailValidation(emailAddress)) {
        event.target.setCustomValidity('');
      } else {
        message = emailAddress + ' is not an authorized email address!';
        event.target.setCustomValidity(message);
      }
    });

    this.$formElement.on('input', '[name="coffee"]', function (event) {
      var order = event.target.value;
      var strengthControl = $('input[name=strength]');
      var strength = strengthControl.val();
      var  message = '';
      if (strengthValidation(order, strength)) {
        event.target.setCustomValidity('');
        strengthControl.get(0).setCustomValidity('');
      } else {
        message = 'invalid coffee strength!';
        event.target.setCustomValidity(message);
      }
    });


        this.$formElement.on('input', '[name="strength"]', function (event) {
          var strength = event.target.value;
          var orderControl = $('input[name=coffee]');
          var order = orderControl.val();
          var  message = '';
          if (strengthValidation(order, strength)) {
            event.target.setCustomValidity('');
            orderControl.get(0).setCustomValidity('');
          } else {
            message = 'invalid coffee strength!';
            event.target.setCustomValidity(message);
          }
        });
  };

  App.FormHandler = FormHandler;
  window.App = App;

})(window);
