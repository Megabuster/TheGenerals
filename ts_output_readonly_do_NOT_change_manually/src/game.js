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
    game.currentPlayMode = "";
    game.isHelpModalShown = false;
    function init() {
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
    game.init = init;
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
        gameService.makeMove(aiService.findComputerMove(lastUpdateUI));
    }
    function updateUI(params) {
        animationEnded = false;
        lastUpdateUI = params;
        state = params.stateAfterMove;
        game.currentPlayMode = params.playMode;
        //$rootScope.state = state;
        //console.log("test updateUI");
        if (!state.board) {
            state.board = gameLogic.getInitialBoard();
            console.log(JSON.stringify(state.board));
        }
        rotateGameBoard(params);
        /*if (!state.board && params.yourPlayerIndex === params.turnIndexAfterMove) {
              state.board = gameLogic.getInitialBoard();
              //let move = gameLogic.getInitialMove();
              //gameService.makeMove(move);
        }*/
        //gameLogic.showBoardConsole(state.board);
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
        if (params.playMode !== "single-player" && params.playMode !== "playAgainstTheComputer") {
            var gameBoard = document.getElementById("gameArea");
            switch (params.yourPlayerIndex) {
                case 0:
                    console.log("White player");
                    gameBoard.className = "rotateW";
                    break;
                case 1:
                    console.log("Black player");
                    gameBoard.className = "rotateB";
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
    function showImage(row, col) {
        var cell = state.board[row][col];
        var imageValue = cell.value;
        //return cell.value !== 0;
        if (turnIndex === 0 || game.currentPlayMode === "playAgainstTheComputer") {
            if (cell.color === "black") {
                //code for black pieces
                imageValue = 32;
            }
        }
        else {
            if (cell.color === "white") {
                //code for white pieces
                imageValue = 31;
            }
        }
        return getPiece(imageValue);
    }
    game.showImage = showImage;
    function getPiece(piece) {
        //return gameLogic.getPieceName(piece);
        return 'imgs/' + gameLogic.getPieceName(piece) + '.png';
    }
})(game || (game = {}));
angular.module('myApp', ['ngTouch', 'ui.bootstrap', 'gameServices'])
    .run(function () {
    $rootScope['game'] = game;
    translate.setLanguage('en', {
        RULES_OF_TICTACTOE: "Rules of The Generals",
        RULES_SLIDE1: "Start with a field of arbitrarily placed pieces.",
        RULES_SLIDE2: "During your turn, you can move any piece one step vertically or horizontally.",
        CLOSE: "Close"
    });
    game.init();
}); //]
