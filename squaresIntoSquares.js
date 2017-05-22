/**
My little sister came back home from school with the following task:
given a squared sheet of paper she has to cut it in pieces which,
when assembled, give squares the sides of which form an increasing sequence of numbers.
At the beginning it was lot of fun but little by little we were tired of seeing the pile
of torn paper. So we decided to write a program that could help us and protects trees.

Task

Given a positive integral number n, return a strictly increasing sequence
(list/array/string depending on the language) of numbers, so that the sum of the squares is equal to n².

If there are multiple solutions (and there will be), return the result with the largest possible values:

Examples

decompose(11) must return [1,2,4,10].
Note that there are actually two ways to decompose 11², 11² = 121 = 1 + 4 + 16 + 100 = 1² + 2² + 4² + 10²
but don't return [2,6,9], since 9 is smaller than 10.

For decompose(50) don't return [1, 1, 4, 9, 49] but [1, 3, 5, 8, 49] since [1, 1, 4, 9, 49]
doesn't form a strictly increasing sequence.

Note

Neither [n] nor [1,1,1,…,1] are valid solutions. If no valid solution exists,
return nil, null, Nothing, None (depending on the language) or "" (Java, C#) or {} (C++).

The function "decompose" will take a positive integer n and return the decomposition of N = n² as:

[x1 ... xk]
Hint

Very often xk will be n-1.
**/

function decompose(n) {
  var target = Math.pow(n,2);
  var mustValue = Math.pow(n-1,2);
  var difference = target - mustValue;
  var reducedCombinators = getRemainingCombinators(n,target);
  var getAllSums = getAllPossibleSumsTo(reducedCombinators,difference);
  console.log(getAllSums);

  //return getAllCombinations(reducedCombinators,target);
}

function sortByNumberAsc(itemA,itemB) {
  if(itemA > itemB) return 1;
  if(itemA < itemB) return -1;
}

function getCombinators(n,target) {
  var initialNonPow = (n-1);
  var initialPow = Math.pow(initialNonPow,2);
  var res = [];
  for(var i = 1; i < initialNonPow; i++) {
    var power = Math.pow(i,2);
    if(initialPow + power <= target) res.push(i); else break;
  }
  res.push(initialNonPow);
  return res;
}



function getRemainingCombinators(n,target) {
  var initialNonPow = (n-1);
  var initialPow = Math.pow(initialNonPow,2);
  var res = [];
  for(var i = 1; i < initialNonPow; i++) {
    var power = Math.pow(i,2);
    if(initialPow + power <= target) res.push(i); else break;
  }
  return res;
}

function Combination(target) {
  return {
    combination : [],
    target : target,
    sum : function() {
      var res = 0;
      this.combination.forEach(function(n) { res+= n; });
      return res;
    },
    canAdd : function(n) {
      var o = (Math.pow(n,2) + this.sum());
      var r = o <= this.target;
      console.log('can add: ' + r);
      return r;
    },
    isComplete : function() {
      console.log('is complete: ', this.sum(), this.target);
      return this.sum() == this.target;
    },
    getResult : function(n) {
      res = [];
      this.combination.forEach(function(n) {
        res.push(Math.sqrt(n));
      });
      return res.sort(sortByNumberAsc);
    },
    add : function(n) {
      this.combination.push(Math.pow(n,2));
    }
  }
}

function getAllCombinations(arr,target) {
  var res = [];
  var indexModifier = arr.length-2;
  while(indexModifier >= 0) {
    var combination = new Combination(target);
    var lastElement = arr[arr.length-1];
    combination.add(lastElement);
    for(var j = indexModifier; j >= 0; j--) {
      var nextValue = arr[j];
      console.log('next value is: ' + nextValue);
      if(combination.canAdd(nextValue)) {
        combination.add(nextValue);
      }
    }
    if(combination.isComplete()) res.push(combination.getResult());
    indexModifier--;
  }
  return res;
}

function getAllPossibleSumsTo(arr,number) {
  var res = [];
  for(var i = 0; i < arr.length; i++) {
    if(arr[i] == number) {
      res.push([arr[i]]);
      continue;
    }
    for(var j = (i+1); j < arr.length; j++) {
      var sum = arr[i] + arr[j];
      if(sum == number) {
        res.push([arr[i],arr[j]]);
      }
    }
  }
  return res;
}

function progressiveSumOnly(arr,number) {
  var res = [];
  var combination = [];
  var sum = 0;
  for(var i = 0; i < arr.length; i++) {
    var thisNumber = arr[i];
    if(thisNumber != number) {
      if(thisNumber < number) {
        sum += thisNumber;
        if(sum == number) {
          res.push(combination);
        }else{
          combination.push(thisNumber);
        }
      }
    }else{
      res.push([thisNumber]);
      continue;
    }
  }
  return res;
}

console.log(progressiveSumOnly([1,2,3,4,5,6,9],9)); //44 Expected: '[2, 3, 5, 7, 43]', instead got: '[1, 3, 4, 5, 6, 43]'
