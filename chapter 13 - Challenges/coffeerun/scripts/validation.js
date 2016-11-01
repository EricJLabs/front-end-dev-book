(function (window) {
  'use strict';
  var App = window.App || {};

  var Validation = {
    isCompanyEmail: function (email) {
      if (/.+@thecoop\.com$/.test(email) === false)
        return false;

      var emailControl = $('input[name=emailAddress]');
      window.remoteDS.get(email, function (serverResponse) {
        console.log(serverResponse);
        if (serverResponse === null)
          emailControl.get(0).setCustomValidity('');
        else
          emailControl.get(0).setCustomValidity('order already in progress.');
      });

      emailControl.get(0).setCustomValidity('validating with server');
      return false;

    }
  }

  App.Validation = Validation;
  window.App = App;
})(window);
