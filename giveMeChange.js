//given a money int and an array of coins calculate how many combinations can
//you use of coins to return the money
//example : money 5
//1+1+1+1+1
//1+2+2
//2+1+1+1
//2+3
//3+1+1
//Result then is 5

function countChange(money, coins) {
  var counter = 0;
  return checkCombinationsWithFactor(0,money,0,coins);
}

function checkCombinationsWithFactor(currentPosition, target, counter, array) {
  if(currentPosition >= array.length) {
    return counter;
  }else{
    var curr = array[currentPosition];
    counter += onItself(curr,target);
    for(var i = 0; i < array.length; i++) {
      if(i != currentPosition) {
        counter += withThisNumber(curr, array[i], target);
      }
    }
    currentPosition++;
    return checkCombinationsWithFactor(currentPosition,target,counter,array);
  }
}

function onItself(number, target) {
  var sum = number;
  while(sum < target) {
    sum += number;
  }
  return sum == target ? 1 : 0;
}

function withThisNumber(current, number, target) {
  var sum = number;
  var loops = 0;
  while(sum < target) {
    sum += current;
    loops++;
  }
  if(loops == 1 && current > number) return 0;
  return sum == target ? 1 : 0;
}


//alternatives, money, repeatedCoins, coins
console.log(countChange(5,[1,2,3]));
//console.log(generateArrayOfCoin(2,5));
