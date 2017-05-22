function getLengthOfMissingArray(arrayOfArrays) {
  if(!arrayOfArrays || arrayOfArrays.length == 0) return 0;
  var sorted = [];
  for(var i = 0; i < arrayOfArrays.length; i++) {
    if(!arrayOfArrays[i] || arrayOfArrays[i].length == 0) return 0;
    sorted.push(arrayOfArrays[i].length);
  }
  sorted.sort(function(a,b) { return a - b });
  console.log(sorted);
  for(var j = 0; j < sorted.length; j++) {
    var thisLength = sorted[j];
    var nextLength = (j+1) < sorted.length ? sorted[j+1] : -1;
    console.log('lengths : ' + thisLength + ' and ' + nextLength);
    if(nextLength != -1 && (nextLength - thisLength) > 1) return thisLength + 1;
  }
}

console.log(getLengthOfMissingArray([[3, 4],
[2],
[1, 1, 1],
[1, 3, 3, 1],
[0, 2, 4, 0, 0],
[0, 4, 3, 2, 2, 0, 2, 1, 0],
[1, 2, 2, 3, 0, 3],
[4, 0, 1, 4, 0, 4, 3],
[3, 0, 3, 1, 3, 0, 4, 4, 4, 2]]));
