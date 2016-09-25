(function (window, truckId) {
  'use strict';
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;

  var myTruck = new Truck(truckId, new DataStore());
  window.myTruck = myTruck;
})(window, 'Java Express by HAL Inc.');
