/**

All possible sums and subtraction of equivalent monomials ("xy==yx") has been done, e.g.:
"cb+cba" -> "bc+abc", "2xy-yx" -> "xy", "-a+5ab+3a-c-2a" -> "-c+5ab"

All monomials appears in order of increasing number of variables, e.g.:
"-abc+3a+2ac" -> "3a+2ac-abc", "xyz-xz" -> "-xz+xyz"

If two monomials have the same number of variables, they appears in lexicographic order, e.g.:
"a+ca-ab" -> "a-ab+ac", "xzy+zby" ->"byz+xyz"

There is no leading + sign if the first coefficient is positive, e.g.:
"-y+x" -> "x-y", but no restrictions for -: "y-x" ->"-x+y"

+n-5hn+7tjhn-4nh-3n-6hnjt+2jhn+9hn
✘ Expected: '-2n+2hjn+hjnt', instead got: '+2n+2hjn+hjnt'

+11x+11x+0xd-12x+5adx+4xd
✘ Expected: '10x+4dx+5adx', instead got: '+10x+4dx+5adx'

Testing for +2dca+12dc-10dac+12c-4dc-10cad-5c-13c
 Log
 +2dca+12dc-10dac+12c-4dc-10cad-5c-13c
[ { sym: '-', num: -18, vars: 'acd' },
  { sym: '+', num: 8, vars: 'cd' },
  { sym: '-', num: -6, vars: 'c' } ]
-6c+8cd-18acdNaN
✘ It should work for random inputs too - Expected: '-6c+8cd-18acd', instead got: '-6c+8cd-18acdNaN'

**/

var POSITIVE = '+';
var NEGATIVE = '-';


function simplify(poly){
  var res = [];
  var arr = poly.split(POSITIVE);
  for(var i = 0; i < arr.length; i++) {
    res = res.concat(processMonomial(arr[i]));
  }
  var operated = [];
  for(var j = 0; j < res.length; j++) {
    //this if is to avoid only integers as par of monomials or 0abc cases which gives 0
    if(res[j].vars) pushIfNotDuplicated(operated,operateMonomials(j,res));
  }
  var finalRes = polynomialToString(operated);
  return finalRes[0] == POSITIVE ? finalRes.slice(1,finalRes.length) : finalRes;
}

function polynomialToString(arr) {
  var res = '';
  arr.sort(sortByVarsLexicographic);
  arr.sort(sortByVarsLength);
  for(i in arr) {
    if(arr[i].num !== 0 && !isNaN(arr[i].num))
      res += arr[i].sym + (arr[i].num == 1 || arr[i].num == -1  ? '' : Math.abs(arr[i].num)) + arr[i].vars;
  }
  return res;
}

function sortByVarsLexicographic(a,b) {
  if(a.vars > b.vars) return 1;
  if(a.vars < b.vars) return -1;
  return 0;
}

function sortByVarsLength(a,b) {
  if(a.vars.length > b.vars.length) return 1;
  if(a.vars.length < b.vars.length) return -1;
  return 0;
}

function pushIfNotDuplicated(arr,obj) {
  var dup = false;
  for(var k = 0; k < arr.length; k++) {
    if(arr[k].vars == obj.vars) dup = true;
  }
  if(!dup) arr.push(obj);
}

function operateMonomials(position,arr) {
  var monObj = Object.assign({},arr[position]);
  var numericOperation = monObj.sym + monObj.num;
  for(var i = 0; i < arr.length; i++) {
    if(i != position && monObj.vars == arr[i].vars) {
      numericOperation += arr[i].sym + arr[i].num;
    }
  }
  var res = eval(numericOperation);
  monObj.num = res;
  monObj.sym = res < 0 ? NEGATIVE : POSITIVE;
  return monObj;
}

function processMonomial(m) {
  var res = [];
  if(m.indexOf(NEGATIVE) >= 0) {
    var narr = m.split(NEGATIVE);
    if(narr[0]) res.push(getMonomialObj(POSITIVE,narr[0])); //this one is positive
    for(var j = 1; j < narr.length; j++) { res.push(getMonomialObj(NEGATIVE,narr[j])); }
  }else{
    res.push(getMonomialObj(POSITIVE,m));
  }
  return res;
}

function getMonomialObj(s,m) {
  var number = '', variables = '';
  for(var c = 0; c < m.length; c++) {
    if(isNaN(m[c])) variables += m[c]; else number += m[c];
  }
  return { sym : s, num : number || 1, vars: variables.split('').sort().join('') }
}

console.log(simplify('+2dca+12dc-10dac+12c-4dc-10cad-5c-13c'))
