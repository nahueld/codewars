/**
Write an algorithm that will identify valid IPv4 addresses in dot-decimal format.
Input to the function is guaranteed to be a single string.

Examples of valid inputs: 1.2.3.4 123.45.67.89

Examples of invalid inputs: 1.2.3 1.2.3.4.5 123.456.78.90 123.045.067.089
**/

function isValidIP(str) {
  var arr = str.split('.');
  if(arr.length != 4) return false;
  var sum = 0;
  for(var i = 0; i < arr.length; i++) {
    if(isNaN(arr[i]) || arr[i] > 255) return false;
    if(arr[i].length > 1 && arr[i][0] == 0) return false;
    sum += arr[i];
  }
  return sum > 0;
}

console.log(isValidIP("123.45.67.89"))
