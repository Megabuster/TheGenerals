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
  let lastUpdateUI: IUpdateUI = null;
  let deltaFromSet: boolean = false;
  let currentDeltaFrom: BoardDelta = {row: -1, col: -1};
  let currentDeltaTo: BoardDelta = {row: -1, col: -1};
  export let currentPlayMode: string|number = "";
  export let isHelpModalShown: boolean = false;
  let lastMovedPiece: HTMLElement;

  var draggingPiece: HTMLElement;
  var startingLocation: HTMLElement;
  let gameArea: HTMLElement;
  let draggingLines: HTMLElement;
  let verticalDraggingLine: HTMLElement;
  let horizontalDraggingLine: HTMLElement;
  let draggingStartedRowCol: BoardDelta = { row: -1, col: -1 };
  var nextZIndex = 29;
  let invertRow: boolean = false;
  let possibleMoves: HTMLElement[];
  export let yourPlayerIndex: number;

  interface WidthHeight {
    width: number;
    height: number;
  }

  interface TopLeft {
    top: number;
    left: number;
  }

  export function init() {
    console.log("Translation of 'RULES_OF_GENERALS' is " + translate('RULES_OF_GENERALS'));
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
    dragAndDropService.addDragListener("gameArea", handleDragEvent);
  }
  export function handleDragEvent(type: string, clientX: number, clientY: number) {
    gameArea = document.getElementById("gameArea");
    draggingLines = document.getElementById("draggingLines");
    verticalDraggingLine = document.getElementById("verticalDraggingLine");
    horizontalDraggingLine = document.getElementById("horizontalDraggingLine");
        // Center point in gameArea
        var x = clientX - gameArea.offsetLeft;
        var y = clientY - gameArea.offsetTop;
        var col = Math.floor(gameLogic.COLS * x / gameArea.clientWidth);
        var row = Math.floor(gameLogic.ROWS * y / gameArea.clientHeight);

        // Is outside gameArea?
        let rowInvert: number;
        let colInvert: number;
        if (x < 0 || y < 0 || x >= gameArea.clientWidth || y >= gameArea.clientHeight) {
          draggingLines.style.display = "none";
          if (draggingPiece) {
            // Drag the piece where the touch is (without snapping to a square).
            var size = getSquareWidthHeight();
            setDraggingPieceTopLeft({top: y - size.height / 2, left: x - size.width / 2});
          } else {
            return;
          }
        } else {
          // Inside gameArea. Let's find the containing square's row and col
            //draggingLines.style.display = "inline";

            if(invertRow === true) {
              rowInvert = gameLogic.ROWS - row - 1;
              colInvert = gameLogic.COLS - col - 1;
            }
            else {
              rowInvert = row;
              colInvert = col;
            }

            console.log("Rows and cols of current orientation", rowInvert, colInvert);
            var centerXY: WidthHeight = getSquareCenterXY(rowInvert, colInvert);
            verticalDraggingLine.setAttribute("x1", centerXY.width.toString());
            verticalDraggingLine.setAttribute("x2", centerXY.width.toString());
            horizontalDraggingLine.setAttribute("y1", centerXY.height.toString());
            horizontalDraggingLine.setAttribute("y2", centerXY.height.toString());
            //console.log(type, currentDeltaFrom);

            if (type === "touchstart" && (currentDeltaFrom.col < 0 || currentDeltaFrom.row < 0)) {
              // drag started, use the current delta from to start (the drag start location)

              currentDeltaFrom = { row: row, col: col };
              var curPiece = state.board[rowInvert][colInvert];
              draggingPiece = document.getElementById(rowInvert + '_' + colInvert);
              console.log("Lifting", curPiece.name, "at", JSON.stringify(currentDeltaFrom), "turn", turnIndex);

              if (draggingPiece && curPiece.name != "EMP" &&
              ((curPiece.color !="black"&& turnIndex == 0) || curPiece.color !="white"&& turnIndex == 1)) {
                nextZIndex++;
              draggingPiece.style.zIndex = ++nextZIndex + "";
              draggingPiece.style['width'] = '110%';
              draggingPiece.style['height'] = '110%';
              draggingPiece.style['position'] = 'absolute';
              draggingLines.style.display = "inline";
              console.log(draggingPiece.style.zIndex);
            }

            possibleMoves = gameLogic.getLegalMoves(state.board, turnIndex, rowInvert, colInvert);
            for (var i = 0; i < possibleMoves.length; i++) {
              possibleMoves[i].style['border'] = "5px solid #99FF33";
            }
          }

          if (!draggingPiece) {
            draggingLines.style.display = "none";
            console.log("what does this even mean");
            return;
          }
        }

        if (type === "touchend" || type === "touchcancel" || type === "touchleave" || type === "mouseup") {
          // drag ended
          // return the piece to its original style (then angular will take care to hide it).
          for (var i = 0; i < possibleMoves.length; i++) {
            possibleMoves[i].style['border'] = null;
            //console.log("null it all");
          }
          possibleMoves = [];
          console.log("let go of dragging piece, checking where it was placed");
          setDraggingPieceTopLeft(getSquareTopLeft(currentDeltaFrom.row, currentDeltaFrom.col));
          nextZIndex = 29;
          lastMovedPiece = draggingPiece;
          draggingPiece.style.zIndex = 29 + "";
          currentDeltaTo = { row: row, col: col };
          //console.log(draggingPiece.style.zIndex, draggingLines.style.zIndex);
          draggingLines.style.display = "none";
          draggingPiece.style['width'] = '100%';
          draggingPiece.style['height'] = '100%';
          draggingPiece.style['position'] = 'absolute';

          //draggingPiece.style.display = "none";

          dragDone(currentDeltaFrom, currentDeltaTo);
          draggingPiece = null;
          currentDeltaFrom = {row: -1, col: -1};
          currentDeltaTo = {row: -1, col: -1};
          console.log("End of touch phase");
        }
        else {
          //setDraggingPieceTopLeft(getSquareTopLeft(row, col));
          //centerXY = getSquareCenterXY(rowInvert, colInvert);
        }
      }
      function setDraggingPieceTopLeft(topLeft: TopLeft) {
        var originalSize = getSquareTopLeft(currentDeltaFrom.row, currentDeltaFrom.col);
        //startingLocation = draggingPiece;
        draggingPiece.style.left = (topLeft.left - originalSize.left) + "px";
        draggingPiece.style.top = (topLeft.top - originalSize.top) + "px";
        //startingLocation.className = "EMP";
        //state.board[currentDeltaFrom.row][currentDeltaFrom.col].name = "EMP";
        //draggingPiece.style.animation = "lightgray";
        //draggingPiece.className = "EMP";
      }
      function getSquareWidthHeight() : WidthHeight {
        return {
          width: gameArea.clientWidth / gameLogic.COLS,
          height: gameArea.clientHeight / gameLogic.ROWS
        };
      }
      function getSquareTopLeft(row: number, col: number) {
        var size = getSquareWidthHeight();
        if(invertRow === true) {
          row = gameLogic.ROWS - row - 1;
          col = gameLogic.COLS - col - 1;
        }
        return {top: row * size.height, left: col * size.width}
      }
      function getSquareCenterXY(row: number, col: number) : WidthHeight {
        var size = getSquareWidthHeight();
        return {
          width: col * size.width + size.width / 2,
          height: row * size.height + size.height / 2
        };
      }
      //resizeGameAreaService.setWidthToHeight(0.5);
      function dragDone(from: BoardDelta, to: BoardDelta) {
        $rootScope.$apply(function () {
          var msg = "Dragged piece " + from.row + "x" + from.col + " to square " + to.row + "x" + to.col;
          log.info(msg);
        });

        if(invertRow === true) {
          from.row = gameLogic.ROWS - from.row - 1;
          from.col = gameLogic.COLS - from.col - 1;
          to.row = gameLogic.ROWS - to.row - 1;
          to.col = gameLogic.COLS - to.col - 1;
        }
        try {
          console.log("Attempting to create move after touch has ended");
          console.log(JSON.stringify(state.board));
          let move = gameLogic.createMove(state.board, lastUpdateUI.turnIndexAfterMove, from, to);
          canMakeMove = false;

          gameService.makeMove(move);
          //console.log(JSON.stringify(state.board));
          log.info(["Make movement from" + from.row + "*" + from.col + " to " + to.row + "*" + to.col]);
        } catch (e) {
          log.info(["Illegal movement from" + from.row + "*" + from.col + " to " + to.row + "*" + to.col]);
          return;
        }
      }
  //The oddity of this code has to do with how this is being called to turn the board
  export function playerTurn() : boolean {
    if(currentPlayMode)
    return true; //white or 0
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
    console.log("Computer making move");
    gameService.makeMove(
        aiService.findComputerMove(lastUpdateUI));
  }

  function updateUI(params: IUpdateUI): void {
    log.info("Calling updateUI:", params);
    animationEnded = false;
    lastUpdateUI = params;
    state = params.stateAfterMove;
    yourPlayerIndex = params.yourPlayerIndex;

    currentPlayMode = params.playMode;

    if(params.turnIndexAfterMove<0) {
      revealPiecesEndGame(state.board);
    }

    if (!state.board) {
      state.board = gameLogic.getInitialBoard();
      let move = gameLogic.getInitialMove(state.board);
    }

    rotateGameBoard(params);

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
  function rotateGameBoard(params: IUpdateUI){
    console.log(currentPlayMode);
    //if(params.playersInfo[params.yourPlayerIndex].playerId === '') return;
    if (params.playMode !== "playAgainstTheComputer"){
      let gameBoard = document.getElementById("gameArea");
      switch (params.yourPlayerIndex){
        case 0 : console.log("White player"); gameBoard.className = "rotateW"; invertRow = false;
        for(var i = 0; i < gameLogic.ROWS; i++) {
          for(var j = 0; j < gameLogic.COLS; j++) {
            let draggingPiece = document.getElementById(i + '_' + j);
            let curPiece: piece = params.stateAfterMove.board[i][j];
            draggingPiece.className = "";
              /*if(curPiece.color != "black") {
                draggingPiece.className = "";
              }
              else {
                draggingPiece.className = "TFL";
              }*/
          }
        }break;
        case 1 : console.log("Black player"); gameBoard.className = "rotateB"; invertRow = true;
        for(var i = 0; i < gameLogic.ROWS; i++) {
          for(var j = 0; j < gameLogic.COLS; j++) {
            let draggingPiece = document.getElementById(i + '_' + j);
            let curPiece: piece = params.stateAfterMove.board[i][j];
            if(curPiece.color === "black") {
              draggingPiece.className = "TFL";
            }
          }
        }
        break;
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
    return true;/*
    let possibleMoves: IMove[] = gameLogic.getMovesForPiece(state.board, playerId, row, col);
    if (possibleMoves.length == 0){
      console.log("You have nowhere to move that piece");
      return false;
    }
    console.log("You can move the piece from ", row, col, "player ", playerId);
    return true;*/
  }
  export function cellClicked(row: number, col: number): void {
    log.info(["Clicked on cell:", row, col]);
    if (window.location.search === '?throwException') { // to test encoding a stack trace with sourcemap
      throw new Error("Throwing the error because URL has '?throwException'");
    }
    if (!canMakeMove) {
      return;
    }
    //gameLogic.showBoardConsole(state.board);
    try {
      console.log("About to decide on cell click - delta and is it my piece?", deltaFromSet, myPiece(row, col, turnIndex));
      if(deltaFromSet===false&&myPiece(row, col, turnIndex)==true) {//&&myPiece(row, col, turnIndex)==true
        console.log("Able to make move from location");
        currentDeltaFrom.row = row;
        currentDeltaFrom.col = col;
        deltaFromSet = true;
        return;
      }
      else if(deltaFromSet===true){
        if(currentDeltaFrom.row === row && currentDeltaFrom.col === col) {
          //this means that we clicked on the same piece again (negate the last click to allow for a new choice)
          deltaFromSet = false;
          currentDeltaFrom.row = -1;
          currentDeltaFrom.col = -1;
          return;
        }
        else {
          console.log("deltaFrom is currently: ", currentDeltaFrom.row, currentDeltaFrom.col, " with turn index ", turnIndex);
          let move = gameLogic.createMove(state.board, lastUpdateUI.turnIndexAfterMove, currentDeltaFrom, {row, col});
          canMakeMove = false; // to prevent making another move
          deltaFromSet = false;
          gameService.makeMove(move);
          console.log("made move to: ", row, col);
          return;
        }
      }
      else {
        console.log("erroneous cell click result");
        return;
      }
    } catch (e) {
      log.info(["Caught cell click error"]);
      return;
    }
  }
  export function shouldShowImage(row: number, col: number): boolean {
      let cell = state.board[row][col];
      return cell.name !== "";
    }
  export function showImage(row: number, col: number, playerIndex: number): string{
    let cell = state.board[row][col];
    let imageValue: number = cell.value;
    let gameBoard = document.getElementById("gameArea");
    let draggingPiece = document.getElementById(row + '_' + col);
    /*if (currentPlayMode==="playAgainstTheComputer") {
      if(cell.color === "black") {
        return getPiece(32);
      }
      else if(cell.color === "white" && playerIndex === 0) {
        //return getPiece(31);
      }
    }*/
    if(turnIndex === 0 ||(currentPlayMode==="playAgainstTheComputer")) { //white's turn or cpu game = keep black's pieces hidden
      if(cell.color === "black") {
        //code for black pieces
        //draggingPiece.className = "black";
        imageValue = 32;
      }
    }
    else if(turnIndex === 1 && cell.color === "white") {
          //code for white pieces
          //draggingPiece.className = "white";
          imageValue = 31;

    }
    //console.log("My index is", playerIndex);
    /*if (currentPlayMode==="playAgainstTheComputer") {
      if(playerIndex === 1) {
        imageValue = 31;
      }
      else if (playerIndex === 0){
        imageValue = 32;
      }
    }
    else*/ /*if(playerIndex === 0) { //white's turn or cpu game = keep black's pieces hidden
      if(cell.color === "black") {
        //code for black pieces
        //draggingPiece.className = "black";
        imageValue = 32;
      }
    }
    else if(playerIndex === 1 && cell.color === "white") {
          //code for white pieces
          //draggingPiece.className = "white";
          imageValue = 31;

    }*/
    /*if(invertRow === true && cell.value >=16 && cell.value <=30) { //black's turn, so make active pieces black
      draggingPiece.className = "TFL";
      //draggingPiece.className = "invert";
    }*/
    return getPiece(imageValue);
  }

  export function revealPiecesEndGame(board: Board) {
    for(var i = 0; i < gameLogic.ROWS; i++) {
      for(var j = 0; j < gameLogic.COLS; j++) {
        let draggingPiece = document.getElementById(i + '_' + j);
        let curPiece: piece = board[i][j];
        if(curPiece.color === "black") {
          if(currentPlayMode == "playAgainstTheComputer") {
            draggingPiece.className = getPieceByPosition(i, j);
            //console.log(draggingPiece.className);
          }
          else {
            draggingPiece.className = "TFL";
          }
        }
      }
    }
  }
  function getPiece(piece: number): string {
    //return gameLogic.getPieceName(piece);
    if(piece >= 16 && piece <= 30) {
      piece-=15;
    }
    return 'imgs/' + gameLogic.getPieceName(piece) + '.png';
  }
  function getPieceByPosition(row: number, col: number): string {
    return gameLogic.getPieceName(state.board[row][col].value);
  }
  export function shouldSlowlyAppear(row: number, col: number): boolean {
    return !animationEnded &&
        state.delta &&
        state.delta.row === row && state.delta.col === col;
  }
}

angular.module('myApp', ['ngTouch', 'ui.bootstrap', 'gameServices'])
  .run(function () {//.run(['initGameServices', function (initGameServices: any) {
  $rootScope['game'] = game;
  translate.setLanguage('en',  {
    RULES_OF_GENERALS: "Rules of Game of The Generals",
    RULES_SLIDE1: "Start with a field of arbitrarily placed pieces.",
    RULES_SLIDE2: "During your turn, you can move any piece one step vertically or horizontally.",
    RULES_SLIDE3: "Take the enemy flag (without knowing which piece it is) before losing yours.",
    RULES_SLIDE4: "Alternatively, send your own flag to the enemy backrow and win if it survives one turn. Be careful since all pieces can kill a flag, including an attacking flag.",
    RULES_SLIDE5: "Spies are stronger than all other pieces, but is the only piece besides the flag that loses to the private. Starred pieces (generals) are otherwise the strongest, going downwards by total stars.",
    CLOSE: "Close"
  });
  game.init();
});//]
