# observe-function

Observe when a function is called and assign callbacks before and after the function is called.

## Install
```sh
$ npm install --save observe-function
```

## Usage
```js
var observe = require('observe-function');

var observedFunction = function (arg1, arg2){
  console.log('I am observed');
  return arg1 + arg2;
};

//Simply wrap the function you want to observe
var observer = observe(observedFunction);

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
