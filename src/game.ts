module game {
  interface BoardDelta {
    row: number;
    col: number;
  }
  let animationEnded = false;
  let canMakeMove = false;
  let isComputerTurn = false;
  let state: IState = null;
  let turnIndex: number = null;
  export let deltaFromSet: boolean = false;
  export let currentDeltaFrom: BoardDelta = {row: 0, col: 0};
  export let isHelpModalShown: boolean = false;

  export function init() {
    console.log("Translation of 'RULES_OF_TICTACTOE' is " + translate('RULES_OF_TICTACTOE'));
    resizeGameAreaService.setWidthToHeight(1);
    gameService.setGame({
      minNumberOfPlayers: 2,
      maxNumberOfPlayers: 2,
      isMoveOk: gameLogic.isMoveOk,
      updateUI: updateUI
    });

    // See http://www.sitepoint.com/css3-animation-javascript-event-handlers/
    document.addEventListener("animationend", animationEndedCallback, false); // standard
    document.addEventListener("webkitAnimationEnd", animationEndedCallback, false); // WebKit
    document.addEventListener("oanimationend", animationEndedCallback, false); // Opera
  }

  function animationEndedCallback() {
    $rootScope.$apply(function () {
      log.info("Animation ended");
      animationEnded = true;
      if (isComputerTurn) {
        sendComputerMove();
      }
    });
  }

  function sendComputerMove() {
    gameService.makeMove(
        aiService.createComputerMove(state.board, turnIndex, {maxDepth: 1}));
  }

  function updateUI(params: IUpdateUI): void {
    animationEnded = false;
    state = params.stateAfterMove;
    //$rootScope.state = state;
    console.log("test updateUI");
    if (!state.board) {
      console.log("test appear once");
      state.board = gameLogic.getInitialBoard();
    }

    gameLogic.showBoardConsole(state.board);
    canMakeMove = params.turnIndexAfterMove >= 0 && // game is ongoing
      params.yourPlayerIndex === params.turnIndexAfterMove; // it's my turn
    turnIndex = params.turnIndexAfterMove;

    // Is it the computer's turn?
    isComputerTurn = canMakeMove &&
        params.playersInfo[params.yourPlayerIndex].playerId === '';
    if (isComputerTurn) {
      // To make sure the player won't click something and send a move instead of the computer sending a move.
      canMakeMove = false;
      // We calculate the AI move only after the animation finishes,
      // because if we call aiService now
      // then the animation will be paused until the javascript finishes.
      if (!state.delta) {
        // This is the first move in the match, so
        // there is not going to be an animation, so
        // call sendComputerMove() now (can happen in ?onlyAIs mode)
        sendComputerMove();
      }
    }
  }
  function myPiece(row:number, col:number, playerId: number): boolean {
    let myColor: string = " ";
    if(playerId===0) {
      myColor = "white";
    }
    else if(playerId===1) {
      myColor = "black";
    }
    else {
      console.log("Illegal player ID");
    }

    if (state.board[row][col].color !== myColor) {
      console.log("Not your piece to move");
      return false;
    }
    let possibleMoves: IMove[] = gameLogic.getPossibleMoves(state.board, playerId);
    if (possibleMoves.length == 0){
      console.log("You have nowhere to move that piece");
      return false;
    }
    console.log("You can move the piece from ", row, col, "player ", playerId);
    return true;
  }
  export function cellClicked(row: number, col: number): void {
    log.info(["Clicked on cell:", row, col]);
    if (window.location.search === '?throwException') { // to test encoding a stack trace with sourcemap
      throw new Error("Throwing the error because URL has '?throwException'");
    }
    if (!canMakeMove) {
      return;
    }
    //try {
      if(game.deltaFromSet===false&&myPiece(row, col, turnIndex)==true) {
        console.log("Able to make move from location");
        currentDeltaFrom.row = row;
        currentDeltaFrom.col = col;
        deltaFromSet = true;
      }
      else if(game.deltaFromSet===true){
        console.log("deltaFrom is currently: ", currentDeltaFrom.row, currentDeltaFrom.col);
        let move = gameLogic.createMove(state.board, turnIndex, currentDeltaFrom, {row, col});
        canMakeMove = false; // to prevent making another move
        deltaFromSet = false;
        gameService.makeMove(move);
        console.log("made move to: ", row, col);
      }
    //} catch (e) {
      //log.info(["Caught cell click error"]);
      //return;
    //}
  }

  export function shouldShowImage(row: number, col: number): string {
    let cell = state.board[row][col];
    //return cell.value !== 0;
    return getPiece(cell.value);
  }

  function getPiece(piece: number): string {
    return 'imgs/' + gameLogic.getPieceName(piece) + '.png';
  }
  /*export function shouldSlowlyAppear(row: number, col: number): boolean {
    return !animationEnded &&
        state.delta &&
        state.delta.row === row && state.delta.col === col;
  }*/
}

angular.module('myApp', ['ngTouch', 'ui.bootstrap', 'gameServices'])
  .run(function () {//.run(['initGameServices', function (initGameServices: any) {
  $rootScope['game'] = game;
  translate.setLanguage('en',  {
    RULES_OF_TICTACTOE: "Rules of TicTacToe",
    RULES_SLIDE1: "You and your opponent take turns to mark the grid in an empty spot. The first mark is X, then O, then X, then O, etc.",
    RULES_SLIDE2: "The first to mark a whole row, column or diagonal wins.",
    CLOSE: "Close"
  });
  game.init();
});//]
