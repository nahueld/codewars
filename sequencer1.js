function generator(sequencer) {
  var args = [];
  //this is the generator function
  var gen = arguments[0];
  if(arguments.length > 1) {
    for(var i = 1; i < arguments.length; i++) {
      //these are the subsequent arguments
      args.push(arguments[i]);
    }
  }
  return {
    args : args,
    stepIndex : 0,
    step : args[0] || 0,
    res : 0,
    next : true,
    next : function() {
      if(!this.next) throw 'error';
      this.res = gen()(this.step,this.res);
      this.stepIndex++;
      if(this.args.length > 2) {
        this.step = this.args[(this.stepIndex)];
        if(!this.step) this.next = false;
      }else{
        this.step = this.step + (this.args[1] || 1);
      }
      return this.res;
    }
  }
}

function dummySeq() {
  return function() {
    return 'dummy';
  };
}

function factorialSeq() {
  return function(step) {
    var res = 1;
    for(var i = step; i > 0; i--) {
      res *= i;
    }
    return res;
  }
}

function fibonacciSeq() {
  return function(step) {
    var a = 0, b = 1, sum = 1;
    for(var i = 2; i <= step; i++) {
      sum = a + b;
      a = b;
      b = sum;
    }
   return a+b;
  }
}

function rangeSeq(start, step) {
  return function(step) {
    return step;
  }
}

function primeSeq() {
  return function(step) {
    var prime = 2;
    c = 0;
    for(var i = 2; c <= step; i++) {
      if(calcIfNumberPrime(i)) {
        prime = i;
        c++;
      }
    }
    return prime;
  }
}

function calcIfNumberPrime(n) {
  if(n <= 1) return false;
  for(var i = 2; i <= n; i++) {
    var res = n%i;
    if(res == 0 && i != 1 && n != i) return false;
  }
  return true;
}

function partialSumSeq() {
  return function(prev,next) {
    var res = prev + next;
    return res;
  }
}

var seq = generator(partialSumSeq,-1, 4, 2, 5);
console.log(seq.next());
console.log(seq.next());
console.log(seq.next());
console.log(seq.next());
console.log(seq.next());
console.log(seq.next());

// console.log(seq.next());
