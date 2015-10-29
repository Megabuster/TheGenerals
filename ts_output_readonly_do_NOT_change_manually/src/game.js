var game;
(function (game) {
    var animationEnded = false;
    var canMakeMove = false;
    var isComputerTurn = false;
    var state = null;
    var turnIndex = null;
    game.deltaFromSet = false;
    game.currentDeltaFrom = { row: 0, col: 0 };
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
        gameService.makeMove(aiService.createComputerMove(state.board, turnIndex, { maxDepth: 1 }));
    }
    function updateUI(params) {
        animationEnded = false;
        state = params.stateAfterMove;
        //$rootScope.state = state;
        console.log("test updateUI");
        if (!state.board) {
            console.log("test appear once");
            state.board = gameLogic.getInitialBoard();
        }
        gameLogic.showBoardConsole(state.board);
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
        var possibleMoves = gameLogic.getPossibleMoves(state.board, playerId);
        if (possibleMoves.length == 0) {
            console.log("You have nowhere to move that piece");
            return false;
        }
        console.log("You can move the piece from ", row, col, "player ", playerId);
        return true;
    }
    function cellClicked(row, col) {
        log.info(["Clicked on cell:", row, col]);
        if (window.location.search === '?throwException') {
            throw new Error("Throwing the error because URL has '?throwException'");
        }
        if (!canMakeMove) {
            return;
        }
        //try {
        if (game.deltaFromSet === false && myPiece(row, col, turnIndex) == true) {
            console.log("Able to make move from location");
            game.currentDeltaFrom.row = row;
            game.currentDeltaFrom.col = col;
            game.deltaFromSet = true;
        }
        else if (game.deltaFromSet === true) {
            console.log("deltaFrom is currently: ", game.currentDeltaFrom.row, game.currentDeltaFrom.col);
            var move = gameLogic.createMove(state.board, turnIndex, game.currentDeltaFrom, { row: row, col: col });
            canMakeMove = false; // to prevent making another move
            game.deltaFromSet = false;
            gameService.makeMove(move);
            console.log("made move to: ", row, col);
        }
        //} catch (e) {
        //log.info(["Caught cell click error"]);
        //return;
        //}
    }
    game.cellClicked = cellClicked;
    function shouldShowImage(row, col) {
        var cell = state.board[row][col];
        //return cell.value !== 0;
        return getPiece(cell.value);
    }
    game.shouldShowImage = shouldShowImage;
    function getPiece(piece) {
        return 'imgs/' + gameLogic.getPieceName(piece) + '.png';
    }
})(game || (game = {}));
angular.module('myApp', ['ngTouch', 'ui.bootstrap', 'gameServices'])
    .run(function () {
    $rootScope['game'] = game;
    translate.setLanguage('en', {
        RULES_OF_TICTACTOE: "Rules of TicTacToe",
        RULES_SLIDE1: "You and your opponent take turns to mark the grid in an empty spot. The first mark is X, then O, then X, then O, etc.",
        RULES_SLIDE2: "The first to mark a whole row, column or diagonal wins.",
        CLOSE: "Close"
    });
    game.init();
}); //]
