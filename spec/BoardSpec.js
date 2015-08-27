describe("Board", function() {

  var capitalize = function(word) {
    return word[0].toUpperCase() + word.slice(1);
  };


  var verifyConflictTypes = function(expectedConflicts, matrix){
    // The Board() constructor will accept a matrix and build that into a (Backbone) Board object (as defined in Board.js)
    var board = new Board(matrix);
    _.map('row col rooks majorDiagonal minorDiagonal queens'.split(' '), function(conflictType){
      var conflictDetected = board['hasAny' + capitalize(conflictType) + 'Conflicts']();
      var conflictExpected = _(expectedConflicts).contains(conflictType);
      var message = conflictExpected ? 'should' : 'should not';

      it(message + " find a " + conflictType + " conflict", function() {
        expect(conflictDetected).to.be.equal(conflictExpected);
      });
    });
  };

  // describe("Minor Diagonal conflict tests", function() {
  //   // debugger;
  //   var b = new Board({n:4});
  //   for (var i = 0; i < b.get('n'); i++) {
  //       it("should report empty board at index " + i + " to have no conflicts", function() {
  //         expect(b.hasMinorDiagonalConflictAt()).to.be.equal(false);
  //       });
  //     }

  //   b.togglePiece(2,0);

  //   for (var i = 0; i < b.get('n'); i++) {
  //       it("should report empty board at index " + i + " to have no conflicts", function() {
  //         expect(b.hasMinorDiagonalConflictAt()).to.be.equal(false);
  //       });
  //     }
  //   b.togglePiece(0,2);
  //   it("should report empty board at index " + 0 + " to have no conflicts", function() {
  //         expect(b.hasMinorDiagonalConflictAt(0)).to.be.equal(false);
  //       });
  //   it("should report empty board at index " + 1 + " to have no conflicts", function() {
  //         expect(b.hasMinorDiagonalConflictAt(1)).to.be.equal(false);
  //       });
  //   it("should report empty board at index " + 2 + " to have no conflicts", function() {
  //         expect(b.hasMinorDiagonalConflictAt(2)).to.be.equal(true);
  //       });
  //   it("should report empty board at index " + 3 + " to have no conflicts", function() {
  //         expect(b.hasMinorDiagonalConflictAt(3)).to.be.equal(false);
  //       });
  // });

  describe("Empty board", function() {
    verifyConflictTypes([''], [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]);
  });

  describe("Board with row conflicts", function() {
    verifyConflictTypes(['row', 'rooks', 'queens'], [
      [0, 0, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]);
  });

  describe("Board with col conflicts", function() {
    verifyConflictTypes(['col', 'rooks', 'queens'], [
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0]
    ]);
  });

  describe("Board with major diagonal conflicts", function() {
    verifyConflictTypes(['majorDiagonal', 'queens'], [
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]);
  });

  // debugger;

  describe("Board with minor diagonal conflicts", function() {
    verifyConflictTypes(['minorDiagonal', 'queens'], [
      [0, 0, 1, 0],
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0]
    ]);
  });
});
