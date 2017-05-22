var helloWorld = function () {
  var obj = [
    [true,false,false,true,false,false,false],
    [true,true,false,false,true,false,true],
    [true,true,false,true,true,false,false],
    [true,true,false,true,true,false,false],
    [true,true,false,true,true,true,true],
    [true,false,false,false,false,false],
    [true,false,true,false,true,true,true],
    [true,true,false,true,true,true,true],
    [true,true,true,false,false,true,false],
    [true,true,false,true,true,false,false],
    [true,true,false,false,true,false,false],
    [true,false,false,false,false,true]
  ];
  var phrase = [];
  obj.forEach(function(binary) {
    var letter = new String();
    binary.forEach(function(digit) {
      letter+=~~digit;
    });
    phrase.push(parseInt(letter, parseInt(true + true)) >> (~~false));
  });
  return String.fromCharCode(...phrase);
}

console.log(helloWorld());
