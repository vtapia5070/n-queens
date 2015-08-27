/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.AllRookInfo = {};
//contain all soutions
AllRookInfo.AllSolutions = [];
//array of arrays of possible 
AllRookInfo.summar = {};
AllRookInfo.summar.n = 0;
AllRookInfo.summar.index = 0;
AllRookInfo.summar.totSol = 0;

window.findNRooksSolution = function(n) {
  AllRookInfo.AllSolutions = [];
  if (n === 1) {
    AllRookInfo.AllSolutions = [[1]];
    AllRookInfo.summar.n = n;
    AllRookInfo.summar.totSol = 1;
    return AllRookInfo.AllSolutions;
  }
  this.permute(AllRookInfo.AllSolutions,n);
  if (AllRookInfo.AllSolutions.length !== 0) {
    AllRookInfo.summar.n = n;
    AllRookInfo.summar.totSol = AllRookInfo.AllSolutions.length;
    AllRookInfo.summar.index = AllRookInfo.summar.index % AllRookInfo.summar.totSol;
    AllRookInfo.summar.index++;
  }
  var solution = AllRookInfo.AllSolutions[AllRookInfo.summar.index];
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount; //fixme
  if (n === AllRookInfo.summar.n) {
    solutionCount = AllRookInfo.summar.totSol;
  } else {
    this.findNRooksSolution(n);
    solutionCount = AllRookInfo.summar.totSol;
  }
  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

window.AllQueenInfo = {};
AllQueenInfo.AllSolutions = [];
AllQueenInfo.summar = {};
AllQueenInfo.summar.n = 0;
AllQueenInfo.summar.index = 0;
AllQueenInfo.summar.totSol = 0;

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  AllQueenInfo.AllSolutions = [];
  if (n === 1) {
    AllQueenInfo.AllSolutions = [[1]];
    AllQueenInfo.summar.n = n;
    AllQueenInfo.summar.totSol = 1;
    return AllQueenInfo.AllSolutions;
  }
  var tmp = [];
  this.permute(tmp,n);
  for (var i = 0; i < tmp.length; i++) {
    var b = new Board(tmp[i]);
    if (!b.hasAnyQueensConflicts()) {
      AllQueenInfo.AllSolutions.push(tmp[i]);
    }
  }
  if (AllQueenInfo.AllSolutions.length !== 0) {
    AllQueenInfo.summar.n = n;
    AllQueenInfo.summar.totSol = AllQueenInfo.AllSolutions.length;
    AllQueenInfo.summar.index = AllQueenInfo.summar.index % AllQueenInfo.summar.totSol;
    AllQueenInfo.summar.index++;
  }
  if (AllQueenInfo.AllSolutions.length === 0) {
    AllQueenInfo.summar.n = n;
    AllQueenInfo.summar.totSol = AllQueenInfo.AllSolutions.length;
    AllQueenInfo.summar.index = AllQueenInfo.summar.index % AllQueenInfo.summar.totSol;
    AllQueenInfo.summar.index++;
  }
  var solution = AllQueenInfo.summar.totSol !== 0 ? AllQueenInfo.AllSolutions[AllQueenInfo.summar.index] : this.createEmptyArray(n);
  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount; 
  if (n === AllQueenInfo.summar.n) {
    solutionCount = AllQueenInfo.summar.totSol;
  } else {
    this.findNQueensSolution(n);
    solutionCount = AllQueenInfo.summar.totSol;
  }
  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

window.permute = function(bigArr, n) {
  var arr = _.range(0,n,1);
  return permuteHelper(bigArr, arr, 0, n-1, n);
};

window.permuteHelper = function(bigArr, arr, l, r, n) {
  var i;
  if (l === r) {
     var tmp = arr.slice();
     bigArr.push(this.correctRookSoln(tmp,n));
  } else {
    for (i = l; i <= r; i++) {
      swap(arr,l,i);
      permuteHelper(bigArr,arr,l+1,r, n);      
      swap(arr,l,i);
    }
  }
};

window.swap = function(arr, i, j) {
  var tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
};

window.correctRookSoln = function(arr, n) {
  var b = new Board({'n':n});
  for (var i = 0; i < n; i++) {
    b.togglePiece(i,arr[i]);
  }
  return b.rows();
}

window.createEmptyBoard = function (n) {
  var arr = [];
  for (var i = 0; i < n; i++) {
    arr.push(this.createEmptyArray(n));
  }
  return arr;
}

window.createEmptyArray = function(n) {
  var arr = [];
  for (var i = 0; i < n; i++) {
    arr.push(0);
  }
  return arr;
}










