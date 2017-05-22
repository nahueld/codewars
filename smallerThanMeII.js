function smaller(arr) {
  for(var i = 0, arrLength = arr.length; i < arrLength; i++) {
    arr[i] = getCount(arr[i],arr,(i+1),arrLength);
  }
  return arr;
}

/**
this is supposedly the fastest way to loop through an array
for ( var i = array.length; i--; ) {
    sum += array[i];
}
**/

function getCount(num, array, initialIndex, endingIndex) {
  var count = 0;
  if(initialIndex == endingIndex) return count;
  for(var i = initialIndex; i <= endingIndex; i++) {
    if(num > array[i]) {
      count++;
    }
  }
  return count;
}

console.log(smaller([5, 4, 7, 9, 2, 4, 4, 5, 6]));
