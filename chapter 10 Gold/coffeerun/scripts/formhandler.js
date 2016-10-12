(function (window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  var unlocked = false;

  function FormHandler(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }

    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  $("#unlock-button").click( function()
  {
    var email = $('input[name=emailAddress]').val();
    if (unlocked === false && email != '')
      $('#powerUpGroup').toggle();
    unlocked = true;
  });

  function ShowAchievement() {
    if (unlocked === true)
      return;

    var currentStrength = $('input[name=strength]').val();
    var flavorShotValue =  $( "#flavorShot option:selected" ).text();
    var size = $('input[name=size]:checked').val();

    if (currentStrength === '100' && flavorShotValue != 'None' &&  size === 'coffee-zilla') {
      $('#myModal').modal('show')
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

    $('input[name=emailAddress]').on('input', function (e) {
      var email = $('input[name=emailAddress]').val();
      if (unlocked === true && email != '' && $('#powerUpGroup').is(':visible') === false)
        $('#powerUpGroup').toggle();
    }).bind(this);

    $('select[name=flavor]').on('change', function (e) {
      ShowAchievement();
    }).bind(this);

    $('input[name=size]').change(function (e) {
      ShowAchievement();
    }).bind(this);

    $('#powerUpGroup').toggle();

    $('#strengthLabelId').text($('input[name=strength]').val());
    this.$formElement.on('input', '#strengthLevel', function() {
      var newStrength = $('input[name=strength]').val();
      console.log('sliderchanged to ' +  newStrength);
      $('#strengthLabelId').text(newStrength);
      if (newStrength < 33){
        $('#strengthLabelId').css("color", "green");
      }
      else if (newStrength < 66) {
        $('#strengthLabelId').css("color", "yellow");
      }
      else {
        $('#strengthLabelId').css("color", "red");
      }
      ShowAchievement();
    }).bind(this);
  };

  App.FormHandler = FormHandler;
  window.App = App;

})(window);
