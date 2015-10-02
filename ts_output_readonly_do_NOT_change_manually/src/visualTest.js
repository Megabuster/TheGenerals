function createMove(board, row, col, turnIndexBeforeMove) {
    if (!board) {
        board = getInitialBoard();
    }
    if (row < 0 || row >= ROWS || col < 0 || col >= COLS) {
        throw new Error("One can only make a move within the board!");
    }
    if (getWinner(board) !== '') {
        throw new Error("Can only make a move if the game is not over!");
    }
    var boardAfterMove = angular.copy(board);
    boardAfterMove[row][col].color = turnIndexBeforeMove === 0 ? 'white' : 'black';
    var winner = getWinner(boardAfterMove);
    var firstOperation;
    if (winner !== '') {
        // Game over.
        firstOperation = { endMatch: { endMatchScores: winner === 'white' ? [1, 0] : winner === 'black' ? [0, 1] : [0, 0] } };
    }
    else {
        // Game continues. Now it's the opponent's turn (the turn switches from 0 to 1 and 1 to 0).
        firstOperation = { setTurn: { turnIndex: 1 - turnIndexBeforeMove } };
    }
    var delta = { row: row, col: col };
    return [firstOperation,
        { set: { key: 'board', value: boardAfterMove } },
        { set: { key: 'delta', value: delta } }];
}
exports.createMove = createMove;
function isMoveOk(params) {
    var move = params.move;
    var turnIndexBeforeMove = params.turnIndexBeforeMove;
    var stateBeforeMove = params.stateBeforeMove;
    try {
        var deltaValue = move[2].set.value;
        var row = deltaValue.row;
        var col = deltaValue.col;
        var board = stateBeforeMove.board;
        var expectedMove = createMove(board, row, col, turnIndexBeforeMove);
        if (!angular.equals(move, expectedMove)) {
            return false;
        }
    }
    catch (e) {
        return false;
    }
    return true;
}
exports.isMoveOk = isMoveOk;
//---------------------------------------------------------createMove
function createMove(board, turnIndexBeforeMove, deltaFrom, deltaTo) {
    if (!board) {
        board = getInitialBoard();
    }
    var piece = board[deltaFrom.row][deltaFrom.col];
    var destination = board[deltaTo.row][deltaTo.col];
    var turn = getTurn(turnIndexBeforeMove);
    if (deltaFrom.row === deltaTo.row && deltaFrom.col === deltaTo.col) {
        throw new Error("Cannot move to same position.");
    }
    if (destination.substring === 'Den' && destination[0] === turn) {
        throw new Error("Cannot move into you own Den");
    }
    if (piece.charAt(0) !== turn) {
        // include: 'R', 'L', opponent's pieces
        if (piece === 'R' || piece === 'L') {
            throw new Error("There is no piece to move");
        }
        else {
            throw new Error("Cannot move opponent's piece");
        }
    }
    else {
        if (piece.substring(1) === 'Den' || piece.substring(1) === 'Trap') {
            throw new Error("There is no piece to move");
        }
    }
    if (getWinner(board) !== '' || isTie(board, turnIndexBeforeMove)) {
        throw new Error("Cannot make a move if the game is over!");
    }
    if (destination !== 'L' && destination !== 'R'
        && destination.substring(1) !== 'Trap' && destination.substring(1) !== 'Den') {
        if (turn === destination.charAt(0)) {
            throw new Error("One can only make a move in an empty position or capture opponent's piece!");
        }
    }
    var boardAfterMove = angular.copy(board);
    // update the board according to the moving piece
    var animal = piece.substring(1);
    switch (animal) {
        case 'Elephant':
            if (canLandAnimalMove(board, turnIndexBeforeMove, deltaFrom, deltaTo)) {
                boardAfterMove[deltaFrom.row][deltaFrom.col] = 'L';
                boardAfterMove[deltaTo.row][deltaTo.col] = piece;
            }
            else {
                throw new Error("Illegal move for Elephant.");
            }
            break;
        case 'Lion':
            if (canFlyAnimalMove(board, turnIndexBeforeMove, deltaFrom, deltaTo)) {
                boardAfterMove[deltaFrom.row][deltaFrom.col] = 'L';
                boardAfterMove[deltaTo.row][deltaTo.col] = piece;
            }
            else {
                throw new Error("Illegal move for Lion.");
            }
            break;
        case 'Tiger':
            if (canFlyAnimalMove(board, turnIndexBeforeMove, deltaFrom, deltaTo)) {
                boardAfterMove[deltaFrom.row][deltaFrom.col] = 'L';
                boardAfterMove[deltaTo.row][deltaTo.col] = piece;
            }
            else {
                throw new Error("Illegal move for Lion.");
            }
            break;
        case 'Leopard':
            if (canLandAnimalMove(board, turnIndexBeforeMove, deltaFrom, deltaTo)) {
                boardAfterMove[deltaFrom.row][deltaFrom.col] = 'L';
                boardAfterMove[deltaTo.row][deltaTo.col] = piece;
            }
            else {
                throw new Error("Illegal move for Lion.");
            }
            break;
        case 'Dog':
            if (canLandAnimalMove(board, turnIndexBeforeMove, deltaFrom, deltaTo)) {
                boardAfterMove[deltaFrom.row][deltaFrom.col] = 'L';
                boardAfterMove[deltaTo.row][deltaTo.col] = piece;
            }
            else {
                throw new Error("Illegal move for Lion.");
            }
            break;
        case 'Wolf':
            if (canLandAnimalMove(board, turnIndexBeforeMove, deltaFrom, deltaTo)) {
                boardAfterMove[deltaFrom.row][deltaFrom.col] = 'L';
                boardAfterMove[deltaTo.row][deltaTo.col] = piece;
            }
            else {
                throw new Error("Illegal move for Lion.");
            }
            break;
        case 'Cat':
            if (canLandAnimalMove(board, turnIndexBeforeMove, deltaFrom, deltaTo)) {
                boardAfterMove[deltaFrom.row][deltaFrom.col] = 'L';
                boardAfterMove[deltaTo.row][deltaTo.col] = piece;
            }
            else {
                throw new Error("Illegal move for Lion.");
            }
            break;
        case 'Mouse':
            if (canLandAnimalMove(board, turnIndexBeforeMove, deltaFrom, deltaTo)) {
                if (isInRiver(deltaFrom)) {
                    boardAfterMove[deltaFrom.row][deltaFrom.col] = 'R';
                }
                else {
                    boardAfterMove[deltaFrom.row][deltaFrom.col] = 'L';
                }
                boardAfterMove[deltaTo.row][deltaTo.col] = piece;
            }
            else {
                throw new Error("Illegal move for Lion.");
            }
            break;
        default:
            throw new Error("Unknown piece type!");
    }
    var winner = getWinner(boardAfterMove);
    var firstOperation;
    if (winner !== '' || isTie(board, turnIndexBeforeMove)) {
        // game is over
        firstOperation = { endMatch: { endMatchScores: winner === 'B' ? [1, 0] : winner === 'W' ? [0, 1] : [0, 0] } };
    }
    else {
        // Game continues. Now it's the opponent's turn (the turn switches from 0 to 1 and 1 to 0).
        firstOperation = { setTurn: { turnIndex: 1 - turnIndexBeforeMove } };
    }
    return [firstOperation,
        { set: { key: 'board', value: boardAfterMove } },
        { set: { key: 'deltaFrom', value: { row: deltaFrom.row, col: deltaFrom.col } } },
        { set: { key: 'deltaTo', value: { row: deltaTo.row, col: deltaTo.col } } }];
}
exports.createMove = createMove;
//---------------------------------------------------------------------------------------
function createMove(board, turnIndexBeforeMove, deltaFrom, deltaTo) {
    var pieceToMove = board[deltaFrom.row][deltaFrom.col];
    if (deltaTo.row < 0 || deltaTo.row >= ROWS || deltaTo.col < 0 || deltaTo.col >= COLS) {
        throw new Error("One can only make a move within the board!");
    }
    if (board[deltaFrom.row][deltaFrom.col].color === "white") {
        throw new Error("A piece was already placed there!");
    }
    var boardAfterMove = angular.copy(board);
    //Let the fight break out. The winning piece takes over the slot
    boardAfterMove[deltaTo.row][deltaTo.col].value =
        boardAfterMove[deltaTo.row][deltaTo.col].name =
            boardAfterMove[deltaTo.row][deltaTo.col].color =
                let;
    delta: BoardDelta = { row: row, col: col };
    return [firstOperation,
        { set: { key: 'board', value: boardAfterMove } },
        { set: { key: 'delta', value: delta } }];
}
exports.createMove = createMove;
-----------------------------------------------------------------expectMoveOk(1, { board: [['BFL', 'BSP', 'BPR', 'BPR', 'BPR', 'BPR', 'BPR', 'B3S', ''],
        ['B1L', 'B1S', 'BMA', 'B5S', 'BCA', 'BSE', 'B2S', 'B4S', ''],
        ['B2L', 'BCO', 'BLC', 'BSP', 'BPR', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['WPR', 'WPR', 'WPR', 'WPR', 'WPR', 'WPR', 'WSP', 'W3S', ''],
        ['W1L', 'W1S', 'WMA', 'W5S', 'WCA', '', '', '', ''],
        ['W2L', 'WCO', 'WLC', 'WSP', 'WFL', '', 'WSE', 'W2S', 'W4S']] }, [{ setTurn: { turnIndex: 0 } },
    { set: { key: 'board', value: [['BFL', 'BSP', 'BPR', 'BPR', 'BPR', 'BPR', 'BPR', 'B3S', ''],
                ['B1L', 'B1S', 'BMA', 'B5S', 'BCA', 'BSE', 'B2S', 'B4S', ''],
                ['B2L', 'BCO', 'BLC', 'BSP', 'BPR', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', 'WPR', '', '', '', '', '', ''],
                ['WPR', 'WPR', '', 'WPR', 'WPR', 'WPR', 'WSP', 'W3S', ''],
                ['W1L', 'W1S', 'WMA', 'W5S', 'WCA', '', '', '', ''],
                ['W2L', 'WCO', 'WLC', 'WSP', 'WFL', '', 'WSE', 'W2S', 'W4S']] } },
    { set: { key: 'delta', value: { row: 0, col: 0 } } }]);
