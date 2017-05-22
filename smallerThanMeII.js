function smaller(arr) {
  for(var i = 0, arrLength = arr.length; i < arrLength; i++) {
    arr[i] = getCount(arr[i],arr,i,arrLength);
  }
  return arr;
}

function getCount(num, array, initialIndex, endingIndex) {
  var count = 0;
  if(initialIndex == endingIndex) return count;
  var copyArr = array.slice(initialIndex,endingIndex).sort();
  for(var i = 0, copyArrLength = copyArr.length; i < copyArrLength; i++) {
    if(num > copyArr[i]) {
      count++;
    }else{
      break;
    }
  }
  return count;
}

console.log(smaller([5, 4, 7, 9, 2, 4, 4, 5, 6]));
