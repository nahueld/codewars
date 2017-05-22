/**
Create a function that takes a Roman numeral as its argument and returns its value
as a numeric decimal integer. You don't need to validate the form of the Roman numeral.
Modern Roman numerals are written by expressing each decimal digit of the number
to be encoded separately, starting with the leftmost digit and skipping any 0s.
So 1990 is rendered "MCMXC" (1000 = M, 900 = CM, 90 = XC) and 2008 is rendered "MMVIII" (2000 = MM, 8 = VIII).
The Roman numeral for 1666, "MDCLXVI", uses each letter in descending order.
**/
function solution(roman){
  var arr = roman.split('');
  var map = new Map([['M',1000],['D',500],['C',100],['L',50],['X',10],['V',5],['I',1]]);
  var res = 0;
  for(var i = 0; i < arr.length; i++) {
    var thisDec = map.get(arr[i]);
    var nextDec = (i+1) < arr.length ? map.get(arr[i+1]) : null;
    res = thisDec >= nextDec ? res + thisDec : res - thisDec;
  }
  return Math.abs(res);
}

console.log('s: ' + solution('XIV'));
