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
  var afterFunction = chai.spy();
  observedFunction.before(beforeFunction);
  observedFunction.after(afterFunction);
  observedFunction('d','e');
  observedSpy.should.have.been.called.with('d', 'e');
  beforeFunction.should.have.been.called.with('d', 'e');
  afterFunction.should.have.been.called.with('d', 'e');
});

it('should remove before listener register', function(){
  var beforeFunction = chai.spy();
  var afterFunction = chai.spy();
  observedFunction.before(beforeFunction);
  observedFunction.after(afterFunction);
  observedFunction.remove.before(beforeFunction);
  observedFunction('d','e');
  observedSpy.should.have.been.called.with('d', 'e');
  beforeFunction.should.not.have.been.called();
  afterFunction.should.have.been.called.with('d', 'e');
});

it('should remove after listener register', function(){
  var beforeFunction = chai.spy();
  var afterFunction = chai.spy();
  observedFunction.before(beforeFunction);
  observedFunction.after(afterFunction);
  observedFunction.remove.after(afterFunction);
  observedFunction('d','e');
  observedSpy.should.have.been.called.with('d', 'e');
  afterFunction.should.not.have.been.called();
  beforeFunction.should.have.been.called.with('d', 'e');
});

it('should reset after listener register', function(){
  var beforeFunction = chai.spy();
  var afterFunction = chai.spy();
  observedFunction.before(beforeFunction);
  observedFunction.after(afterFunction);
  observedFunction.reset.after();
  observedFunction('d','e');
  observedSpy.should.have.been.called.with('d', 'e');
  afterFunction.should.not.have.been.called();
  beforeFunction.should.have.been.called.with('d', 'e');
});

it('should reset before listener register', function(){
  var beforeFunction = chai.spy();
  var afterFunction = chai.spy();
  observedFunction.before(beforeFunction);
  observedFunction.after(afterFunction);
  observedFunction.reset.before();
  observedFunction('d','e');
  observedSpy.should.have.been.called.with('d', 'e');
  beforeFunction.should.not.have.been.called();
  afterFunction.should.have.been.called.with('d', 'e');
});

it('should reset all listeners', function(){
  var beforeFunction = chai.spy();
  var afterFunction = chai.spy();
  observedFunction.before(beforeFunction);
  observedFunction.after(afterFunction);
  observedFunction.reset.all();
  observedFunction('d','e');
  observedSpy.should.have.been.called.with('d', 'e');
  beforeFunction.should.not.have.been.called();
  afterFunction.should.not.have.been.called();
});

it('should return the correct value', function(){
  var result = observedFunction('d','e');
  assert.equal(result, 'ok');
});
