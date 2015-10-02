describe("In TheGenerals", function () {
    function expectMove(turnIndexBeforeMove, stateBeforeMove, move, isOk) {
        expect(gameLogic.isMoveOk({
            turnIndexBeforeMove: turnIndexBeforeMove,
            turnIndexAfterMove: null,
            stateBeforeMove: stateBeforeMove,
            stateAfterMove: null,
            move: move,
            numberOfPlayers: null })).toBe(isOk);
    }
    function expectMoveOk(turnIndexBeforeMove, stateBeforeMove, move) {
        expectMove(turnIndexBeforeMove, stateBeforeMove, move, true);
    }
    function expectIllegalMove(turnIndexBeforeMove, stateBeforeMove, move) {
        expectMove(turnIndexBeforeMove, stateBeforeMove, move, false);
    }
    function logDiffToConsole(o1, o2) {
        if (angular.equals(o1, o2))
            return;
        console.log("Found diff between: ", o1, o2);
        if (!angular.equals(Object.keys(o1), Object.keys(o2))) {
            console.log("Keys different: ", Object.keys(o1), Object.keys(o2));
        }
        /*for (var k in o1) {
          logDiffToConsole(o1, o2);
        }*/
    }
    it("perform forwards move from first row of initial state", function () {
        var board = gameLogic.getInitialBoard();
        var deltaFrom = { row: -1, col: -1 };
        var deltaTo = { row: -1, col: -1 };
        //deltaFrom = set:{row = -1, col = -1};
        for (var i = 5; i < 8 && deltaFrom.row === -1; i++) {
            for (var j = 0; j < 9 && deltaFrom.row === -1; j++) {
                if (board[i][j].color === "white") {
                    deltaFrom.row = i;
                    deltaFrom.col = j;
                    deltaTo.row = (i - 1);
                    deltaTo.col = deltaFrom.col;
                    console.log("Found white piece to move");
                }
            }
        }
        var boardAfterMove = angular.copy(board);
        console.log("to row", deltaTo.row);
        console.log("to col", deltaTo.col);
        console.log("from row", deltaFrom.row);
        console.log("from col", deltaFrom.col);
        boardAfterMove[deltaTo.row][deltaTo.col].value = board[deltaFrom.row][deltaFrom.col].value;
        boardAfterMove[deltaTo.row][deltaTo.col].name = board[deltaFrom.row][deltaFrom.col].name;
        boardAfterMove[deltaTo.row][deltaTo.col].color = board[deltaFrom.row][deltaFrom.col].color;
        //Once the piece has moved, remove its occurrence from the previous state
        boardAfterMove[deltaFrom.row][deltaFrom.col].color = "gray";
        boardAfterMove[deltaFrom.row][deltaFrom.col].name = "EMP";
        boardAfterMove[deltaFrom.row][deltaFrom.col].value = 0;
        //let blank: piece = {name: "EMP", color: "gray", value: 0};
        //logDiffToConsole(blank, boardAfterMove[deltaTo.row][deltaTo.col]);
        //console.log(deltaFrom.row, " ", deltaFrom.col)
        //console.log(deltaTo.row, " ", deltaTo.col)
        expectMoveOk(1, { board: board }, [{ setTurn: { turnIndex: 0 } },
            { set: { key: 'board', value: boardAfterMove } },
            { set: { key: 'deltaFrom', value: { row: deltaFrom.row, col: deltaFrom.col } } },
            { set: { key: 'deltaTo', value: { row: deltaTo.row, col: deltaTo.col } } }]);
    });
    it("placing white piece one step forwards is legal if nothing is there", function () {
        expectMoveOk(1, { board: [[{ value: 16, name: "BFL", color: "black" }, { value: 30, name: "BSP", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 27, name: "BS3", color: "black" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 20, name: "BL1", color: "black" }, { value: 25, name: "BS1", color: "black" }, { value: 22, name: "BMA", color: "black" }, { value: 29, name: "BS5", color: "black" }, { value: 21, name: "BCA", color: "black" }, { value: 18, name: "BSE", color: "black" }, { value: 26, name: "BS2", color: "black" }, { value: 28, name: "BS4", color: "black" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 19, name: "BL2", color: "black" }, { value: 24, name: "BCO", color: "black" }, { value: 23, name: "BLC", color: "black" }, { value: 30, name: "BSP", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 15, name: "WSP", color: "white" }, { value: 12, name: "WS3", color: "white" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 5, name: "WL1", color: "white" }, { value: 10, name: "WS1", color: "white" }, { value: 7, name: "WMA", color: "white" }, { value: 14, name: "WS5", color: "white" }, { value: 6, name: "WCA", color: "white" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 4, name: "WL2", color: "white" }, { value: 9, name: "WCO", color: "white" }, { value: 8, name: "WLC", color: "white" }, { value: 15, name: "WSP", color: "white" }, { value: 1, name: "WFL", color: "white" }, { value: 0, name: "EMP", color: "gray" }, { value: 3, name: "WSE", color: "white" }, { value: 11, name: "WS2", color: "white" }, { value: 13, name: "WS4", color: "white" }]] }, [{ setTurn: { turnIndex: 0 } },
            { set: { key: 'board', value: [[{ value: 16, name: "BFL", color: "black" }, { value: 30, name: "BSP", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 27, name: "BS3", color: "black" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 20, name: "BL1", color: "black" }, { value: 25, name: "BS1", color: "black" }, { value: 22, name: "BMA", color: "black" }, { value: 29, name: "BS5", color: "black" }, { value: 21, name: "BCA", color: "black" }, { value: 18, name: "BSE", color: "black" }, { value: 26, name: "BS2", color: "black" }, { value: 28, name: "BS4", color: "black" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 19, name: "BL2", color: "black" }, { value: 24, name: "BCO", color: "black" }, { value: 23, name: "BLC", color: "black" }, { value: 30, name: "BSP", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 2, name: "WPR", color: "white" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 0, name: "EMP", color: "gray" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 15, name: "WSP", color: "white" }, { value: 12, name: "WS3", color: "white" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 5, name: "WL1", color: "white" }, { value: 10, name: "WS1", color: "white" }, { value: 7, name: "WMA", color: "white" }, { value: 14, name: "WS5", color: "white" }, { value: 6, name: "WCA", color: "white" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 4, name: "WL2", color: "white" }, { value: 9, name: "WCO", color: "white" }, { value: 8, name: "WLC", color: "white" }, { value: 15, name: "WSP", color: "white" }, { value: 1, name: "WFL", color: "white" }, { value: 0, name: "EMP", color: "gray" }, { value: 3, name: "WSE", color: "white" }, { value: 11, name: "WS2", color: "white" }, { value: 13, name: "WS4", color: "white" }]] } },
            { set: { key: 'deltaFrom', value: { row: 5, col: 2 } } },
            { set: { key: 'deltaTo', value: { row: 4, col: 2 } } }]);
    });
    it("placing black piece one step forwards is legal if nothing is there", function () {
        expectMoveOk(0, { board: [[{ value: 16, name: "BFL", color: "black" }, { value: 30, name: "BSP", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 27, name: "BS3", color: "black" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 20, name: "BL1", color: "black" }, { value: 25, name: "BS1", color: "black" }, { value: 22, name: "BMA", color: "black" }, { value: 29, name: "BS5", color: "black" }, { value: 21, name: "BCA", color: "black" }, { value: 18, name: "BSE", color: "black" }, { value: 26, name: "BS2", color: "black" }, { value: 28, name: "BS4", color: "black" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 19, name: "BL2", color: "black" }, { value: 24, name: "BCO", color: "black" }, { value: 23, name: "BLC", color: "black" }, { value: 30, name: "BSP", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 15, name: "WSP", color: "white" }, { value: 12, name: "WS3", color: "white" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 5, name: "WL1", color: "white" }, { value: 10, name: "WS1", color: "white" }, { value: 7, name: "WMA", color: "white" }, { value: 14, name: "WS5", color: "white" }, { value: 6, name: "WCA", color: "white" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 4, name: "WL2", color: "white" }, { value: 9, name: "WCO", color: "white" }, { value: 8, name: "WLC", color: "white" }, { value: 15, name: "WSP", color: "white" }, { value: 1, name: "WFL", color: "white" }, { value: 0, name: "EMP", color: "gray" }, { value: 3, name: "WSE", color: "white" }, { value: 11, name: "WS2", color: "white" }, { value: 13, name: "WS4", color: "white" }]] }, [{ setTurn: { turnIndex: 1 } },
            { set: { key: 'board', value: [[{ value: 16, name: "BFL", color: "black" }, { value: 30, name: "BSP", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 27, name: "BS3", color: "black" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 20, name: "BL1", color: "black" }, { value: 25, name: "BS1", color: "black" }, { value: 22, name: "BMA", color: "black" }, { value: 29, name: "BS5", color: "black" }, { value: 21, name: "BCA", color: "black" }, { value: 18, name: "BSE", color: "black" }, { value: 26, name: "BS2", color: "black" }, { value: 28, name: "BS4", color: "black" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 24, name: "BCO", color: "black" }, { value: 23, name: "BLC", color: "black" }, { value: 30, name: "BSP", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 19, name: "BL2", color: "black" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 15, name: "WSP", color: "white" }, { value: 12, name: "WS3", color: "white" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 5, name: "WL1", color: "white" }, { value: 10, name: "WS1", color: "white" }, { value: 7, name: "WMA", color: "white" }, { value: 14, name: "WS5", color: "white" }, { value: 6, name: "WCA", color: "white" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 4, name: "WL2", color: "white" }, { value: 9, name: "WCO", color: "white" }, { value: 8, name: "WLC", color: "white" }, { value: 15, name: "WSP", color: "white" }, { value: 1, name: "WFL", color: "white" }, { value: 0, name: "EMP", color: "gray" }, { value: 3, name: "WSE", color: "white" }, { value: 11, name: "WS2", color: "white" }, { value: 13, name: "WS4", color: "white" }]] } },
            { set: { key: 'deltaFrom', value: { row: 2, col: 0 } } },
            { set: { key: 'deltaTo', value: { row: 3, col: 0 } } }]);
    });
    it("placing black piece two steps forwards is not legal", function () {
        expectIllegalMove(0, { board: [[{ value: 16, name: "BFL", color: "black" }, { value: 30, name: "BSP", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 27, name: "BS3", color: "black" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 20, name: "BL1", color: "black" }, { value: 25, name: "BS1", color: "black" }, { value: 22, name: "BMA", color: "black" }, { value: 29, name: "BS5", color: "black" }, { value: 21, name: "BCA", color: "black" }, { value: 18, name: "BSE", color: "black" }, { value: 26, name: "BS2", color: "black" }, { value: 28, name: "BS4", color: "black" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 19, name: "BL2", color: "black" }, { value: 24, name: "BCO", color: "black" }, { value: 23, name: "BLC", color: "black" }, { value: 30, name: "BSP", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 15, name: "WSP", color: "white" }, { value: 12, name: "WS3", color: "white" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 5, name: "WL1", color: "white" }, { value: 10, name: "WS1", color: "white" }, { value: 7, name: "WMA", color: "white" }, { value: 14, name: "WS5", color: "white" }, { value: 6, name: "WCA", color: "white" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 4, name: "WL2", color: "white" }, { value: 9, name: "WCO", color: "white" }, { value: 8, name: "WLC", color: "white" }, { value: 15, name: "WSP", color: "white" }, { value: 1, name: "WFL", color: "white" }, { value: 0, name: "EMP", color: "gray" }, { value: 3, name: "WSE", color: "white" }, { value: 11, name: "WS2", color: "white" }, { value: 13, name: "WS4", color: "white" }]] }, [{ setTurn: { turnIndex: 1 } },
            { set: { key: 'board', value: [[{ value: 16, name: "BFL", color: "black" }, { value: 30, name: "BSP", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 27, name: "BS3", color: "black" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 20, name: "BL1", color: "black" }, { value: 25, name: "BS1", color: "black" }, { value: 22, name: "BMA", color: "black" }, { value: 29, name: "BS5", color: "black" }, { value: 21, name: "BCA", color: "black" }, { value: 18, name: "BSE", color: "black" }, { value: 26, name: "BS2", color: "black" }, { value: 28, name: "BS4", color: "black" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 24, name: "BCO", color: "black" }, { value: 23, name: "BLC", color: "black" }, { value: 30, name: "BSP", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 19, name: "BL2", color: "black" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 15, name: "WSP", color: "white" }, { value: 12, name: "WS3", color: "white" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 5, name: "WL1", color: "white" }, { value: 10, name: "WS1", color: "white" }, { value: 7, name: "WMA", color: "white" }, { value: 14, name: "WS5", color: "white" }, { value: 6, name: "WCA", color: "white" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 4, name: "WL2", color: "white" }, { value: 9, name: "WCO", color: "white" }, { value: 8, name: "WLC", color: "white" }, { value: 15, name: "WSP", color: "white" }, { value: 1, name: "WFL", color: "white" }, { value: 0, name: "EMP", color: "gray" }, { value: 3, name: "WSE", color: "white" }, { value: 11, name: "WS2", color: "white" }, { value: 13, name: "WS4", color: "white" }]] } },
            { set: { key: 'deltaFrom', value: { row: 2, col: 0 } } },
            { set: { key: 'deltaTo', value: { row: 4, col: 0 } } }]);
    });
    it("placing black piece on black piece is not legal", function () {
        expectIllegalMove(0, { board: [[{ value: 16, name: "BFL", color: "black" }, { value: 30, name: "BSP", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 27, name: "BS3", color: "black" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 20, name: "BL1", color: "black" }, { value: 25, name: "BS1", color: "black" }, { value: 22, name: "BMA", color: "black" }, { value: 29, name: "BS5", color: "black" }, { value: 21, name: "BCA", color: "black" }, { value: 18, name: "BSE", color: "black" }, { value: 26, name: "BS2", color: "black" }, { value: 28, name: "BS4", color: "black" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 19, name: "BL2", color: "black" }, { value: 24, name: "BCO", color: "black" }, { value: 23, name: "BLC", color: "black" }, { value: 30, name: "BSP", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 15, name: "WSP", color: "white" }, { value: 12, name: "WS3", color: "white" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 5, name: "WL1", color: "white" }, { value: 10, name: "WS1", color: "white" }, { value: 7, name: "WMA", color: "white" }, { value: 14, name: "WS5", color: "white" }, { value: 6, name: "WCA", color: "white" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 4, name: "WL2", color: "white" }, { value: 9, name: "WCO", color: "white" }, { value: 8, name: "WLC", color: "white" }, { value: 15, name: "WSP", color: "white" }, { value: 1, name: "WFL", color: "white" }, { value: 0, name: "EMP", color: "gray" }, { value: 3, name: "WSE", color: "white" }, { value: 11, name: "WS2", color: "white" }, { value: 13, name: "WS4", color: "white" }]] }, [{ setTurn: { turnIndex: 1 } },
            { set: { key: 'board', value: [[{ value: 16, name: "BFL", color: "black" }, { value: 30, name: "BSP", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 27, name: "BS3", color: "black" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 20, name: "BL1", color: "black" }, { value: 25, name: "BS1", color: "black" }, { value: 22, name: "BMA", color: "black" }, { value: 29, name: "BS5", color: "black" }, { value: 21, name: "BCA", color: "black" }, { value: 18, name: "BSE", color: "black" }, { value: 26, name: "BS2", color: "black" }, { value: 28, name: "BS4", color: "black" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 19, name: "BL2", color: "black" }, { value: 23, name: "BLC", color: "black" }, { value: 30, name: "BSP", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 15, name: "WSP", color: "white" }, { value: 12, name: "WS3", color: "white" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 5, name: "WL1", color: "white" }, { value: 10, name: "WS1", color: "white" }, { value: 7, name: "WMA", color: "white" }, { value: 14, name: "WS5", color: "white" }, { value: 6, name: "WCA", color: "white" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 4, name: "WL2", color: "white" }, { value: 9, name: "WCO", color: "white" }, { value: 8, name: "WLC", color: "white" }, { value: 15, name: "WSP", color: "white" }, { value: 1, name: "WFL", color: "white" }, { value: 0, name: "EMP", color: "gray" }, { value: 3, name: "WSE", color: "white" }, { value: 11, name: "WS2", color: "white" }, { value: 13, name: "WS4", color: "white" }]] } },
            { set: { key: 'deltaFrom', value: { row: 2, col: 0 } } },
            { set: { key: 'deltaTo', value: { row: 2, col: 1 } } }]);
    });
    it("placing black piece eats weaker white piece", function () {
        expectMoveOk(0, { board: [[{ value: 16, name: "BFL", color: "black" }, { value: 30, name: "BSP", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 27, name: "BS3", color: "black" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 20, name: "BL1", color: "black" }, { value: 25, name: "BS1", color: "black" }, { value: 22, name: "BMA", color: "black" }, { value: 29, name: "BS5", color: "black" }, { value: 21, name: "BCA", color: "black" }, { value: 18, name: "BSE", color: "black" }, { value: 26, name: "BS2", color: "black" }, { value: 28, name: "BS4", color: "black" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 0, name: "EMP", color: "gray" }, { value: 24, name: "BCO", color: "black" }, { value: 23, name: "BLC", color: "black" }, { value: 30, name: "BSP", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 19, name: "BL2", color: "black" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 15, name: "WSP", color: "white" }, { value: 12, name: "WS3", color: "white" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 5, name: "WL1", color: "white" }, { value: 10, name: "WS1", color: "white" }, { value: 7, name: "WMA", color: "white" }, { value: 14, name: "WS5", color: "white" }, { value: 6, name: "WCA", color: "white" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 4, name: "WL2", color: "white" }, { value: 9, name: "WCO", color: "white" }, { value: 8, name: "WLC", color: "white" }, { value: 15, name: "WSP", color: "white" }, { value: 1, name: "WFL", color: "white" }, { value: 0, name: "EMP", color: "gray" }, { value: 3, name: "WSE", color: "white" }, { value: 11, name: "WS2", color: "white" }, { value: 13, name: "WS4", color: "white" }]] }, [{ setTurn: { turnIndex: 1 } },
            { set: { key: 'board', value: [[{ value: 16, name: "BFL", color: "black" }, { value: 30, name: "BSP", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 27, name: "BS3", color: "black" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 20, name: "BL1", color: "black" }, { value: 25, name: "BS1", color: "black" }, { value: 22, name: "BMA", color: "black" }, { value: 29, name: "BS5", color: "black" }, { value: 21, name: "BCA", color: "black" }, { value: 18, name: "BSE", color: "black" }, { value: 26, name: "BS2", color: "black" }, { value: 28, name: "BS4", color: "black" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 24, name: "BCO", color: "black" }, { value: 23, name: "BLC", color: "black" }, { value: 30, name: "BSP", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 19, name: "BL2", color: "black" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 15, name: "WSP", color: "white" }, { value: 12, name: "WS3", color: "white" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 5, name: "WL1", color: "white" }, { value: 10, name: "WS1", color: "white" }, { value: 7, name: "WMA", color: "white" }, { value: 14, name: "WS5", color: "white" }, { value: 6, name: "WCA", color: "white" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 4, name: "WL2", color: "white" }, { value: 9, name: "WCO", color: "white" }, { value: 8, name: "WLC", color: "white" }, { value: 15, name: "WSP", color: "white" }, { value: 1, name: "WFL", color: "white" }, { value: 0, name: "EMP", color: "gray" }, { value: 3, name: "WSE", color: "white" }, { value: 11, name: "WS2", color: "white" }, { value: 13, name: "WS4", color: "white" }]] } },
            { set: { key: 'deltaFrom', value: { row: 4, col: 0 } } },
            { set: { key: 'deltaTo', value: { row: 5, col: 0 } } }]);
    });
    it("white attacks black but loses", function () {
        expectMoveOk(1, { board: [[{ value: 16, name: "BFL", color: "black" }, { value: 30, name: "BSP", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 27, name: "BS3", color: "black" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 20, name: "BL1", color: "black" }, { value: 25, name: "BS1", color: "black" }, { value: 22, name: "BMA", color: "black" }, { value: 29, name: "BS5", color: "black" }, { value: 21, name: "BCA", color: "black" }, { value: 18, name: "BSE", color: "black" }, { value: 26, name: "BS2", color: "black" }, { value: 28, name: "BS4", color: "black" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 0, name: "EMP", color: "gray" }, { value: 24, name: "BCO", color: "black" }, { value: 23, name: "BLC", color: "black" }, { value: 30, name: "BSP", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 19, name: "BL2", color: "black" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 15, name: "WSP", color: "white" }, { value: 12, name: "WS3", color: "white" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 5, name: "WL1", color: "white" }, { value: 10, name: "WS1", color: "white" }, { value: 7, name: "WMA", color: "white" }, { value: 14, name: "WS5", color: "white" }, { value: 6, name: "WCA", color: "white" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 4, name: "WL2", color: "white" }, { value: 9, name: "WCO", color: "white" }, { value: 8, name: "WLC", color: "white" }, { value: 15, name: "WSP", color: "white" }, { value: 1, name: "WFL", color: "white" }, { value: 0, name: "EMP", color: "gray" }, { value: 3, name: "WSE", color: "white" }, { value: 11, name: "WS2", color: "white" }, { value: 13, name: "WS4", color: "white" }]] }, [{ setTurn: { turnIndex: 0 } },
            { set: { key: 'board', value: [[{ value: 16, name: "BFL", color: "black" }, { value: 30, name: "BSP", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 27, name: "BS3", color: "black" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 20, name: "BL1", color: "black" }, { value: 25, name: "BS1", color: "black" }, { value: 22, name: "BMA", color: "black" }, { value: 29, name: "BS5", color: "black" }, { value: 21, name: "BCA", color: "black" }, { value: 18, name: "BSE", color: "black" }, { value: 26, name: "BS2", color: "black" }, { value: 28, name: "BS4", color: "black" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 24, name: "BCO", color: "black" }, { value: 23, name: "BLC", color: "black" }, { value: 30, name: "BSP", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 19, name: "BL2", color: "black" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 15, name: "WSP", color: "white" }, { value: 12, name: "WS3", color: "white" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 5, name: "WL1", color: "white" }, { value: 10, name: "WS1", color: "white" }, { value: 7, name: "WMA", color: "white" }, { value: 14, name: "WS5", color: "white" }, { value: 6, name: "WCA", color: "white" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 4, name: "WL2", color: "white" }, { value: 9, name: "WCO", color: "white" }, { value: 8, name: "WLC", color: "white" }, { value: 15, name: "WSP", color: "white" }, { value: 1, name: "WFL", color: "white" }, { value: 0, name: "EMP", color: "gray" }, { value: 3, name: "WSE", color: "white" }, { value: 11, name: "WS2", color: "white" }, { value: 13, name: "WS4", color: "white" }]] } },
            { set: { key: 'deltaFrom', value: { row: 5, col: 0 } } },
            { set: { key: 'deltaTo', value: { row: 4, col: 0 } } }]);
    });
    it("white attacks black but ties", function () {
        expectMoveOk(1, { board: [[{ value: 16, name: "BFL", color: "black" }, { value: 30, name: "BSP", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 27, name: "BS3", color: "black" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 0, name: "EMP", color: "gray" }, { value: 25, name: "BS1", color: "black" }, { value: 22, name: "BMA", color: "black" }, { value: 29, name: "BS5", color: "black" }, { value: 21, name: "BCA", color: "black" }, { value: 18, name: "BSE", color: "black" }, { value: 26, name: "BS2", color: "black" }, { value: 28, name: "BS4", color: "black" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 0, name: "EMP", color: "gray" }, { value: 24, name: "BCO", color: "black" }, { value: 23, name: "BLC", color: "black" }, { value: 30, name: "BSP", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 17, name: "BPR", color: "black" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 15, name: "WSP", color: "white" }, { value: 12, name: "WS3", color: "white" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 0, name: "EMP", color: "gray" }, { value: 10, name: "WS1", color: "white" }, { value: 7, name: "WMA", color: "white" }, { value: 14, name: "WS5", color: "white" }, { value: 6, name: "WCA", color: "white" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 0, name: "EMP", color: "gray" }, { value: 9, name: "WCO", color: "white" }, { value: 8, name: "WLC", color: "white" }, { value: 15, name: "WSP", color: "white" }, { value: 1, name: "WFL", color: "white" }, { value: 0, name: "EMP", color: "gray" }, { value: 3, name: "WSE", color: "white" }, { value: 11, name: "WS2", color: "white" }, { value: 13, name: "WS4", color: "white" }]] }, [{ setTurn: { turnIndex: 0 } },
            { set: { key: 'board', value: [[{ value: 16, name: "BFL", color: "black" }, { value: 30, name: "BSP", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 27, name: "BS3", color: "black" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 25, name: "BS1", color: "black" }, { value: 22, name: "BMA", color: "black" }, { value: 29, name: "BS5", color: "black" }, { value: 21, name: "BCA", color: "black" }, { value: 18, name: "BSE", color: "black" }, { value: 26, name: "BS2", color: "black" }, { value: 28, name: "BS4", color: "black" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 24, name: "BCO", color: "black" }, { value: 23, name: "BLC", color: "black" }, { value: 30, name: "BSP", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 15, name: "WSP", color: "white" }, { value: 12, name: "WS3", color: "white" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 10, name: "WS1", color: "white" }, { value: 7, name: "WMA", color: "white" }, { value: 14, name: "WS5", color: "white" }, { value: 6, name: "WCA", color: "white" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 9, name: "WCO", color: "white" }, { value: 8, name: "WLC", color: "white" }, { value: 15, name: "WSP", color: "white" }, { value: 1, name: "WFL", color: "white" }, { value: 0, name: "EMP", color: "gray" }, { value: 3, name: "WSE", color: "white" }, { value: 11, name: "WS2", color: "white" }, { value: 13, name: "WS4", color: "white" }]] } },
            { set: { key: 'deltaFrom', value: { row: 5, col: 0 } } },
            { set: { key: 'deltaTo', value: { row: 4, col: 0 } } }]);
    });
    it("white attacks black flag to win", function () {
        expectMoveOk(1, { board: [[{ value: 16, name: "BFL", color: "black" }, { value: 30, name: "BSP", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 27, name: "BS3", color: "black" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 9, name: "WCO", color: "white" }, { value: 25, name: "BS1", color: "black" }, { value: 22, name: "BMA", color: "black" }, { value: 29, name: "BS5", color: "black" }, { value: 21, name: "BCA", color: "black" }, { value: 18, name: "BSE", color: "black" }, { value: 26, name: "BS2", color: "black" }, { value: 28, name: "BS4", color: "black" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 0, name: "EMP", color: "gray" }, { value: 24, name: "BCO", color: "black" }, { value: 23, name: "BLC", color: "black" }, { value: 30, name: "BSP", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 0, name: "EMP", color: "gray" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 15, name: "WSP", color: "white" }, { value: 12, name: "WS3", color: "white" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 0, name: "EMP", color: "gray" }, { value: 10, name: "WS1", color: "white" }, { value: 7, name: "WMA", color: "white" }, { value: 14, name: "WS5", color: "white" }, { value: 6, name: "WCA", color: "white" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 0, name: "EMP", color: "gray" }, { value: 9, name: "WCO", color: "white" }, { value: 8, name: "WLC", color: "white" }, { value: 15, name: "WSP", color: "white" }, { value: 1, name: "WFL", color: "white" }, { value: 0, name: "EMP", color: "gray" }, { value: 3, name: "WSE", color: "white" }, { value: 11, name: "WS2", color: "white" }, { value: 13, name: "WS4", color: "white" }]] }, [{ endMatch: { endMatchScores: [1, 0] } },
            { set: { key: 'board', value: [[{ value: 9, name: "WCO", color: "white" }, { value: 30, name: "BSP", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 27, name: "BS3", color: "black" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 25, name: "BS1", color: "black" }, { value: 22, name: "BMA", color: "black" }, { value: 29, name: "BS5", color: "black" }, { value: 21, name: "BCA", color: "black" }, { value: 18, name: "BSE", color: "black" }, { value: 26, name: "BS2", color: "black" }, { value: 28, name: "BS4", color: "black" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 24, name: "BCO", color: "black" }, { value: 23, name: "BLC", color: "black" }, { value: 30, name: "BSP", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 15, name: "WSP", color: "white" }, { value: 12, name: "WS3", color: "white" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 10, name: "WS1", color: "white" }, { value: 7, name: "WMA", color: "white" }, { value: 14, name: "WS5", color: "white" }, { value: 6, name: "WCA", color: "white" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 9, name: "WCO", color: "white" }, { value: 8, name: "WLC", color: "white" }, { value: 15, name: "WSP", color: "white" }, { value: 1, name: "WFL", color: "white" }, { value: 0, name: "EMP", color: "gray" }, { value: 3, name: "WSE", color: "white" }, { value: 11, name: "WS2", color: "white" }, { value: 13, name: "WS4", color: "white" }]] } },
            { set: { key: 'deltaFrom', value: { row: 1, col: 0 } } },
            { set: { key: 'deltaTo', value: { row: 0, col: 0 } } }]);
    });
    it("black one turn promotes for win", function () {
        expectMoveOk(1, { board: [[{ value: 0, name: "EMP", color: "gray" }, { value: 30, name: "BSP", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 27, name: "BS3", color: "black" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 9, name: "WCO", color: "white" }, { value: 25, name: "BS1", color: "black" }, { value: 22, name: "BMA", color: "black" }, { value: 29, name: "BS5", color: "black" }, { value: 21, name: "BCA", color: "black" }, { value: 18, name: "BSE", color: "black" }, { value: 26, name: "BS2", color: "black" }, { value: 28, name: "BS4", color: "black" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 0, name: "EMP", color: "gray" }, { value: 24, name: "BCO", color: "black" }, { value: 23, name: "BLC", color: "black" }, { value: 30, name: "BSP", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 0, name: "EMP", color: "gray" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 15, name: "WSP", color: "white" }, { value: 12, name: "WS3", color: "white" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 0, name: "EMP", color: "gray" }, { value: 10, name: "WS1", color: "white" }, { value: 7, name: "WMA", color: "white" }, { value: 14, name: "WS5", color: "white" }, { value: 6, name: "WCA", color: "white" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 16, name: "BFL", color: "black", promoted: true }, { value: 9, name: "WCO", color: "white" }, { value: 8, name: "WLC", color: "white" }, { value: 15, name: "WSP", color: "white" }, { value: 1, name: "WFL", color: "white" }, { value: 0, name: "EMP", color: "gray" }, { value: 3, name: "WSE", color: "white" }, { value: 11, name: "WS2", color: "white" }, { value: 13, name: "WS4", color: "white" }]] }, [{ endMatch: { endMatchScores: [0, 1] } },
            { set: { key: 'board', value: [[{ value: 9, name: "WCO", color: "white" }, { value: 30, name: "BSP", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 27, name: "BS3", color: "black" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 25, name: "BS1", color: "black" }, { value: 22, name: "BMA", color: "black" }, { value: 29, name: "BS5", color: "black" }, { value: 21, name: "BCA", color: "black" }, { value: 18, name: "BSE", color: "black" }, { value: 26, name: "BS2", color: "black" }, { value: 28, name: "BS4", color: "black" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 24, name: "BCO", color: "black" }, { value: 23, name: "BLC", color: "black" }, { value: 30, name: "BSP", color: "black" }, { value: 17, name: "BPR", color: "black" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 2, name: "WPR", color: "white" }, { value: 15, name: "WSP", color: "white" }, { value: 12, name: "WS3", color: "white" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 10, name: "WS1", color: "white" }, { value: 7, name: "WMA", color: "white" }, { value: 14, name: "WS5", color: "white" }, { value: 6, name: "WCA", color: "white" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 16, name: "BFL", color: "black", promoted: true }, { value: 9, name: "WCO", color: "white" }, { value: 8, name: "WLC", color: "white" }, { value: 15, name: "WSP", color: "white" }, { value: 1, name: "WFL", color: "white" }, { value: 0, name: "EMP", color: "gray" }, { value: 3, name: "WSE", color: "white" }, { value: 11, name: "WS2", color: "white" }, { value: 13, name: "WS4", color: "white" }]] } },
            { set: { key: 'deltaFrom', value: { row: 1, col: 0 } } },
            { set: { key: 'deltaTo', value: { row: 0, col: 0 } } }]);
    });
    it("white attacks black to win", function () {
        expectMoveOk(1, { board: [[{ value: 16, name: "BFL", color: "black" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 1, name: "WFL", color: "white" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }]] }, [{ endMatch: { endMatchScores: [1, 0] } },
            { set: { key: 'board', value: [[{ value: 1, name: "WFL", color: "white" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }]] } },
            { set: { key: 'deltaFrom', value: { row: 1, col: 0 } } },
            { set: { key: 'deltaTo', value: { row: 0, col: 0 } } }]);
    });
    it("black attacks white to win", function () {
        expectMoveOk(0, { board: [[{ value: 16, name: "BFL", color: "black" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 1, name: "WFL", color: "white" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }]] }, [{ endMatch: { endMatchScores: [0, 1] } },
            { set: { key: 'board', value: [[{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 16, name: "BFL", color: "black" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }],
                        [{ value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }, { value: 0, name: "EMP", color: "gray" }]] } },
            { set: { key: 'deltaFrom', value: { row: 0, col: 0 } } },
            { set: { key: 'deltaTo', value: { row: 1, col: 0 } } }]);
    });
    /*it("white attacks black but ties", function() {
      expectMoveOk(1,
        {board:
          [[{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
          [{value: 17, name: "BPR", color: "black"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
          [{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
          [{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
          [{value: 0, name: "EMP", color: "gray"},{value: 1, name: "WFL", color: "white"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
          [{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
          [{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
          [{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}]]},
        [{setTurn: {turnIndex : 0}},
          {set: {key: 'board', value:
          [[{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
          [{value: 0, name: "EMP", color: "gray"},{value: 16, name: "BFL", color: "black"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
          [{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
          [{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
          [{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
          [{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
          [{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
          [{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}]]}},
          {set: {key: 'deltaFrom', value: {row: 5, col: 0}}},
          {set: {key: 'deltaTo', value: {row: 4, col: 0}}}]);
    });*/
    /*
    it("white attacks black but ties", function() {
      expectMoveOk(1,
        {board:
          [[{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
          [{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
          [{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
          [{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
          [{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
          [{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
          [{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
          [{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}]]},
        [{setTurn: {turnIndex : 0}},
          {set: {key: 'board', value:
          [[{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
          [{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
          [{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
          [{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
          [{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
          [{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
          [{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
          [{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}]]}},
          {set: {key: 'deltaFrom', value: {row: 5, col: 0}}},
          {set: {key: 'deltaTo', value: {row: 4, col: 0}}}]);
    });
    */
    /*it("placing O in 0x1 after X placed X in 0x0 is legal", function() {
      expectMoveOk(1,
        {board:
          [['X', '', ''],
           ['', '', ''],
           ['', '', '']], delta: {row: 0, col: 0}},
        [{setTurn: {turnIndex : 0}},
          {set: {key: 'board', value:
            [['X', 'O', ''],
             ['', '', ''],
             ['', '', '']]}},
          {set: {key: 'delta', value: {row: 0, col: 1}}}]);
    });
  
    it("placing an O in a non-empty position is illegal", function() {
      expectIllegalMove(1,
        {board:
          [['X', '', ''],
           ['', '', ''],
           ['', '', '']], delta: {row: 0, col: 0}},
        [{setTurn: {turnIndex : 0}},
          {set: {key: 'board', value:
            [['O', '', ''],
             ['', '', ''],
             ['', '', '']]}},
          {set: {key: 'delta', value: {row: 0, col: 0}}}]);
    });
  
    it("cannot move after the game is over", function() {
      expectIllegalMove(1,
        {board:
          [['X', 'O', ''],
           ['X', 'O', ''],
           ['X', '', '']], delta: {row: 2, col: 0}},
        [{setTurn: {turnIndex : 0}},
          {set: {key: 'board', value:
            [['X', 'O', ''],
             ['X', 'O', ''],
             ['X', 'O', '']]}},
          {set: {key: 'delta', value: {row: 2, col: 1}}}]);
    });
  
    it("placing O in 2x1 is legal", function() {
      expectMoveOk(1,
        {board:
          [['O', 'X', ''],
           ['X', 'O', ''],
           ['X', '', '']], delta: {row: 2, col: 0}},
        [{setTurn: {turnIndex : 0}},
          {set: {key: 'board', value:
            [['O', 'X', ''],
             ['X', 'O', ''],
             ['X', 'O', '']]}},
          {set: {key: 'delta', value: {row: 2, col: 1}}}]);
    });
  
    it("X wins by placing X in 2x0 is legal", function() {
      expectMoveOk(0,
        {board:
          [['X', 'O', ''],
           ['X', 'O', ''],
           ['', '', '']], delta: {row: 1, col: 1}},
        [{endMatch: {endMatchScores: [1, 0]}},
              {set: {key: 'board', value:
                [['X', 'O', ''],
                 ['X', 'O', ''],
                 ['X', '', '']]}},
              {set: {key: 'delta', value: {row: 2, col: 0}}}]);
    });
  
    it("O wins by placing O in 1x1 is legal", function() {
      expectMoveOk(1,
        {board:
          [['X', 'X', 'O'],
           ['X', '', ''],
           ['O', '', '']], delta: {row: 0, col: 1}},
        [{endMatch: {endMatchScores: [0, 1]}},
              {set: {key: 'board', value:
                [['X', 'X', 'O'],
                 ['X', 'O', ''],
                 ['O', '', '']]}},
              {set: {key: 'delta', value: {row: 1, col: 1}}}]);
    });
  
    it("the game ties when there are no more empty cells", function() {
      expectMoveOk(0,
        {board:
          [['X', 'O', 'X'],
           ['X', 'O', 'O'],
           ['O', 'X', '']], delta: {row: 2, col: 0}},
        [{endMatch: {endMatchScores: [0, 0]}},
              {set: {key: 'board', value:
                [['X', 'O', 'X'],
                 ['X', 'O', 'O'],
                 ['O', 'X', 'X']]}},
              {set: {key: 'delta', value: {row: 2, col: 2}}}]);
    });
  
    it("null move is illegal", function() {
      expectIllegalMove(0, {}, null);
    });
  
    it("move without board is illegal", function() {
      expectIllegalMove(0, {}, [{setTurn: {turnIndex : 1}}]);
    });
  
    it("move without delta is illegal", function() {
      expectIllegalMove(0, {}, [{setTurn: {turnIndex : 1}},
        {set: {key: 'board', value:
          [['X', '', ''],
           ['', '', ''],
           ['', '', '']]}}]);
    });
  
    it("placing X outside the board (in 3x0) is illegal", function() {
      expectIllegalMove(0, {}, [{setTurn: {turnIndex : 1}},
        {set: {key: 'board', value:
          [['X', '', ''],
           ['', '', ''],
           ['', '', '']]}},
        {set: {key: 'delta', value: {row: 3, col: 0}}}]);
    });
  
    it("placing X in 0x0 but setTurn to yourself is illegal", function() {
      expectIllegalMove(0, {}, [{setTurn: {turnIndex : 0}},
        {set: {key: 'board', value:
          [['X', '', ''],
           ['', '', ''],
           ['', '', '']]}},
        {set: {key: 'delta', value: {row: 0, col: 0}}}]);
    });
  
    it("placing X in 0x0 but setting the board wrong is illegal", function() {
      expectIllegalMove(0, {}, [{setTurn: {turnIndex : 1}},
        {set: {key: 'board', value:
          [['X', 'X', ''],
           ['', '', ''],
           ['', '', '']]}},
        {set: {key: 'delta', value: {row: 0, col: 0}}}]);
    });
  
    it("getPossibleMoves returns exactly one cell", function() {
      var board =
          [['O', 'O', 'X'],
           ['X', 'X', 'O'],
           ['O', 'X', '']];
      var possibleMoves = gameLogic.getPossibleMoves(board, 0);
      var expectedMove = [{endMatch: {endMatchScores: [0, 0]}},
          {set: {key: 'board', value:
            [['O', 'O', 'X'],
             ['X', 'X', 'O'],
             ['O', 'X', 'X']]}},
          {set: {key: 'delta', value: {row: 2, col: 2}}}];
      expect(angular.equals(possibleMoves, [expectedMove])).toBe(true);
    });*/
});
