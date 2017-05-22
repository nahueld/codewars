function toCamelCase(str){
  var del = str.indexOf('-') > 0 ? '-' : '_';
  var arr = str.split(del);
  for(var i = 1; i < arr.length; i++) {
    arr[i] = arr[i].length > 1 ?
      arr[i][0].toUpperCase() + arr[i].substring(1,arr[i].length) : arr[i];
  }
  return arr.join('');
}

console.log(toCamelCase('the-stealth-warrior'));

/**

**/
