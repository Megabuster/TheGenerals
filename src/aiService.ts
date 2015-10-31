module aiService {
  /**
   * Returns all the possible moves for the given board and turnIndexBeforeMove.
   * Returns an empty array if the game is over.
   */
  export function getPossibleMoves(board: Board, turnIndexBeforeMove: number): IMove[] {
    let possibleMoves: IMove[] = [];
    for (let i = 0; i < gameLogic.ROWS; i++) {
      for (let j = 0; j < gameLogic.COLS; j++) {
        for (let k = 0; k < 4; k++) {
          let deltaFrom: BoardDelta = {row: i, col:j};
          let deltaTo: BoardDelta = {row: i, col:j};
          //test all 4 possible moves and push only the ones that work
          switch(k) {
            case 0:
              deltaTo.row = deltaFrom.row-1;
              deltaTo.col = deltaFrom.col;
              break;
            case 1:
              deltaTo.row = deltaFrom.row+1;
              deltaTo.col = deltaFrom.col;
              break;
            case 2:
              deltaTo.row = deltaFrom.row;
              deltaTo.col = deltaFrom.col-1;
              break;
            case 3:
              deltaTo.row = deltaFrom.row;
              deltaTo.col = deltaFrom.col+1;
              break;
          }
          try {
            //let seed: number = Math.floor((Math.random()*4)+1);

            possibleMoves.push(gameLogic.createMove(board, turnIndexBeforeMove, deltaFrom, deltaTo));
          } catch (e) {
            // The cell in that position was full.
          }

        }
      }
    }
    return possibleMoves;
  }
  export function findComputerMove(updateUI: IUpdateUI): IMove {
     return createComputerMove(
         updateUI.stateAfterMove.board,
         updateUI.turnIndexAfterMove,
         // at most 1 second for the AI to choose a move (but might be much quicker)
         {millisecondsLimit: 1000});
   }
  export function createComputerMove(
      board: Board, playerIndex: number, alphaBetaLimits: IAlphaBetaLimits): IMove {
    let totalMoves: number = getPossibleMoves(board, playerIndex).length;
    let seed: number = Math.floor((Math.random()*totalMoves)+1);
    /*return alphaBetaService.alphaBetaDecision(
        [null, {set: {key: 'board', value: board}}],
        playerIndex, getNextStates, getStateScoreForIndex0, null, alphaBetaLimits);*/
    return getPossibleMoves(board, playerIndex)[seed];
  }

  /*function getStateScoreForIndex0(move: IMove, playerIndex: number): number {
    if (move[0].endMatch) {
      let endMatchScores = move[0].endMatch.endMatchScores;
      return endMatchScores[0] > endMatchScores[1] ? Number.POSITIVE_INFINITY
          : endMatchScores[0] < endMatchScores[1] ? Number.NEGATIVE_INFINITY
          : 0;
    }
    return 0;
  }

  function getNextStates(move: IMove, playerIndex: number): IMove[] {
    return getPossibleMoves(move[1].set.value, playerIndex);
  }*/
}
