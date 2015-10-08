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

type Board = piece[][];
interface BoardDelta {
  row: number;
  col: number;
}
interface IState {
  board?: Board;
  delta?: BoardDelta;
}

interface piece {
  name: string;
  value: number;
  color: string;
  promoted?: boolean;
}

module gameLogic {

  export const ROWS = 8;
  export const COLS = 9;

  export function winningPiece(attacker: number, attacked: number) {
    console.log(attacker, attacked);
    if(attacker===1&&attacked===16) {
      return 1;
    }
    else if(attacker===16&&attacked===1) {
      return 16;
    }
    else if((attacker === 16 || attacked === 16) && (attacker !== 0 || attacked !== 0)) { //if black flag is in a battle otherwise, it loses
      return Math.min(attacker, attacker);
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
    }
    /*else {
      return 0;
    }*/
  }
  export function getPieceColor(valueID: number) {
    /*if(valueID < 0 || valueID > 30){
      throw new Error("This is not an accepted value!");
      return "ERROR";
    }
    else*/ if(valueID===0) {
      return "gray";
    }
    else if(valueID>15) {
      return "black";
    }
    else {
      return "white";
    }
  }
  export function getPieceName(valueID: number) {
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
      //default: throw new Error("This piece name does not exist!"); return "ERROR";
    }
  }
  /** Returns the initial Generals board, which is a 8x9 matrix containing all pieces as placed by each player. */
  export function getInitialBoard(): Board {
    /*return   [
      [{value: 16, name: "BFL", color: "black"},{value: 30, name: "BSP", color: "black"},{value: 17, name: "BPR", color: "black"},{value: 17, name: "BPR", color: "black"},{value: 17, name: "BPR", color: "black"},{value: 17, name: "BPR", color: "black"},{value: 17, name: "BPR", color: "black"},{value: 27, name: "BS3", color: "black"},{value: 0, name: "EMP", color: "gray"}],
      [{value: 20, name: "BL1", color: "black"},{value: 25, name: "BS1", color: "black"},{value: 22, name: "BMA", color: "black"},{value: 29, name: "BS5", color: "black"},{value: 21, name: "BCA", color: "black"},{value: 18, name: "BSE", color: "black"},{value: 26, name: "BS2", color: "black"},{value: 28, name: "BS4", color: "black"},{value: 0, name: "EMP", color: "gray"}],
      [{value: 19, name: "BL2", color: "black"},{value: 24, name: "BCO", color: "black"},{value: 23, name: "BLC", color: "black"},{value: 30, name: "BSP", color: "black"},{value: 17, name: "BPR", color: "black"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
      [{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
      [{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
      [{value: 2, name: "WPR", color: "white"},{value: 2, name: "WPR", color: "white"},{value: 2, name: "WPR", color: "white"},{value: 2, name: "WPR", color: "white"},{value: 2, name: "WPR", color: "white"},{value: 2, name: "WPR", color: "white"},{value: 15, name: "WSP", color: "white"},{value: 12, name: "WS3", color: "white"},{value: 0, name: "EMP", color: "gray"}],
      [{value: 5, name: "WL1", color: "white"},{value: 10, name: "WS1", color: "white"},{value: 7, name: "WMA", color: "white"},{value: 14, name: "WS5", color: "white"},{value: 6, name: "WCA", color: "white"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
      [{value: 4, name: "WL2", color: "white"},{value: 9, name: "WCO", color: "white"},{value: 8, name: "WLC", color: "white"},{value: 15, name: "WSP", color: "white"},{value: 1, name: "WFL", color: "white"},{value: 0, name: "EMP", color: "gray"},{value: 3, name: "WSE", color: "white"},{value: 11, name: "WS2", color: "white"},{value: 13, name: "WS4", color: "white"}]];*/
       let board: Board = [];
       for (let i = 0; i < ROWS; i++) {
         board[i] = [];
         for (let j = 0; j < COLS; j++) {
           board[i][j] = {name: "EMP", value: 0, color: "gray"};
         }
       }

       return setupInitialBoard(board);
  }
  //Notable clauses: white can only use rows (i) 5-7 while black can only use rows (i) 0-2
  //Loops will work as such: each piece (from 1-30 in )
  export function setupInitialBoard(board: Board): Board {
    /**
     *Let white place pieces first. All 21 pieces must be placed on the board.
     */
    /**
     *Let black then add pieces before proceeding with the game (white's turn)
     */

     for (let i = 1; i < 16; i++) {
       if(i===2) {
         for (let j = 0; j < 6; j++) {
           board = addToBoard(board, 0, i);
         }
       }
       else if(i===15) {
         for (let j = 0; j < 2; j++) {
           board = addToBoard(board, 0, i);
         }
       }
       else {
         board = addToBoard(board, 0, i);
       }
     }
     for (let i = 16; i < 31; i++) {
       if(i===17) {
         for (let j = 0; j < 6; j++) {
          board = addToBoard(board, 1, i);
         }
       }
       else if(i===30) {
         for (let j = 0; j < 2; j++) {
           board = addToBoard(board, 1, i);
         }
       }
       else {
         board = addToBoard(board, 1, i);
       }
     }
    //logCurrentBoard(board);
    return board;
  }//take the blank board from getInitialBoard()   }
  //
  export function addToBoard(board: Board, turnIndexOfMove: number, pieceNo: number) : Board {
    if (pieceNo > 15) {
      //newPiece.color == "black";
      let completed: boolean = false;
      do {
        let rowPos: number = Math.floor(Math.random() * 3);
        let colPos: number = Math.floor(Math.random() * 8);
        //console.log("LOOP ATTEMPT", rowPos, colPos, pieceNo, board[rowPos][colPos].name);
        if(board[rowPos][colPos].name === "EMP") {
          //board[rowPos][colPos] == newPiece;
          board[rowPos][colPos].name = getPieceName(pieceNo);
          board[rowPos][colPos].value = pieceNo;
          board[rowPos][colPos].color = "black";
          //console.log("added [row][col][pieceNo]", rowPos, colPos, pieceNo);
          completed = true;
        }
      } while(completed === false);
    }
    else {
      let completed: boolean = false;
      do {
        let rowPos: number = (Math.floor(Math.random() * 3)+5);
        let colPos: number = Math.floor(Math.random() * 8);
        //console.log("LOOP ATTEMPT", rowPos, colPos, pieceNo, board[rowPos][colPos].name);
        if(board[rowPos][colPos].name === "EMP") {
          board[rowPos][colPos].name = getPieceName(pieceNo);
          board[rowPos][colPos].value = pieceNo;
          board[rowPos][colPos].color = "white";
          //console.log("added [row][col][pieceNo]", rowPos, colPos, pieceNo);
          completed = true;
        }
      } while(completed === false);
    }
    //Math.floor((Math.random() * 10) + 1)
    //logCurrentBoard(board);
    return board;
  }
  /*export function addToBoard(
    board: Board, turnIndexOfMove: number, row: number, col: number, pieceNo: number, color: string):IMove {
      let newPiece: piece;
      newPiece.value = pieceNo;
      newPiece.name = getPieceName(pieceNo);
      newPiece.color = color;
      if(color === "white") {
        if (row < 5 || row >= ROWS || col < 0 || col >= COLS) { //Make sure the attempted move is on the board
          throw new Error("Place a piece on your three closest rows only!");
        }
      }
      else {
        if (row > 2 || row < 0 || col < 0 || col >= COLS) { //Make sure the attempted move is on the board
          throw new Error("Place a piece on your three closest rows only!");
        }
      }
      if(board[row][col].color === color) {
        throw new Error ("A piece was already placed there!");
      }
      let boardAfterMove = angular.copy(board);
      //Add the new piece once we're sure there will be no issues
      boardAfterMove[row][col].value = newPiece.value;
      boardAfterMove[row][col].name = newPiece.name;
      boardAfterMove[row][col].color = newPiece.color;

      let firstOperation: IOperation;
      let delta: BoardDelta = {row: row, col: col};
      return [firstOperation,
                {set: {key: 'board', value: boardAfterMove}},
                {set: {key: 'delta', value: delta}}];
    }*/
  /**
   *
   */
   //This tabulates all available slots to load a new piece. Treat this like making a new move, but swap the pieces if one already exists there?
  /*export function getAvailablePositions(board: Board, turnIndexBeforeMove: number): IMove[] {
    let possibleMoves: IMove[] = [];
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        try {
          //possibleMoves.push(createMove(board, i, j, turnIndexBeforeMove));
        } catch (e) {

          // The cell in that position was full.
        }
      }
    }
    return possibleMoves;
  }*/

  /**
   *Ties do not exist in this game as it is always possible for one player's flag to be taken or to reach the enemy backline.
   */

  export function getWinner(board: Board, turnIndexOfMove: number, afterMove: boolean): string {
    //If one player has no flag, the other one is the winner.
    //Alternatively, if one player's flag is at the enemy backline and survived for one turn, that player wins
    let whiteFlag: boolean = false;
    let blackFlag: boolean = false;
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        if(board[i][j].value === 1) {
          if(afterMove==true&&i==0) {
            if(board[i][j].promoted === true) {
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
        else if(board[i][j].value === 16) {
          if(afterMove==true&&i===7) {
            if(board[i][j].promoted === true) {
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
    if((whiteFlag !== true)&&(blackFlag !== true)) {
      throw new Error("Both players have no flag currently!");
    }
    else if(whiteFlag !== true) {
      console.log("where my flag go");
      return "black";
    }
    else if(blackFlag !== true) {
      console.log("black flag should be dead");
      return "white";
    }
    //if both flags were found without any other clause being fulfilled, no one has won yet
    return '';
  }

  /**
   * Returns all the possible moves for the given board and turnIndexBeforeMove.
   * Returns an empty array if the game is over.
   */
  /*export function getPossibleMoves(board: Board, turnIndexBeforeMove: number): IMove[] {
    let possibleMoves: IMove[] = [];
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
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
  export function createMove(
      board: Board, turnIndexBeforeMove: number, deltaFrom : BoardDelta, deltaTo: BoardDelta): IMove {
    if (!board) {
      // Initially (at the beginning of the match), the board in state is undefined.
      board = getInitialBoard();
    }
    let pieceToMove: piece = board[deltaFrom.row][deltaFrom.col];
    if (deltaTo.row < 0 || deltaTo.row >= ROWS || deltaTo.col < 0 || deltaTo.col >= COLS) { //Make sure the attempted move is on the board
      throw new Error("One can only make a move within the board!");
    }
    if(deltaFrom.row === deltaTo.row && deltaFrom.col === deltaTo.col) {
      throw new Error ("One must move to a new position.");
    }
    if(turnIndexBeforeMove==1 && pieceToMove.color !== "white" || turnIndexBeforeMove==0 && pieceToMove.color !== "black") {
      throw new Error ("That's not your piece to move!");
    }
    //if(row) //make sure that the new location is within 1 space of the old location either by row or column EXCLUSIVELY
    if( (Math.abs(deltaFrom.row - deltaTo.row)>1 || Math.abs(deltaFrom.col - deltaTo.col)>1) ||
        (Math.abs(deltaFrom.row - deltaTo.row)===1 && Math.abs(deltaFrom.col - deltaTo.col)===1) ) {
          throw new Error ("One space vertically or horizontally is the move limit!");
    }
    if(board[deltaFrom.row][deltaFrom.col].color === board[deltaTo.row][deltaTo.col].color) {
      throw new Error ("Can't eat own player's piece!");
    }
    if (getWinner(board, turnIndexBeforeMove, false) !== '') { //the game is over if a winner exists
      throw new Error("Can only make a move if the game is not over!");
    }

    let boardAfterMove = angular.copy(board);
    //Let the fight break out. The winning piece takes over the slot

    boardAfterMove[deltaTo.row][deltaTo.col].value = winningPiece(board[deltaFrom.row][deltaFrom.col].value, board[deltaTo.row][deltaTo.col].value);

    boardAfterMove[deltaTo.row][deltaTo.col].name = getPieceName(boardAfterMove[deltaTo.row][deltaTo.col].value);
    console.log("winning piece is: ", boardAfterMove[deltaTo.row][deltaTo.col].name);
    boardAfterMove[deltaTo.row][deltaTo.col].color = getPieceColor(boardAfterMove[deltaTo.row][deltaTo.col].value);
    //Once the piece has moved, remove its occurrence from the previous state
    boardAfterMove[deltaFrom.row][deltaFrom.col].color = "gray";
    boardAfterMove[deltaFrom.row][deltaFrom.col].name = "EMP";
    boardAfterMove[deltaFrom.row][deltaFrom.col].value = 0;

    let winner = getWinner(boardAfterMove, (1-turnIndexBeforeMove), true);
    //console.log("the winner is ", winner);
    let firstOperation: IOperation;
    if (winner !== '') {
      // Game over.
      console.log("the winner is ", winner);
      firstOperation = {endMatch: {endMatchScores: winner === 'white' ? [1, 0] : winner === 'black' ? [0, 1] : [0, 0]}};
    } else {
      // Game continues. Now it's the opponent's turn (the turn switches from 0 to 1 and 1 to 0).
      firstOperation = {setTurn: {turnIndex: (1 - turnIndexBeforeMove) }};
    }
    //firstOperation = {setTurn: {turnIndex: (1 - turnIndexBeforeMove) }};
    //let delta: BoardDelta = {row: row, col: col};
    return [firstOperation,
              {set: {key: 'board', value: boardAfterMove}},
              {set: {key: 'deltaFrom', value: {row: deltaFrom.row, col: deltaFrom.col}}},
              {set: {key: 'deltaTo', value: {row: deltaTo.row, col: deltaTo.col}}}];
  }

  export function isMoveOk(params: IIsMoveOk): boolean {
    let move = params.move;
    let turnIndexBeforeMove = params.turnIndexBeforeMove;
    let stateBeforeMove: IState = params.stateBeforeMove;
    // The state and turn after move are not needed in TicTacToe (or in any game where all state is public).
    //let turnIndexAfterMove = params.turnIndexAfterMove;
    //let stateAfterMove = params.stateAfterMove;

    // We can assume that turnIndexBeforeMove and stateBeforeMove are legal, and we need
    // to verify that move is legal.
    try {
      let deltaFrom: BoardDelta = move[2].set.value;
      let deltaTo: BoardDelta = move[3].set.value;
      let board = stateBeforeMove.board;

      let expectedMove = createMove(board, turnIndexBeforeMove, deltaFrom, deltaTo);
      console.log(turnIndexBeforeMove, deltaFrom, deltaTo);
      if (!angular.equals(move, expectedMove)) {
        //console.log("fails");
        return false;
      }
    } catch (e) {
      // if there are any exceptions then the move is illegal
      console.log("throws");
      return false;
    }
    return true;
  }
}
