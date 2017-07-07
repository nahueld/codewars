function countChange(money, coins) {
  coins = sortCoins(coins);
  coins = cleanGreater(money, coins);
  var alternatives = 0;
  alternatives = recursiveChecker(alternatives,money,coins,coins.slice());
  return alternatives;
}

function recursiveChecker(alternatives, money, coins, pristine) {
  if(coins.length == 0) {
    return alternatives;
  } else {
    var currentCoin = coins.shift();
    console.log('CURRENT COIN : ' + currentCoin);
    var pristineWithoutCC = definePristineWithoutCC(currentCoin, pristine);
    console.log('PRISTINE WITHOUT CURRENT: ', pristineWithoutCC);
    var arrayOfRepeatedCoins = generateArrayOfCoin(currentCoin, money);
    console.log('REPEATED COINS: ', arrayOfRepeatedCoins);
    var currentSum = sumOfThisArr(arrayOfRepeatedCoins);
    if(currentSum == money) {
      alternatives++;
      console.log('Adding self-sufficient array',alternatives);
    } else if(currentSum < money && coins.length > 0  && pristineWithoutCC.length > 1) {
      for(var i = 0; i < pristineWithoutCC.length; i++) {
        var thisSum = currentSum + pristineWithoutCC[i];
        if(thisSum == money) {
          alternatives++;
          console.log('Adding when lower',alternatives);
        }
      }
    }
    alternatives = backwardsRecursiveChecker(alternatives, money, arrayOfRepeatedCoins, coins);
    return recursiveChecker(alternatives, money, coins, pristine);
  }
}

function definePristineWithoutCC(cc, pristine) {
  var res = [];
  pristine.forEach(function(c) {
    if(cc != c) res.push(c);
  });
  return res;
}

function backwardsRecursiveChecker(alternatives, money, repeatedCoins, coins) {
  if(repeatedCoins.length == 0 || coins.length == 0) {
    return alternatives;
  } else {
    repeatedCoins.pop(); //[1,1,1,1]
    //console.log('Backwards arr: ', repeatedCoins);
    var summatory = sumOfThisArr(repeatedCoins);
    for(var i = 0; i < coins.length; i++) {
      var currentCoin = coins[i];
      //console.log('CC: ' + currentCoin);
      var currentSum = summatory + currentCoin;
      //console.log('Sum: ' + currentSum + ' and trying to get to: ' + money);
      if(currentSum == money) {
        alternatives++;
        console.log('Adding inside backwardsRecursiveChecker', alternatives);
      }
    }
    return backwardsRecursiveChecker(alternatives, money, repeatedCoins, coins);
  }
}

function sumOfThisArr(arr) {
  var sum = 0;
  arr.forEach(function(i) {
    sum+=i;
  });
  return sum;
}

function generateArrayOfCoin(coin, money) {
  var res = [];
  var sum = 0;
  while (sum <= money) {
    sum += coin;
    if(sum <= money) res.push(coin);
  }
  return res;
}

function canIgiveChangeWithThis(money, coin) {
  res = false;
  return coin == money ? true : calculateIfSummatoryWorks(money, coin);
}

//ignore
function calculateIfSummatoryWorks(money, coin) {
  var summatory = 0;
  while(summatory < money) {
    summatory += coin;
  }
  return summatory == money;
}

function cleanGreater(money,coins) {
  var res = [];
  coins.forEach(function(c) { if(c <= money) res.push(c); });
  return res;
}

function sortCoins(coins) {
  return coins.sort();
}

//alternatives, money, repeatedCoins, coins
console.log(countChange(5,[1,2,3,5]));
//console.log(generateArrayOfCoin(2,5));
