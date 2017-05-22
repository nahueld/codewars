console.log(doneOrNot([[5, 3, 4, 6, 7, 8, 9, 1, 2],
                         [6, 7, 2, 1, 9, 0, 3, 4, 9],
                         [1, 0, 0, 3, 4, 2, 5, 6, 0],
                         [8, 5, 9, 7, 6, 1, 0, 2, 0],
                         [4, 2, 6, 8, 5, 3, 7, 9, 1],
                         [7, 1, 3, 9, 2, 4, 8, 5, 6],
                         [9, 0, 1, 5, 3, 7, 2, 1, 4],
                         [2, 8, 7, 4, 1, 9, 6, 3, 5],
                         [3, 0, 0, 4, 8, 1, 1, 7, 9]]));

function doneOrNot(board){
  for(var i = 0; i < board.length; i++) {
    var row = board[i];
    var col = getColumn(board,i);
    if(!checkLine(row) || !checkLine(col)) return 'Try again!';
  }
  for(var x = 0; x <= 6; x = x + 3) {
    for(var z = 0; z <= 6; z = z + 3) {
      if(!checkLine(getRegion(board,x,z))) return 'Try again!';
    }
  }
  return 'Success!'
}

function getRegion(board,startingRow,startingCol) {
  var res = [];
  for(var i = startingRow; i < (startingRow + 3); i++) {
    var row = board[i];
    for(var j = startingCol; j < (startingCol + 3); j++) {
      res.push(row[j]);
    }
  }
  return res;
}

function getColumn(board,index) {
  var col = [];
  for(var i = 0; i < board.length; i++ ) {
    col.push(board[i][index]);
  }
  return col;
}

function checkLine(line) {
  var i = 1;
  var thisArr = line.slice(0);
  thisArr.sort().forEach(function(e) {
    var curr = e-i;
    if(curr != 0) return false;
    i++;
  });
  return i == 10;
}
