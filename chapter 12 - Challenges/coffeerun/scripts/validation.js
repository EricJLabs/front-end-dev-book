(function (window) {
  'use strict';
  var App = window.App || {};

  var Validation = {
    isCompanyEmail: function (email) {
      return /.+@thecoop\.com$/.test(email);
    },

    isValidStrength: function (order, strength) {
      if (order.includes('decaf') === true &&
          Number(strength) <= 20) {
        return false;
      }

      return true;
    }
  };

  App.Validation = Validation;
  window.App = App;
})(window);
