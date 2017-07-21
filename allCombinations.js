function allCombinations(size, array) {

};

function getAllCombinationsWith(number,size,array) {
  console.log(number,size,array);
  var results = [];
  var banned = [];
  for(var i = 0; i < array.length; i++) {
    var curr = [number];
    console.log(i,curr);
    if(array[i] != number) {
      banned.push(array[i]);
      if(curr.length == size) {
        results.push(curr);
      }else{
        curr.push(array[i]);
        continue;
      }
    }
  }
  return results;
}

function cleanRepeated(matrix) {
  var res = [];
  for(var i = 0; i < matrix.length; i++) {
    var j = i+1;
    if(j < matrix.length && compare(matrix[i],matrix[j])) {
      continue;
    }else{
      res.push(matrix[i]);
    }
  }
  return res;
}

function compare(arr1, arr2) {
  for(var i = 0; i < arr1.length; i++) {
    if(arr1[i] != arr2[i]) return false;
  }
  return true;
}

console.log(getAllCombinationsWith(1,3,[1,2,3,4]));
