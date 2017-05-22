

console.log(whoIsNext(["Sheldon", "Leonard", "Penny", "Rajesh", "Howard"], 52));
//7230702951 Leonard


function whoIsNext(names,r) {
  var res = [];
  for(var i = 0; i < names.length; i++) {
    res.push({name:names[i],value:1});
  }
  while(r > 0) {
    r = canIteration(res,r);
    if(typeof r === 'string') break;
    updateRef(res);
  }
  return r;
}

function updateRef(ref) {
  for(var k = 0; k < ref.length; k++) {
    ref[k].value = ref[k].value * 2;
  }
}

function canIteration(ref, r) {
  var copy = ref.slice(0);
  for(var j = 0; j < copy.length; j++) {
    var amount = copy[j].value;
    while(amount > 0) {
      r--;
      amount--;
      if(r == 0) return copy[j].name;
    }
  }
  return r;
}


// function whoIsNext(names, r){
//   if(r < names.length) return names[r-1];
//   var extended = [];
//   for(var i = 0; i < names.length; i++) {
//     extended.push(names[i]);
//     extended.push(names[i]);
//   }
//   return r < extended.length ? extended[r-names.length] : names[r%extended.length];
// }

/**
Sheldon, Leonard, Penny, Rajesh and Howard are in the queue for a "Double Cola" drink vending machine;
there are no other people in the queue. The first one in the queue (Sheldon) buys a can, drinks it and doubles!
The resulting two Sheldons go to the end of the queue.
Then the next in the queue (Leonard) buys a can, drinks it and gets to the end of the queue as two Leonards, and so on.

For example, Penny drinks the third can of cola and the queue will look like this:

Rajesh, Howard, Sheldon, Sheldon, Leonard, Leonard, Penny, Penny
Write a program that will return the name of a man who will drink the n-th cola.

Note that in the very beginning the queue looks like that:

Sheldon, Leonard, Penny, Rajesh, Howard
Input

The input data consist of an array which contains five names, and single integer n.

(1 ≤ n ≤ 1000000000).
Output / Examples

Return the single line — the name of the person who drinks the n-th can of cola. The cans are numbered starting from 1. Please note that you should spell the names like this: "Sheldon", "Leonard", "Penny", "Rajesh", "Howard" (without the quotes). In that order precisely the friends are in the queue initially.

whoIsNext(["
**/
