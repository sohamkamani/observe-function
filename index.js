module.exports = function(trackedFunction) {
  'use strict';
  var _beforeCallbacks = [];
  var _afterCallbacks = [];
  var removeCallback = function(callbackArray) {
    return function(callback) {
      var functionIndex = callbackArray.indexOf(callback);
      callbackArray.splice(functionIndex, 1);
    };
  };
  var resetCallbacks = function(callbackArray) {
    return function() {
      callbackArray.splice(0, callbackArray.length);
    };
  };

  var wrappedFunction = function() {
    var functionArguments = arguments;
    var executeCallback = function(callback) {
      callback.apply(this, functionArguments);
    };
    _beforeCallbacks.forEach(executeCallback);
    var returnValue = trackedFunction.apply(this, functionArguments);
    _afterCallbacks.forEach(executeCallback);
    return returnValue;
  };

  wrappedFunction.before = function(callback) {
    _beforeCallbacks.push(callback);
  };

  wrappedFunction.after = function(callback) {
    _afterCallbacks.push(callback);
  };

  wrappedFunction.remove = {
    before: removeCallback(_beforeCallbacks),
    after: removeCallback(_afterCallbacks)
  };

  wrappedFunction.reset = {
    before: resetCallbacks(_beforeCallbacks),
    after: resetCallbacks(_afterCallbacks),
    all : function(){
      wrappedFunction.reset.before();
      wrappedFunction.reset.after();
    }
  };

  return wrappedFunction;
};
