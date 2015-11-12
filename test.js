var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);
chai.should();
var assert = chai.assert;
var observe = require('./');
var noop = function(){};
var observedSpy = chai.spy();
var observedFunction = observe(function(a, b){
  observedSpy(a, b);
  return 'ok';
});

it('should return a wrapped function', function(){
  assert.equal(typeof observe(noop), 'function');
});

it('should have a before and after register function', function(){
  var observer = observe(noop);
  assert.equal(typeof observer.before, 'function');
  assert.equal(typeof observer.after, 'function');
});

it('should register', function(){
  var beforeFunction = chai.spy();
  var afterFunction = chai.spy();  observedFunction.before(beforeFunction);
  observedFunction.after(afterFunction);
  observedFunction('d','e');
  observedSpy.should.have.been.called.with('d', 'e');
  beforeFunction.should.have.been.called.with('d', 'e');
  afterFunction.should.have.been.called.with('d', 'e');
});

it('should return the correct value', function(){
  var result = observedFunction('d','e');
  assert.equal(result, 'ok');
});
