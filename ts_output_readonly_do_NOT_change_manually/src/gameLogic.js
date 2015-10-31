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
    gameLogic.ROWS = 8;
    gameLogic.COLS = 9;
    function winningPiece(attacker, attacked) {
        //console.log(attacker, attacked);
        var attackerColor = getPieceColor(attacker);
        var attackedColor = getPieceColor(attacked);
        if (attacker === 1 && attacked === 16) {
            //console.log("Returning", 1);
            return 1;
        }
        else if (attacker === 16 && attacked === 1) {
            //console.log("Returning", 16);
            return 16;
        }
        if (attacker > 15) {
            attacker -= 15;
        }
        else if (attacked > 15) {
            attacked -= 15;
        }
        if (attacker === attacked) {
            //console.log("Returning", 0);
            return 0;
        }
        if ((attacker === 2 && attacked === 15)) {
            if (attackerColor === "white") {
                //console.log("Returning", 2);
                return 2;
            }
            else {
                //console.log("Returning", 17);
                return 17;
            }
        }
        else if ((attacker === 15 && attacked === 2)) {
            if (attackedColor === "white") {
                //console.log("Returning", 2);
                return 2;
            }
            else {
                //console.log("Returning", 17);
                return 17;
            }
        }
        if (attacker > attacked) {
            if (attackerColor === "white") {
                //console.log("Returning", "attacker");
                return attacker;
            }
            else {
                //console.log("Returning", (attacker+15));
                return (attacker += 15);
            }
        }
        if (attacker < attacked) {
            if (attackedColor === "white") {
                //console.log("Returning", "attacked");
                return attacked;
            }
            else {
                //console.log("Returning", (attacked+15));
                return (attacked += 15);
            }
        }
        /*
        else if((attacker === 16 || attacked === 16) && (attacker !== 0 || attacked !== 0)) { //if black flag is in a battle otherwise, it loses
          return Math.min(attacker, attacked);
        }
        else if(attacker===2&&attacked===30 || attacker===30&&attacked===2) {
          return 2;
        }
        else if(((attacker - attacked)===15 || (attacked - attacker)===15) && attacker!==0 && attacked!==0) {
          return 0;
        }
        else if(attacker > attacked) {
          return attacker;
        }
        else if (attacker < attacked) {
          return attacked;
        }*/
        /*else {
          return 0;
        }*/
    }
    gameLogic.winningPiece = winningPiece;
    function getPieceColor(valueID) {
        /*if(valueID < 0 || valueID > 30){
          throw new Error("This is not an accepted value!");
          return "ERROR";
        }
        else*/ if (valueID === 0) {
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
            case 31: return "white";
            case 32: return "black";
            case 33: return "light";
        }
    }
    gameLogic.getPieceName = getPieceName;
    /** Returns the initial Generals board, which is a 8x9 matrix containing all pieces as placed by each player. */
    function getBlankBoard() {
        var board = [];
        var k = 30;
        for (var i = 0; i < gameLogic.ROWS; i++) {
            board[i] = [];
            for (var j = 0; j < gameLogic.COLS; j++) {
                /*if(k>0) {
                  k--;
                 board[i][j] = {name: getPieceName(k), value: k, color: getPieceColor(k)};
                }
                else {*/
                board[i][j] = { name: "EMP", value: 0, color: "gray" };
            }
        }
        return board;
    }
    gameLogic.getBlankBoard = getBlankBoard;
    function getInitialBoard() {
        /*return   [
          [{value: 16, name: "BFL", color: "black"},{value: 30, name: "BSP", color: "black"},{value: 17, name: "BPR", color: "black"},{value: 17, name: "BPR", color: "black"},{value: 17, name: "BPR", color: "black"},{value: 17, name: "BPR", color: "black"},{value: 17, name: "BPR", color: "black"},{value: 27, name: "BS3", color: "black"},{value: 0, name: "EMP", color: "gray"}],
          [{value: 20, name: "BL1", color: "black"},{value: 25, name: "BS1", color: "black"},{value: 22, name: "BMA", color: "black"},{value: 29, name: "BS5", color: "black"},{value: 21, name: "BCA", color: "black"},{value: 18, name: "BSE", color: "black"},{value: 26, name: "BS2", color: "black"},{value: 28, name: "BS4", color: "black"},{value: 0, name: "EMP", color: "gray"}],
          [{value: 19, name: "BL2", color: "black"},{value: 24, name: "BCO", color: "black"},{value: 23, name: "BLC", color: "black"},{value: 30, name: "BSP", color: "black"},{value: 17, name: "BPR", color: "black"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
          [{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
          [{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
          [{value: 2, name: "WPR", color: "white"},{value: 2, name: "WPR", color: "white"},{value: 2, name: "WPR", color: "white"},{value: 2, name: "WPR", color: "white"},{value: 2, name: "WPR", color: "white"},{value: 2, name: "WPR", color: "white"},{value: 15, name: "WSP", color: "white"},{value: 12, name: "WS3", color: "white"},{value: 0, name: "EMP", color: "gray"}],
          [{value: 5, name: "WL1", color: "white"},{value: 10, name: "WS1", color: "white"},{value: 7, name: "WMA", color: "white"},{value: 14, name: "WS5", color: "white"},{value: 6, name: "WCA", color: "white"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
          [{value: 4, name: "WL2", color: "white"},{value: 9, name: "WCO", color: "white"},{value: 8, name: "WLC", color: "white"},{value: 15, name: "WSP", color: "white"},{value: 1, name: "WFL", color: "white"},{value: 0, name: "EMP", color: "gray"},{value: 3, name: "WSE", color: "white"},{value: 11, name: "WS2", color: "white"},{value: 13, name: "WS4", color: "white"}]];*/
        var board = getBlankBoard();
        board = [[{ "name": "EMP", "value": 0, "color": "gray" }, { "name": "BPR", "value": 17, "color": "black" }, { "name": "BS1", "value": 25, "color": "black" }, { "name": "BCA", "value": 21, "color": "black" }, { "name": "BSE", "value": 18, "color": "black" }, { "name": "BPR", "value": 17, "color": "black" }, { "name": "BPR", "value": 17, "color": "black" }, { "name": "BLC", "value": 23, "color": "black" }, { "name": "BSP", "value": 30, "color": "black" }],
            [{ "name": "EMP", "value": 0, "color": "gray" }, { "name": "BS5", "value": 29, "color": "black" }, { "name": "BPR", "value": 17, "color": "black" }, { "name": "EMP", "value": 0, "color": "gray" }, { "name": "BFL", "value": 16, "color": "black" }, { "name": "BS2", "value": 26, "color": "black" }, { "name": "BPR", "value": 17, "color": "black" }, { "name": "BL1", "value": 20, "color": "black" }, { "name": "BS4", "value": 28, "color": "black" }],
            [{ "name": "BMA", "value": 22, "color": "black" }, { "name": "BS3", "value": 27, "color": "black" }, { "name": "BCO", "value": 24, "color": "black" }, { "name": "EMP", "value": 0, "color": "gray" }, { "name": "BPR", "value": 17, "color": "black" }, { "name": "BL2", "value": 19, "color": "black" }, { "name": "BSP", "value": 30, "color": "black" }, { "name": "EMP", "value": 0, "color": "gray" }, { "name": "EMP", "value": 0, "color": "gray" }],
            [{ "name": "EMP", "value": 0, "color": "gray" }, { "name": "EMP", "value": 0, "color": "gray" }, { "name": "EMP", "value": 0, "color": "gray" }, { "name": "EMP", "value": 0, "color": "gray" }, { "name": "EMP", "value": 0, "color": "gray" }, { "name": "EMP", "value": 0, "color": "gray" }, { "name": "EMP", "value": 0, "color": "gray" }, { "name": "EMP", "value": 0, "color": "gray" }, { "name": "EMP", "value": 0, "color": "gray" }],
            [{ "name": "EMP", "value": 0, "color": "gray" }, { "name": "EMP", "value": 0, "color": "gray" }, { "name": "EMP", "value": 0, "color": "gray" }, { "name": "EMP", "value": 0, "color": "gray" }, { "name": "EMP", "value": 0, "color": "gray" }, { "name": "EMP", "value": 0, "color": "gray" }, { "name": "EMP", "value": 0, "color": "gray" }, { "name": "EMP", "value": 0, "color": "gray" }, { "name": "EMP", "value": 0, "color": "gray" }],
            [{ "name": "WSE", "value": 3, "color": "white" }, { "name": "EMP", "value": 0, "color": "gray" }, { "name": "EMP", "value": 0, "color": "gray" }, { "name": "WMA", "value": 7, "color": "white" }, { "name": "WSP", "value": 15, "color": "white" }, { "name": "EMP", "value": 0, "color": "gray" }, { "name": "EMP", "value": 0, "color": "gray" }, { "name": "WL2", "value": 4, "color": "white" }, { "name": "WS1", "value": 10, "color": "white" }],
            [{ "name": "WPR", "value": 2, "color": "white" }, { "name": "WLC", "value": 8, "color": "white" }, { "name": "WCA", "value": 6, "color": "white" }, { "name": "WPR", "value": 2, "color": "white" }, { "name": "WCO", "value": 9, "color": "white" }, { "name": "WS4", "value": 13, "color": "white" }, { "name": "EMP", "value": 0, "color": "gray" }, { "name": "WPR", "value": 2, "color": "white" }, { "name": "WL1", "value": 5, "color": "white" }],
            [{ "name": "WPR", "value": 2, "color": "white" }, { "name": "EMP", "value": 0, "color": "gray" }, { "name": "WS3", "value": 12, "color": "white" }, { "name": "WFL", "value": 1, "color": "white" }, { "name": "WS2", "value": 11, "color": "white" }, { "name": "WSP", "value": 15, "color": "white" }, { "name": "WPR", "value": 2, "color": "white" }, { "name": "WS5", "value": 14, "color": "white" }, { "name": "WPR", "value": 2, "color": "white" }]];
        return board;
        //return setupInitialBoard(board);
    }
    gameLogic.getInitialBoard = getInitialBoard;
    /*export function getInitialMove(board: Board) : IMove {
      let firstOperation: IMove = [],
        visibilityOperations: IMove = [],
        setRandomInteger: ISetRandomInteger = {key: "", from: 0, to: 55},
        setVisibilities: ISetVisibility[] = [],shuffleKeys: IShuffle = {keys: []},
        i: number, j: number, k: number, assignedTiles: number, tilesToAssign: number;
        //let temp: number = 0;
        let randomInt: ISetRandomInteger = {key: "test", from: 0, to: 55};
        //console.log(randomInt.test);
        //gameService.makeMove([{setTurn: {turnIndex: 0}}, setRandomInteger("initial_x_row", 0, ROWS), setRandomInteger("initial_x_column", 0, COLS)]);
       //setupInitialBoard(board);
  
        firstOperation.push({setTurn: {turnIndex: 0}});
        firstOperation.push({set: {key: 'board', value: board}});
        return firstOperation;
    }*/
    //Assign visibilities on the field depending on whose turn it currently is
    /*export function pieceVisibility(board: Board) {
  
    }*/
    //Notable clauses: white can only use rows (i) 5-7 while black can only use rows (i) 0-2
    //Loops will work as such: each piece (from 1-30 in )
    /**
     *Let white place pieces first. All 21 pieces must be placed on the board.
     */
    /**
     *Let black then add pieces before proceeding with the game (white's turn)
     */
    function setupInitialBoard(board) {
        //let setRandom: IMove = setRandomInteger("test", 1, 8);
        for (var i = 1; i < 16; i++) {
            if (i === 2) {
                for (var j = 0; j < 6; j++) {
                    board = addToBoard(board, 0, i);
                }
            }
            else if (i === 15) {
                for (var j = 0; j < 2; j++) {
                    board = addToBoard(board, 0, i);
                }
            }
            else {
                board = addToBoard(board, 0, i);
            }
        }
        for (var i = 16; i < 31; i++) {
            if (i === 17) {
                for (var j = 0; j < 6; j++) {
                    board = addToBoard(board, 1, i);
                }
            }
            else if (i === 30) {
                for (var j = 0; j < 2; j++) {
                    board = addToBoard(board, 1, i);
                }
            }
            else {
                board = addToBoard(board, 1, i);
            }
        }
        //logCurrentBoard(board);
        return board;
    }
    gameLogic.setupInitialBoard = setupInitialBoard;
    //
    function addToBoard(board, turnIndexOfMove, pieceNo) {
        if (pieceNo > 15) {
            //newPiece.color == "black";
            var completed = false;
            do {
                var rowPos = Math.floor(Math.random() * 3);
                ;
                //setRandomInteger(rowPos,1,2);//Math.floor(Math.random() * 3);
                var colPos = Math.floor(Math.random() * 9);
                //console.log("LOOP ATTEMPT", rowPos, colPos, pieceNo, board[rowPos][colPos].name);
                if (board[rowPos][colPos].name === "EMP") {
                    //board[rowPos][colPos] == newPiece;
                    board[rowPos][colPos].name = getPieceName(pieceNo);
                    board[rowPos][colPos].value = pieceNo;
                    board[rowPos][colPos].color = "black";
                    //console.log("added [row][col][pieceNo]", rowPos, colPos, pieceNo);
                    completed = true;
                }
            } while (completed === false);
        }
        else {
            var completed = false;
            do {
                var rowPos = (Math.floor(Math.random() * 3) + 5);
                var colPos = Math.floor(Math.random() * 9);
                //console.log("LOOP ATTEMPT", rowPos, colPos, pieceNo, board[rowPos][colPos].name);
                if (board[rowPos][colPos].name === "EMP") {
                    board[rowPos][colPos].name = getPieceName(pieceNo);
                    board[rowPos][colPos].value = pieceNo;
                    board[rowPos][colPos].color = "white";
                    //console.log("added [row][col][pieceNo]", rowPos, colPos, pieceNo);
                    completed = true;
                }
            } while (completed === false);
        }
        //Math.floor((Math.random() * 10) + 1)
        //logCurrentBoard(board);
        return board;
    }
    gameLogic.addToBoard = addToBoard;
    //Display current board configuration within the console
    function showBoardConsole(board) {
        console.log("Displaying board layout");
        for (var i = 0; i < gameLogic.ROWS; i++) {
            var rowName = "";
            for (var j = 0; j < gameLogic.COLS; j++) {
                var pieceName = board[i][j].name;
                rowName += pieceName + " ";
            }
            console.log(rowName);
        }
        console.log("End display board");
    }
    gameLogic.showBoardConsole = showBoardConsole;
    function getWinner(board, turnIndexOfMove, afterMove) {
        //If one player has no flag, the other one is the winner.
        //Alternatively, if one player's flag is at the enemy backline and survived for one turn, that player wins
        var whiteFlag = false;
        var blackFlag = false;
        for (var i = 0; i < gameLogic.ROWS; i++) {
            for (var j = 0; j < gameLogic.COLS; j++) {
            }
        }
        for (var i = 0; i < gameLogic.ROWS; i++) {
            for (var j = 0; j < gameLogic.COLS; j++) {
                if (board[i][j].value === 1) {
                    if (afterMove == true && i == 0) {
                        if (board[i][j].promoted === true) {
                            console.log("go here");
                            return "white";
                        }
                        else {
                            board[i][j].promoted = true;
                            console.log("come here", i, j);
                        }
                    }
                    whiteFlag = true;
                }
                else if (board[i][j].value === 16) {
                    if (afterMove == true && i === 7) {
                        if (board[i][j].promoted === true) {
                            return "black";
                        }
                        else {
                            board[i][j].promoted = true;
                            console.log("tis true");
                        }
                    }
                    //console.log("black flag should be dead");
                    blackFlag = true;
                }
            }
        }
        if ((whiteFlag !== true) && (blackFlag !== true)) {
            throw new Error("Both players have no flag currently!");
        }
        else if (whiteFlag !== true) {
            console.log("where my flag go");
            return "black";
        }
        else if (blackFlag !== true) {
            console.log("black flag should be dead");
            return "white";
        }
        //if both flags were found without any other clause being fulfilled, no one has won yet
        return '';
    }
    gameLogic.getWinner = getWinner;
    /**
     * Returns the move that should be performed when player
     * with index turnIndexBeforeMove makes a move in cell row X col.
     */
    function getMovesForPiece(board, turnIndexBeforeMove, row, col) {
        var possibleMoves = [];
        console.log("Moving from ", row, col);
        for (var k = 0; k < 4; k++) {
            var deltaFrom = { row: row, col: col };
            var deltaTo = { row: row, col: col };
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
                possibleMoves.push(createMove(board, turnIndexBeforeMove, deltaFrom, deltaTo));
            }
            catch (e) {
            }
        }
        console.log("Total moves found: ", possibleMoves.length);
        return possibleMoves;
    }
    gameLogic.getMovesForPiece = getMovesForPiece;
    //check legality of the move without changing the game state
    function checkLegalMove(board, turnIndexBeforeMove, deltaFrom, deltaTo) {
        var pieceToMove = board[deltaFrom.row][deltaFrom.col];
        //console.log("Piece to move", pieceToMove.name, pieceToMove.value, pieceToMove.color, deltaFrom.row, deltaFrom.col);
        //showBoardConsole(board);
        if (deltaTo.row < 0 || deltaTo.row >= gameLogic.ROWS || deltaTo.col < 0 || deltaTo.col >= gameLogic.COLS) {
            //console.log("Can't move off board");
            throw new Error("One can only make a move within the board!");
        }
        if (deltaFrom.row === deltaTo.row && deltaFrom.col === deltaTo.col) {
            //console.log("Can't eat yourself");
            throw new Error("One must move to a new position.");
        }
        if (turnIndexBeforeMove == 0 && pieceToMove.color !== "white" || turnIndexBeforeMove == 1 && pieceToMove.color !== "black") {
            //console.log("Can't move wrong piece", turnIndexBeforeMove, pieceToMove.color);
            throw new Error("That's not your piece to move!");
        }
        //if(row) //make sure that the new location is within 1 space of the old location either by row or column EXCLUSIVELY
        if ((Math.abs(deltaFrom.row - deltaTo.row) > 1 || Math.abs(deltaFrom.col - deltaTo.col) > 1) ||
            (Math.abs(deltaFrom.row - deltaTo.row) === 1 && Math.abs(deltaFrom.col - deltaTo.col) === 1)) {
            //console.log("Can't fly");
            throw new Error("One space vertically or horizontally is the move limit!");
        }
        if (board[deltaFrom.row][deltaFrom.col].color === board[deltaTo.row][deltaTo.col].color) {
            //console.log("Can't eat your own piece");
            throw new Error("Can't eat own player's piece!");
        }
        if (getWinner(board, turnIndexBeforeMove, false) !== '') {
            //console.log("It's done, Jim");
            throw new Error("Can only make a move if the game is not over!");
        }
        //console.log("This move is legal");
        return true;
    }
    gameLogic.checkLegalMove = checkLegalMove;
    function createMove(board, turnIndexBeforeMove, deltaFrom, deltaTo) {
        if (!board) {
            console.log("building board from createMove");
            // Initially (at the beginning of the match), the board in state is undefined.
            board = getInitialBoard();
        }
        checkLegalMove(board, turnIndexBeforeMove, deltaFrom, deltaTo);
        var boardAfterMove = angular.copy(board);
        //Let the fight break out. The winning piece takes over the slot
        //console.log("Being passed into winningPiece: ", board[deltaFrom.row][deltaFrom.col].value, board[deltaTo.row][deltaTo.col].value);
        boardAfterMove[deltaTo.row][deltaTo.col].value = winningPiece(board[deltaFrom.row][deltaFrom.col].value, board[deltaTo.row][deltaTo.col].value);
        boardAfterMove[deltaTo.row][deltaTo.col].name = getPieceName(boardAfterMove[deltaTo.row][deltaTo.col].value);
        boardAfterMove[deltaTo.row][deltaTo.col].color = getPieceColor(boardAfterMove[deltaTo.row][deltaTo.col].value);
        //console.log("after win, piece number: ", boardAfterMove[deltaTo.row][deltaTo.col].value);
        //Once the piece has moved, remove its occurrence from the previous state
        boardAfterMove[deltaFrom.row][deltaFrom.col].color = "gray";
        boardAfterMove[deltaFrom.row][deltaFrom.col].name = "EMP";
        boardAfterMove[deltaFrom.row][deltaFrom.col].value = 0;
        var winner = getWinner(boardAfterMove, (1 - turnIndexBeforeMove), true);
        //console.log("the winner is ", winner);
        var firstOperation;
        if (winner !== '') {
            // Game over.
            console.log("the winner is ", winner);
            firstOperation = { endMatch: { endMatchScores: winner === 'white' ? [1, 0] : winner === 'black' ? [0, 1] : [0, 0] } };
        }
        else {
            // Game continues. Now it's the opponent's turn (the turn switches from 0 to 1 and 1 to 0).
            firstOperation = { setTurn: { turnIndex: (1 - turnIndexBeforeMove) } };
        }
        //firstOperation = {setTurn: {turnIndex: (1 - turnIndexBeforeMove) }};
        //let delta: BoardDelta = {row: row, col: col};
        return [firstOperation,
            { set: { key: 'board', value: boardAfterMove } },
            { set: { key: 'deltaFrom', value: { row: deltaFrom.row, col: deltaFrom.col } } },
            { set: { key: 'deltaTo', value: { row: deltaTo.row, col: deltaTo.col } } }];
    }
    gameLogic.createMove = createMove;
    function isMoveOk(params) {
        var move = params.move;
        //showBoardConsole(move[1].set.value);
        var turnIndexBeforeMove = params.turnIndexBeforeMove;
        var stateBeforeMove = params.stateBeforeMove;
        var board = stateBeforeMove.board;
        //showBoardConsole(board);
        //showBoardConsole(stateBeforeMove.board);
        // The state and turn after move are not needed in TicTacToe (or in any game where all state is public).
        //let turnIndexAfterMove = params.turnIndexAfterMove;
        //let stateAfterMove = params.stateAfterMove;
        // We can assume that turnIndexBeforeMove and stateBeforeMove are legal, and we need
        // to verify that move is legal.
        //showBoardConsole(stateBeforeMove.board);
        try {
            var deltaFrom = move[2].set.value;
            var deltaTo = move[3].set.value;
            //let board = stateBeforeMove.board;
            //showBoardConsole(stateBeforeMove.board);
            //console.log("is this the call?");
            var expectedMove = createMove(board, turnIndexBeforeMove, deltaFrom, deltaTo);
            console.log(turnIndexBeforeMove, deltaFrom, deltaTo);
            if (!angular.equals(move, expectedMove)) {
                console.log("fails");
                return false;
            }
        }
        catch (e) {
            // if there are any exceptions then the move is illegal
            console.log("throws");
            return false;
        }
        return true;
    }
    gameLogic.isMoveOk = isMoveOk;
})(gameLogic || (gameLogic = {}));
