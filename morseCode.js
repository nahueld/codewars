var Morse = {};

Morse.encode = function(message){
  var words = message.split(' ');
  var binarystring = '';
  for(var i = 0; i < words.length; i++) {
    var word = words[i];
    for(var j = 0; j < word.length; j++) {
      var thisLetter = convertLetterBin(word[j]) + "000";
      binarystring += thisLetter;
    }
    if((i+1) != words.length) binarystring = binarystring + "0000"; //add 0000 as you already added 000 by the end of each word
  }
  binarystring = completeZeros(binarystring);
  var sliced = sliceBinaryString(binarystring);
  var res = [];
  for(var k = 0; k < sliced.length; k++) {
    res.push(bin2dec(sliced[k]));
  }
  return res;
};

Morse.decode = function(integerArray){
  var binary = getBinaryString(integerArray);
  var words = getWords(binary);
  var res = '';
  for(var i = 0; i < words.length; i++) {
    var word = getWord(words[i]);
    if(word) res += word + ' ';
  }
  return res.trim();
};

function sliceBinaryString(binaryString) {
  var res = [];
  for(var i = 32; i <= binaryString.length; i += 32) {
    res.push(binaryString.slice((i-32),i));
  }
  return res;
}

function completeZeros(binaryString) {
  var reminder = binaryString.length % 32;
  if(reminder > 0) {
    var diff = 32 - reminder;
    for(var i = 0; i < diff; i++) {
      binaryString = binaryString + "0";
    }
  }
  return binaryString;
}

function getBinaryString(integerArray) {
  var res = [];
  integerArray.forEach(function(n) {
    var converted = dec2bin(n);
    if(converted.length < 32) {
      var diff = 32 - converted.length;
      for(var i = 0; i < diff; i++) {
        converted = "0" + converted;
      }
    }
    res.push(converted);
  });
  return res.join('');
}

function convertBinLetter(arr) {
  var res = '';
  arr.forEach(function(i) {
    for(var k in Morse.alpha) {
      if(Morse.alpha.hasOwnProperty(k) && Morse.alpha[k] === i) {
        res += k;
      }
    }
  });
  return res;
}

function convertLetterBin(i) {
  var res = '';
  for(var k in Morse.alpha) {
    if(Morse.alpha.hasOwnProperty(k) && k === i) {
      res += Morse.alpha[k];
    }
  }
  return res;
}

function getWords(s) {
  var words =  s.split("0000000");
  var res = [];
  for(var i = 0; i < words.length; i++) {
    if(words[i] && words[i].indexOf("1") >= 0) res.push(words[i]);
  }
  return res;
}

function getWord(binaryWord) {
  var letters = binaryWord.split('000');
  return convertBinLetter(letters);
}

function dec2bin(num) {
  return (num >>> 0).toString(2);
}

function bin2dec(num) {
  return parseInt(num, 2) >> 0;
}

Morse.alpha = {
  'A': '10111',
  'B': '111010101',
  'C': '11101011101',
  'D': '1110101',
  'E': '1',
  'F': '101011101',
  'G': '111011101',
  'H': '1010101',
  'I': '101',
  'J': '1011101110111',
  'K': '111010111',
  'L': '101110101',
  'M': '1110111',
  'N': '11101',
  'O': '11101110111',
  'P': '10111011101',
  'Q': '1110111010111',
  'R': '1011101',
  'S': '10101',
  'T': '111',
  'U': '1010111',
  'V': '101010111',
  'W': '101110111',
  'X': '11101010111',
  'Y': '1110101110111',
  'Z': '11101110101',
  '0': '1110111011101110111',
  '1': '10111011101110111',
  '2': '101011101110111',
  '3': '1010101110111',
  '4': '10101010111',
  '5': '101010101',
  '6': '11101010101',
  '7': '1110111010101',
  '8': '111011101110101',
  '9': '11101110111011101',
  '.': '10111010111010111',
  ',': '1110111010101110111',
  '?': '101011101110101',
  "'": '1011101110111011101',
  '!': '1110101110101110111',
  '/': '1110101011101',
  '(': '111010111011101',
  ')': '1110101110111010111',
  '&': '10111010101',
  ':': '11101110111010101',
  ';': '11101011101011101',
  '=': '1110101010111',
  '+': '1011101011101',
  '-': '111010101010111',
  '_': '10101110111010111',
  '"': '101110101011101',
  '$': '10101011101010111',
  '@': '10111011101011101',
  ' ': '0' // Technically is 7 0-bits, but we assume that a space will always be between two other characters
};

var encoded = Morse.encode('HELLO WORLD');
console.log(encoded);
console.log(Morse.decode(encoded));
