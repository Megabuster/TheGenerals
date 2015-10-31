var aiService;
(function (aiService) {
    /**
     * Returns all the possible moves for the given board and turnIndexBeforeMove.
     * Returns an empty array if the game is over.
     */
    function getPossibleMoves(board, turnIndexBeforeMove) {
        var possibleMoves = [];
        for (var i = 0; i < gameLogic.ROWS; i++) {
            for (var j = 0; j < gameLogic.COLS; j++) {
                for (var k = 0; k < 4; k++) {
                    var deltaFrom = { row: i, col: j };
                    var deltaTo = { row: i, col: j };
                    //test all 4 possible moves and push only the ones that work
                    switch (k) {
                        case 0:
                            deltaTo.row = deltaFrom.row - 1;
                            deltaTo.col = deltaFrom.col;
                            break;
                        case 1:
                            deltaTo.row = deltaFrom.row + 1;
                            deltaTo.col = deltaFrom.col;
                            break;
                        case 2:
                            deltaTo.row = deltaFrom.row;
                            deltaTo.col = deltaFrom.col - 1;
                            break;
                        case 3:
                            deltaTo.row = deltaFrom.row;
                            deltaTo.col = deltaFrom.col + 1;
                            break;
                    }
                    try {
                        //let seed: number = Math.floor((Math.random()*4)+1);
                        possibleMoves.push(gameLogic.createMove(board, turnIndexBeforeMove, deltaFrom, deltaTo));
                    }
                    catch (e) {
                    }
                }
            }
        }
        return possibleMoves;
    }
    aiService.getPossibleMoves = getPossibleMoves;
    function findComputerMove(updateUI) {
        return createComputerMove(updateUI.stateAfterMove.board, updateUI.turnIndexAfterMove, 
        // at most 1 second for the AI to choose a move (but might be much quicker)
        { millisecondsLimit: 1000 });
    }
    aiService.findComputerMove = findComputerMove;
    function createComputerMove(board, playerIndex, alphaBetaLimits) {
        var totalMoves = getPossibleMoves(board, playerIndex).length;
        var seed = Math.floor((Math.random() * totalMoves) + 1);
        /*return alphaBetaService.alphaBetaDecision(
            [null, {set: {key: 'board', value: board}}],
            playerIndex, getNextStates, getStateScoreForIndex0, null, alphaBetaLimits);*/
        return getPossibleMoves(board, playerIndex)[seed];
    }
    aiService.createComputerMove = createComputerMove;
})(aiService || (aiService = {}));
