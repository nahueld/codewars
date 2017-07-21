//given a money int and an array of coins calculate how many combinations can
//you use of coins to return the money
//example : money 5

/**
//1+1+1+1+1
**/

//1+1+1+1+1
//1+2+2
//2+1+1+1
//2+3
//3+1+1
//Result then is 5

/**
describe 'count_change' do
  it 'returns 1 if amount is zero' do
    expect(Kata.new.count_change(0, [1, 2, 3])).to eq(1)
  end

  it 'returns 0 if denominations are greater than amount' do
    expect(Kata.new.count_change(5, [10, 20, 30])).to eq(0)
  end

  it 'returns 0 if denominations is empty' do
    expect(Kata.new.count_change(5, [])).to eq(0)
  end

  it 'returns 1 if amount is 1' do
    p [1,2,3].shift

    expect(Kata.new.count_change(1, [1, 2, 3])).to eq(1) #[1]
  end
  it 'returns 2 if amount is 2' do
    expect(Kata.new.count_change(2, [1, 2, 3])).to eq(2) #[[1, 1], [2]])
  end
  it 'returns 3 if amount is 3' do
    expect(Kata.new.count_change(3, [1, 2, 3])).to eq(3) #[[1, 1, 1], [1, 2], [3]])
  end
  it 'returns 4 if amount is 4' do
    expect(Kata.new.count_change(4, [1, 2, 3])).to eq(4) #[[1, 1, 1, 1], [1, 1, 2], [1, 3], [2, 2]])
  end
  it 'returns 5 if amount is 5' do
    expect(Kata.new.count_change(5, [1, 2, 3])).to eq(5) #[[1, 1, 1, 1, 1]x, [1, 1, 1, 2]x, [1, 2, 2]x, [1, 1, 3]x, [2, 3]])
  end

  it 'returns 1 if amount is zero' do
    expect(Kata.new.count_change(5, [1, 2, 3, 4, 5])).to eq(7)
  end
  it 'returns 1 if amount is zero' do
    expect(Kata.new.count_change(5, [1, 2, 3, 5])).to eq(6  )
  end

end
**/

function countChange(money, coins) {
  var counter = 0;
  return checkCombinationsWithFactor(0,money,0,coins);
}

function checkCombinationsWithFactor(currentPosition, target, counter, array) {
  if(currentPosition >= array.length) {
    return counter;
  }else{
    var curr = array[currentPosition];
    counter += onItself(curr,target, array);
    for(var i = 0; i < array.length; i++) {
      if(i != currentPosition) {
        counter += withThisNumber(curr, array[i], target);
      }
    }
    currentPosition++;
    console.log("===========")
    console.log("Counter:", counter);
    console.log("===========")
    return checkCombinationsWithFactor(currentPosition,target,counter,array);
  }
}

function onItself(number, target, coins) {
  console.log('===============');
  console.log('intItself', number, target);
  var sum = number;
  var loops = 0;
  while(sum < target) {
    sum += number;
    console.log('intItself after add',number, sum);
    loops++;
  }
  console.log('intItself result', sum);
  if(sum == target) {
    console.log('intItself YAAAAY', sum, target);
    console.log('===============');
    return 1;
  }else{
    sum -= number;
    var res = loops > 1 ? canIcomplete(sum,coins,target) : 0;
    return res;
    console.log('===============');
  }
}

function withThisNumber(current, number, target) {
  console.log('===============');
  console.log('withThisNumber', current, number, target);
  if(current > number) {
    console.log('Already covered in previous iteration');
    return 0;
  }
  var sum = number + current;
  console.log('withThisNumber sum starts', sum);
  var loops = 0;
  while(sum < target) {
    sum += current;
    loops++;
    console.log('withThisNumber after add',current, sum);
  }
  console.log('withThisNumber total', sum);
  // if(current > number) {
  //   console.log('withThisNumber loop 1', current, number);
  //   return 0;
  // }
  if(sum == target) {
    console.log('withThisNumber YAAAAY', sum, target);
    console.log('===============');
    return 1;
  }else{
    console.log('===============');
    return 0;
  }
}

function canIcomplete(currentSum, coins, target) {
  for(var i = 0 ; i < coins.length ; i++) {
    var sum = currentSum + coins[i];
    if(sum == target) {
      console.log('I can complete with one more coin YAAAAY');
      return 1;
    }
  }
  return 0;
}


//alternatives, money, repeatedCoins, coins
console.log(countChange(5,[1,2,3,5]));
//console.log(generateArrayOfCoin(2,5));
