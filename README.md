# observe-function

Observe when a function is called and assign callbacks before and after the function is called.

## Install
```sh
$ npm install --save observe-function
```

## Usage
```js
var observeFunction = require('observe-function');

var observedFunction = function (arg1, arg2){
  console.log('I am observed');
  return arg1 + arg2;
};

//Simply wrap the function you want to observe
var observer = observeFunction(observedFunction);

//assign callback to be called before function executes
observer.before(function(){
  console.log('I am called before');
});

//... and after it executes
observer.after(function(){
  console.log('I am called after');
});

//call the observer just as you would the regular function
var three = observer(1, 2);
//=>I am called before
//=>I am observed
//=>I am called after

console.log(three);
//=> 3
```

## API

### observeFunction(anyFunction)
Assigns the function to be observed. Returns a function that can be called just like the provided function.

### observer.before(callback)
Assigns a callback to be called before the function is called. An observer can be assigned multiple "before" callbacks.

### observer.after(callback)
Assigns a callback to be called after the function is called. An observer can be assigned multiple "after" callbacks.

### observer.remove.before(callback)
Removes the specified callback from the list of "before" callbacks

### observer.remove.after(callback)
Removes the specified callback from the list of "after" callbacks

### observer.reset.before()
Removes all callbacks from the list of "before" callbacks

### observer.reset.after()
Removes all callbacks from the list of "after" callbacks

### observer.reset.all()
Removes all "before" and "after" callbacks
