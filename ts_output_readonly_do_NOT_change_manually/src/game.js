var game;
(function (game) {
    var animationEnded = false;
    var canMakeMove = false;
    var isComputerTurn = false;
    var state = null;
    var turnIndex = null;
    var lastUpdateUI = null;
    var deltaFromSet = false;
    var currentDeltaFrom = { row: -1, col: -1 };
    var currentDeltaTo = { row: -1, col: -1 };
    game.currentPlayMode = "";
    game.isHelpModalShown = false;
    var lastMovedPiece;
    var draggingPiece;
    var startingLocation;
    var gameArea;
    var draggingLines;
    var verticalDraggingLine;
    var horizontalDraggingLine;
    var draggingStartedRowCol = { row: -1, col: -1 };
    var nextZIndex = 29;
    var invertRow = false;
    var possibleMoves;
    function init() {
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
    game.init = init;
    function handleDragEvent(type, clientX, clientY) {
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
        var rowInvert;
        var colInvert;
        if (x < 0 || y < 0 || x >= gameArea.clientWidth || y >= gameArea.clientHeight) {
            draggingLines.style.display = "none";
            if (draggingPiece) {
                // Drag the piece where the touch is (without snapping to a square).
                var size = getSquareWidthHeight();
                setDraggingPieceTopLeft({ top: y - size.height / 2, left: x - size.width / 2 });
            }
            else {
                return;
            }
        }
        else {
            // Inside gameArea. Let's find the containing square's row and col
            //draggingLines.style.display = "inline";
            if (invertRow === true) {
                rowInvert = gameLogic.ROWS - row - 1;
                colInvert = gameLogic.COLS - col - 1;
            }
            else {
                rowInvert = row;
                colInvert = col;
            }
            console.log("Rows and cols of current orientation", rowInvert, colInvert);
            var centerXY = getSquareCenterXY(rowInvert, colInvert);
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
                    ((curPiece.color != "black" && turnIndex == 0) || curPiece.color != "white" && turnIndex == 1)) {
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
            currentDeltaFrom = { row: -1, col: -1 };
            currentDeltaTo = { row: -1, col: -1 };
            console.log("End of touch phase");
        }
        else {
        }
    }
    game.handleDragEvent = handleDragEvent;
    function setDraggingPieceTopLeft(topLeft) {
        var originalSize = getSquareTopLeft(currentDeltaFrom.row, currentDeltaFrom.col);
        //startingLocation = draggingPiece;
        draggingPiece.style.left = (topLeft.left - originalSize.left) + "px";
        draggingPiece.style.top = (topLeft.top - originalSize.top) + "px";
        //startingLocation.className = "EMP";
        //state.board[currentDeltaFrom.row][currentDeltaFrom.col].name = "EMP";
        //draggingPiece.style.animation = "lightgray";
        //draggingPiece.className = "EMP";
    }
    function getSquareWidthHeight() {
        return {
            width: gameArea.clientWidth / gameLogic.COLS,
            height: gameArea.clientHeight / gameLogic.ROWS
        };
    }
    function getSquareTopLeft(row, col) {
        var size = getSquareWidthHeight();
        if (invertRow === true) {
            row = gameLogic.ROWS - row - 1;
            col = gameLogic.COLS - col - 1;
        }
        return { top: row * size.height, left: col * size.width };
    }
    function getSquareCenterXY(row, col) {
        var size = getSquareWidthHeight();
        return {
            width: col * size.width + size.width / 2,
            height: row * size.height + size.height / 2
        };
    }
    //resizeGameAreaService.setWidthToHeight(0.5);
    function dragDone(from, to) {
        $rootScope.$apply(function () {
            var msg = "Dragged piece " + from.row + "x" + from.col + " to square " + to.row + "x" + to.col;
            log.info(msg);
        });
        if (invertRow === true) {
            from.row = gameLogic.ROWS - from.row - 1;
            from.col = gameLogic.COLS - from.col - 1;
            to.row = gameLogic.ROWS - to.row - 1;
            to.col = gameLogic.COLS - to.col - 1;
        }
        try {
            console.log("Attempting to create move after touch has ended");
            console.log(JSON.stringify(state.board));
            var move = gameLogic.createMove(state.board, lastUpdateUI.turnIndexAfterMove, from, to);
            canMakeMove = false;
            gameService.makeMove(move);
            //console.log(JSON.stringify(state.board));
            log.info(["Make movement from" + from.row + "*" + from.col + " to " + to.row + "*" + to.col]);
        }
        catch (e) {
            log.info(["Illegal movement from" + from.row + "*" + from.col + " to " + to.row + "*" + to.col]);
            return;
        }
    }
    //The oddity of this code has to do with how this is being called to turn the board
    function playerTurn() {
        if (game.currentPlayMode)
            return true; //white or 0
    }
    game.playerTurn = playerTurn;
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
        gameService.makeMove(aiService.findComputerMove(lastUpdateUI));
    }
    function updateUI(params) {
        log.info("Calling updateUI:", params);
        animationEnded = false;
        lastUpdateUI = params;
        state = params.stateAfterMove;
        game.yourPlayerIndex = params.yourPlayerIndex;
        game.currentPlayMode = params.playMode;
        if (params.turnIndexAfterMove < 0) {
            revealPiecesEndGame(state.board);
        }
        if (!state.board) {
            state.board = gameLogic.getInitialBoard();
            var move = gameLogic.getInitialMove(state.board);
        }
        rotateGameBoard(params);
        canMakeMove = params.turnIndexAfterMove >= 0 &&
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
    function rotateGameBoard(params) {
        console.log(game.currentPlayMode);
        //if(params.playersInfo[params.yourPlayerIndex].playerId === '') return;
        if (params.playMode !== "playAgainstTheComputer") {
            var gameBoard = document.getElementById("gameArea");
            switch (params.yourPlayerIndex) {
                case 0:
                    console.log("White player");
                    gameBoard.className = "rotateW";
                    invertRow = false;
                    for (var i = 0; i < gameLogic.ROWS; i++) {
                        for (var j = 0; j < gameLogic.COLS; j++) {
                            var draggingPiece_1 = document.getElementById(i + '_' + j);
                            var curPiece = params.stateAfterMove.board[i][j];
                            draggingPiece_1.className = "";
                        }
                    }
                    break;
                case 1:
                    console.log("Black player");
                    gameBoard.className = "rotateB";
                    invertRow = true;
                    for (var i = 0; i < gameLogic.ROWS; i++) {
                        for (var j = 0; j < gameLogic.COLS; j++) {
                            var draggingPiece_2 = document.getElementById(i + '_' + j);
                            var curPiece = params.stateAfterMove.board[i][j];
                            if (curPiece.color === "black") {
                                draggingPiece_2.className = "TFL";
                            }
                        }
                    }
                    break;
            }
        }
    }
    function myPiece(row, col, playerId) {
        var myColor = " ";
        if (playerId === 0) {
            myColor = "white";
        }
        else if (playerId === 1) {
            myColor = "black";
        }
        else {
            console.log("Illegal player ID");
        }
        if (state.board[row][col].color !== myColor) {
            console.log("Not your piece to move");
            return false;
        }
        return true; /*
        let possibleMoves: IMove[] = gameLogic.getMovesForPiece(state.board, playerId, row, col);
        if (possibleMoves.length == 0){
          console.log("You have nowhere to move that piece");
          return false;
        }
        console.log("You can move the piece from ", row, col, "player ", playerId);
        return true;*/
    }
    function cellClicked(row, col) {
        log.info(["Clicked on cell:", row, col]);
        if (window.location.search === '?throwException') {
            throw new Error("Throwing the error because URL has '?throwException'");
        }
        if (!canMakeMove) {
            return;
        }
        //gameLogic.showBoardConsole(state.board);
        try {
            console.log("About to decide on cell click - delta and is it my piece?", deltaFromSet, myPiece(row, col, turnIndex));
            if (deltaFromSet === false && myPiece(row, col, turnIndex) == true) {
                console.log("Able to make move from location");
                currentDeltaFrom.row = row;
                currentDeltaFrom.col = col;
                deltaFromSet = true;
                return;
            }
            else if (deltaFromSet === true) {
                if (currentDeltaFrom.row === row && currentDeltaFrom.col === col) {
                    //this means that we clicked on the same piece again (negate the last click to allow for a new choice)
                    deltaFromSet = false;
                    currentDeltaFrom.row = -1;
                    currentDeltaFrom.col = -1;
                    return;
                }
                else {
                    console.log("deltaFrom is currently: ", currentDeltaFrom.row, currentDeltaFrom.col, " with turn index ", turnIndex);
                    var move = gameLogic.createMove(state.board, lastUpdateUI.turnIndexAfterMove, currentDeltaFrom, { row: row, col: col });
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
        }
        catch (e) {
            log.info(["Caught cell click error"]);
            return;
        }
    }
    game.cellClicked = cellClicked;
    function shouldShowImage(row, col) {
        var cell = state.board[row][col];
        return cell.name !== "";
    }
    game.shouldShowImage = shouldShowImage;
    function showImage(row, col, playerIndex) {
        var cell = state.board[row][col];
        var imageValue = cell.value;
        var gameBoard = document.getElementById("gameArea");
        var draggingPiece = document.getElementById(row + '_' + col);
        /*if (currentPlayMode==="playAgainstTheComputer") {
          if(cell.color === "black") {
            return getPiece(32);
          }
          else if(cell.color === "white" && playerIndex === 0) {
            //return getPiece(31);
          }
        }*/
        if (turnIndex === 0 || (game.currentPlayMode === "playAgainstTheComputer")) {
            if (cell.color === "black") {
                //code for black pieces
                //draggingPiece.className = "black";
                imageValue = 32;
            }
        }
        else if (turnIndex === 1 && cell.color === "white") {
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
    game.showImage = showImage;
    function revealPiecesEndGame(board) {
        for (var i = 0; i < gameLogic.ROWS; i++) {
            for (var j = 0; j < gameLogic.COLS; j++) {
                var draggingPiece_3 = document.getElementById(i + '_' + j);
                var curPiece = board[i][j];
                if (curPiece.color === "black") {
                    if (game.currentPlayMode == "playAgainstTheComputer") {
                        draggingPiece_3.className = getPieceByPosition(i, j);
                    }
                    else {
                        draggingPiece_3.className = "TFL";
                    }
                }
            }
        }
    }
    game.revealPiecesEndGame = revealPiecesEndGame;
    function getPiece(piece) {
        //return gameLogic.getPieceName(piece);
        if (piece >= 16 && piece <= 30) {
            piece -= 15;
        }
        return 'imgs/' + gameLogic.getPieceName(piece) + '.png';
    }
    function getPieceByPosition(row, col) {
        return gameLogic.getPieceName(state.board[row][col].value);
    }
    function shouldSlowlyAppear(row, col) {
        return !animationEnded &&
            state.delta &&
            state.delta.row === row && state.delta.col === col;
    }
    game.shouldSlowlyAppear = shouldSlowlyAppear;
})(game || (game = {}));
angular.module('myApp', ['ngTouch', 'ui.bootstrap', 'gameServices'])
    .run(function () {
    $rootScope['game'] = game;
    translate.setLanguage('en', {
        RULES_OF_GENERALS: "Rules of Game of The Generals",
        RULES_SLIDE1: "Start with a field of arbitrarily placed pieces.",
        RULES_SLIDE2: "During your turn, you can move any piece one step vertically or horizontally.",
        RULES_SLIDE3: "Take the enemy flag (without knowing which piece it is) before losing yours.",
        RULES_SLIDE4: "Alternatively, send your own flag to the enemy backrow and win if it survives one turn. Be careful since all pieces can kill a flag, including an attacking flag.",
        RULES_SLIDE5: "Spies are stronger than all other pieces, but is the only piece besides the flag that loses to the private. Starred pieces (generals) are otherwise the strongest, going downwards by total stars.",
        CLOSE: "Close"
    });
    game.init();
}); //]
