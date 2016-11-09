(function (window) {
  'use strict';
  var App = window.App || {};
  var Promise = window.Promise;

  function DataStore() {
    this.data = {};
  }

  function promiseResolvedWIth(value) {
    var promise = new Promise(function (resolve, reject) {
      resolve(value);
    });
    return promise;
  }

  DataStore.prototype.add = function (key, val) {
    this.data[key] = val;
    return promiseResolvedWIth(null);
  }

  DataStore.prototype.get = function (key) {
    return promiseResolvedWIth(this.data[key]);
  }

  DataStore.prototype.getAll = function () {
    return promiseResolvedWIth(this.data);
  }

  DataStore.prototype.remove = function (key) {
    delete this.data[key];
    return promiseResolvedWIth(null);
  }

  App.DataStore = DataStore;
  window.App = App;
})(window);