/**
 *When checking for legal moves, note which piece is being moved
 *Pieces eat anything below them on this list except for any listed exceptions
 *Ties are resolved by removing both pieces unless otherwise specified
 *Sp (2x) Defeats everything except "Pr"
 *S5
 *S4
 *S3
 *S2
 *S1
 *Co
 *LC
 *Ma
 *Ca
 *L1
 *L2
 *Se
 *Pr (6x)
 *Fl If two flags faceoff, the attacking flag wins
 */
var gameLogic;
(function (gameLogic) {
    /*export const ROWS = 8;
    export const COLS = 9;
    export const wSp = {value: 14, color: "white"}; //Wins all fights unless value of piece is 1 or a tie
    export const wS5 = {value: 13, color: "white"};
    export const wS4 = {value: 12, color: "white"};
    export const wS3 = {value: 11, color: "white"};
    export const wS2 = {value: 10, color: "white"};
    export const wS1 = {value: 9, color: "white"};
    export const wCo = {value: 8, color: "white"};
    export const wLC = {value: 7, color: "white"};
    export const wMa = {value: 6, color: "white"};
    export const wCa = {value: 5, color: "white"};
    export const wL1 = {value: 4, color: "white"};
    export const wL2 = {value: 3, color: "white"};
    export const wSe = {value: 2, color: "white"};
    export const wPr = {value: 1, color: "white"};
    export const wFl = {value: 0, color: "white"}; //Loses all fights unless tied
  
    export const bSp = {value: 14, color: "black"}; //Wins all fights unless value of piece is 1 or a tie
    export const bS5 = {value: 13, color: "black"};
    export const bS4 = {value: 12, color: "black"};
    export const bS3 = {value: 11, color: "black"};
    export const bS2 = {value: 10, color: "black"};
    export const bS1 = {value: 9, color: "black"};
    export const bCo = {value: 8, color: "black"};
    export const bLC = {value: 7, color: "black"};
    export const bMa = {value: 6, color: "black"};
    export const bCa = {value: 5, color: "black"};
    export const bL1 = {value: 4, color: "black"};
    export const bL2 = {value: 3, color: "black"};
    export const bSe = {value: 2, color: "black"};
    export const bPr = {value: 1, color: "black"};
    export const bFl = {value: 0, color: "black"}; //Loses all fights unless tied*/
    gameLogic.ROWS = 8;
    gameLogic.COLS = 9;
    /*This is not currently in use, but is a good reminder for what value goes with each piece
    export const BSP = 30;
    export const BS5 = 29;
    export const BS4 = 28;
    export const BS3 = 27;
    export const BS2 = 26;
    export const BS1 = 25;
    export const BCO = 24;
    export const BLC = 23;
    export const BMA = 22;
    export const BCA = 21;
    export const BL1 = 20;
    export const BL2 = 19;
    export const BSE = 18;
    export const BPR = 17;
    export const BFL = 16;
    export const WSP = 15;
    export const WS5 = 14;
    export const WS4 = 13;
    export const WS3 = 12;
    export const WS2 = 11;
    export const WS1 = 10;
    export const WCO = 9;
    export const WLC = 8;
    export const WMA = 7;
    export const WCA = 6;
    export const WL1 = 5;
    export const WL2 = 4;
    export const WSE = 3;
    export const WPR = 2;
    export const WFL = 1;
    export const EMP = 0; //empty slot*/
    /**
     *This is to simplify fights. The winner of the fight, by number, is returned if it exists.
     */
    function winningPiece(attacker, attacked) {
        if (attacker === 1 && attacked === 16) {
            return 1;
        }
        else if (attacker === 16 && attacked === 1) {
            return 16;
        }
        else if (attacker === 17 && attacked === 15 || attacker === 15 && attacked === 17) {
            return 15;
        }
        else if (attacker > attacked) {
            return attacker;
        }
        else if (attacker < attacked) {
            return attacked;
        }
        else {
            return 0;
        }
    }
    gameLogic.winningPiece = winningPiece;
    function getPieceColor(valueID) {
        if (valueID < 0 || valueID > 30) {
            throw new Error("This is not a value piece!");
            return "ERROR";
        }
        else if (valueID === 0) {
            return "gray";
        }
        else if (valueID > 15) {
            return "black";
        }
        else {
            return "white";
        }
    }
    gameLogic.getPieceColor = getPieceColor;
    function getPieceName(valueID) {
        switch (valueID) {
            case 0: return "EMP";
            case 1: return "WFL";
            case 2: return "WPR";
            case 3: return "WSE";
            case 4: return "WL2";
            case 5: return "WL1";
            case 6: return "WCA";
            case 7: return "WMA";
            case 8: return "WLC";
            case 9: return "WCO";
            case 10: return "WS1";
            case 11: return "WS2";
            case 12: return "WS3";
            case 13: return "WS4";
            case 14: return "WS5";
            case 15: return "WSP";
            case 16: return "BFL";
            case 17: return "BPR";
            case 18: return "BSE";
            case 19: return "BL2";
            case 20: return "BL1";
            case 21: return "BCA";
            case 22: return "BMA";
            case 23: return "BLC";
            case 24: return "BCO";
            case 25: return "BS1";
            case 26: return "BS2";
            case 27: return "BS3";
            case 28: return "BS4";
            case 29: return "BS5";
            case 30: return "BSP";
            default:
                throw new Error("This piece name does not exist!");
                return "ERROR";
        }
    }
    gameLogic.getPieceName = getPieceName;
    /** Returns the initial Generals board, which is a 8x9 matrix containing all pieces as placed by each player. */
    function getInitialBoard() {
        var board = [];
        for (var i = 0; i < gameLogic.ROWS; i++) {
            board[i] = [];
            for (var j = 0; j < gameLogic.COLS; j++) {
                board[i][j].name = "EMP"; //Default empty slot information
                board[i][j].value = 0;
                board[i][j].color = "gray";
            }
        }
        return board;
    }
    gameLogic.getInitialBoard = getInitialBoard;
    function setupInitialBoard(board) {
        /**
         *Let white place pieces first. All 21 pieces must be placed on the board.
         */
        addToBoard();
        /**
         *Let black then add pieces before proceeding with the game (white's turn)
         */
        return 0;
    } //take the blank board from getInitialBoard()   }
    function addToBoard(Board, turnIndexOfMove, row, col) {
        if (turnIndexOfMove === 0) {
            for (var i = 1; i <= 15; i++) {
            }
        }
    }
    /**
     *
     */
    //This tabulates all available slots to load a new piece. Treat this like making a new move, but swap the pieces if one already exists there?
    function getAvailablePositions(board, turnIndexBeforeMove) {
        var possibleMoves = [];
        for (var i = 0; i < gameLogic.ROWS; i++) {
            for (var j = 0; j < gameLogic.COLS; j++) {
                try {
                }
                catch (e) {
                }
            }
        }
        return possibleMoves;
    }
    gameLogic.getAvailablePositions = getAvailablePositions;
    /**
     *Find the blank spaces available for each player
     */
    /*function findBlanks(board: Board, row: number, col: number, turnIndexBeforeMove: number): IMove {
  
    }*/
    /**
     *Ties do not exist in this game as it is always possible for one player's flag to be taken or to reach the enemy backline.
     */
    /**
     * Return the winner (either 'white' or 'black')
     * The board is a matrix of size 3x3 containing either 'X', 'O', or ''.
     * E.g., getWinner returns 'X' for the following board:
     *     [['X', 'O', ''],
     *      ['X', 'O', ''],
     *      ['X', '', '']]
     */
    function getWinner(board) {
        var boardString = '';
        for (var i = 0; i < gameLogic.ROWS; i++) {
            for (var j = 0; j < gameLogic.COLS; j++) {
                var cell = board[i][j];
                boardString += cell.name === '' ? ' ' : cell;
            }
        }
        var win_patterns = [
            'XXX......',
            '...XXX...',
            '......XXX',
            'X..X..X..',
            '.X..X..X.',
            '..X..X..X',
            'X...X...X',
            '..X.X.X..'
        ];
        for (i = 0; i < win_patterns.length; i++) {
            var win_pattern = win_patterns[i];
            var x_regexp = new RegExp(win_pattern);
            var o_regexp = new RegExp(win_pattern.replace(/X/g, 'O'));
            if (x_regexp.test(boardString)) {
                return 'X';
            }
            if (o_regexp.test(boardString)) {
                return 'O';
            }
        }
        return '';
    }
    /**
     * Returns all the possible moves for the given board and turnIndexBeforeMove.
     * Returns an empty array if the game is over.
     */
    /*export function getPossibleMoves(board: Board, turnIndexBeforeMove: number): IMove[] {
      var possibleMoves: IMove[] = [];
      for (var i = 0; i < ROWS; i++) {
        for (var j = 0; j < COLS; j++) {
          try {
            possibleMoves.push(createMove(board, i, j, turnIndexBeforeMove));
          } catch (e) {
            // The cell in that position was full.
          }
        }
      }
      return possibleMoves;
    }*/
    /**
     * Returns the move that should be performed when player
     * with index turnIndexBeforeMove makes a move in cell row X col.
     */
    function createMove(board, turnIndexBeforeMove, deltaFrom, deltaTo) {
        if (!board) {
            // Initially (at the beginning of the match), the board in state is undefined.
            board = getInitialBoard();
        }
        var pieceToMove = board[deltaFrom.row][deltaFrom.col];
        if (deltaTo.row < 0 || deltaTo.row >= gameLogic.ROWS || deltaTo.col < 0 || deltaTo.col >= gameLogic.COLS) {
            throw new Error("One can only make a move within the board!");
        }
        if (deltaFrom.row === deltaTo.row && deltaFrom.col === deltaTo.col) {
            throw new Error("One must move to a new position.");
        }
        if (turnIndexBeforeMove == 0 && pieceToMove.color !== "white" || turnIndexBeforeMove == 1 && pieceToMove.color !== "black") {
            throw new Error("That's not your piece to move!");
        }
        //if(row) //make sure that the new location is within 1 space of the old location either by row or column EXCLUSIVELY
        if ((Math.abs(deltaFrom.row - deltaTo.row) > 1 || Math.abs(deltaFrom.col - deltaTo.col) > 1) ||
            (Math.abs(deltaFrom.row - deltaTo.row) === 1 && Math.abs(deltaFrom.col - deltaTo.col) === 1)) {
            throw new Error("One space vertically or horizontally is the move limit!");
        }
        if (board[deltaFrom.row][deltaFrom.col].color === board[deltaTo.row][deltaTo.col].color) {
            throw new Error("Can't eat own player's piece!");
        }
        if (getWinner(board) !== '') {
            throw new Error("Can only make a move if the game is not over!");
        }
        var boardAfterMove = angular.copy(board);
        //Let the fight break out. The winning piece takes over the slot
        var pieceAtSlot;
        pieceAtSlot.value = winningPiece(board[deltaFrom.row][deltaFrom.col].value, board[deltaTo.row][deltaTo.col].value);
        //Once the piece has moved, remove its occurrence from the previous state
        boardAfterMove[deltaTo.row][deltaTo.col].color = turnIndexBeforeMove === 0 ? 'white' : 'black'; //replace this line accordingly
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
    gameLogic.createMove = createMove;
    function isMoveOk(params) {
        var move = params.move;
        var turnIndexBeforeMove = params.turnIndexBeforeMove;
        var stateBeforeMove = params.stateBeforeMove;
        // The state and turn after move are not needed in TicTacToe (or in any game where all state is public).
        //var turnIndexAfterMove = params.turnIndexAfterMove;
        //var stateAfterMove = params.stateAfterMove;
        // We can assume that turnIndexBeforeMove and stateBeforeMove are legal, and we need
        // to verify that move is legal.
        try {
            // Example move:
            // [{setTurn: {turnIndex : 1},
            //  {set: {key: 'board', value: [['X', '', ''], ['', '', ''], ['', '', '']]}},
            //  {set: {key: 'delta', value: {row: 0, col: 0}}}]
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
            // if there are any exceptions then the move is illegal
            return false;
        }
        return true;
    }
    gameLogic.isMoveOk = isMoveOk;
})(gameLogic || (gameLogic = {}));
