https://en.wikipedia.org/wiki/Calkin%E2%80%93Wilf_tree

function fusc(n) {

}


generateLeftNode = function(parentNode) {
  return { a : parentNode.a , b: (parentNode.a + parentNode.b) };
}

generateRightNode = function(parentNode) {
  return { a : (parentNode.a + parentNode.b) , b : parentNode.b }
}

calkinWilfTree = function() {
  return {
    tree : [[{a : 1, b: 1}]],
    next : function() {
      var treeLevel = [];
      var lastParent = this.tree[this.tree.length - 1];
      lastParent.forEach(function(p) {
        treeLevel.push(generateLeftNode(p),generateRightNode(p));
      });
      this.tree.push(treeLevel)
    },
    sternSeries : function() {
      stern = [];
      this.tree.forEach(function(b) {
        var sum = 0;
        b.forEach(function(n) {
          sum += n.a / n.b;
        });
        stern.push(sum);
      });
      return stern;
    }
  }
}

generateCalkinWilfTreeTo = function(n) {
  var tree = [{a : 1, b: 1}];
  for(var i = 0; i < n; i++) {
    tree.push(generateTreeLevel(tree))
  }
  return tree;
}

var calkinWilf = new calkinWilfTree();
calkinWilf.next();
calkinWilf.next();
calkinWilf.next();
console.log(calkinWilf.tree);
