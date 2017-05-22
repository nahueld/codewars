function generateBC(url, separator) {
  var arr = createArrayOfLink(url);
  if(arr.length == 0 || (arr.length == 1 && !arr[0])) {
    return generateSpan('HOME');
  }else if(arr.length == 2) {
    return !arr[1] ? generateSpan('HOME') : generateTheBc(arr,separator);
  }else{
    return generateTheBc(arr,separator);
  }
}

function generateTheBc(arr,separator) {
  var res = generateLink('/','HOME') + separator;
  for(var i = 0; i < arr.length; i++) {
    if(i == arr.length - 1) {
      res += generateSpan(arr[i]);
    }else{
      res += generateLink("/" + arr.slice(0,(i+1)).join('/') + "/",arr[i]) + separator;
    }
  }
  return res;
}

function createArrayOfLink(url) {
  url = url.replace('http://','').replace('https://','');
  var arr = url.split('/');
  if(arr[arr.length - 1].toLowerCase().includes('index')) arr.pop();
  arr.shift();
  return arr;
}

function generateLink(href,label) {
  return '<a href="' + href + '">' + normalizeLabel(label) + '</a>';
}

function generateSpan(label) {
  return '<span class="active">' + normalizeLabel(label) + '</span>'
}

function normalizeLabel(label) {
  label = removeTrailingChar(label);
  var acronym = '';
  if(label.length > 30) {
    var arr = label.split('-');
    var avoided = ["the","of","in","from","by","with","and", "or", "for", "to", "at", "a"];
    for(var i = 0 ; i < arr.length; i++) {
      acronym += avoided.indexOf(arr[i]) >= 0 ? '' : arr[i][0];
    }
  }else{
    acronym = label.replace(/-/g,' ');
  }
  return acronym.toUpperCase();
}

function removeTrailingChar(label) {
  var trailing = ['.','#','?'];
  for(var i = 0; i < trailing.length; i++) {
    if(label.indexOf(trailing[i]) >= 0) return label.split(trailing[i])[0];
  }
  return label;
}

console.log(generateBC('https://github.com/', ' : '));
