describe("aiService", function() {

  it("Since this is random, we are simply testing that black's moves are legal", function() {
    let board = [[{value: 16, name: "BFL", color: "black"},{value: 30, name: "BSP", color: "black"},{value: 17, name: "BPR", color: "black"},{value: 17, name: "BPR", color: "black"},{value: 17, name: "BPR", color: "black"},{value: 17, name: "BPR", color: "black"},{value: 17, name: "BPR", color: "black"},{value: 27, name: "BS3", color: "black"},{value: 0, name: "EMP", color: "gray"}],
      [{value: 20, name: "BL1", color: "black"},{value: 25, name: "BS1", color: "black"},{value: 22, name: "BMA", color: "black"},{value: 29, name: "BS5", color: "black"},{value: 21, name: "BCA", color: "black"},{value: 18, name: "BSE", color: "black"},{value: 26, name: "BS2", color: "black"},{value: 28, name: "BS4", color: "black"},{value: 0, name: "EMP", color: "gray"}],
      [{value: 19, name: "BL2", color: "black"},{value: 24, name: "BCO", color: "black"},{value: 23, name: "BLC", color: "black"},{value: 30, name: "BSP", color: "black"},{value: 17, name: "BPR", color: "black"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
      [{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
      [{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
      [{value: 2, name: "WPR", color: "white"},{value: 2, name: "WPR", color: "white"},{value: 2, name: "WPR", color: "white"},{value: 2, name: "WPR", color: "white"},{value: 2, name: "WPR", color: "white"},{value: 2, name: "WPR", color: "white"},{value: 15, name: "WSP", color: "white"},{value: 12, name: "WS3", color: "white"},{value: 0, name: "EMP", color: "gray"}],
      [{value: 5, name: "WL1", color: "white"},{value: 10, name: "WS1", color: "white"},{value: 7, name: "WMA", color: "white"},{value: 14, name: "WS5", color: "white"},{value: 6, name: "WCA", color: "white"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
      [{value: 4, name: "WL2", color: "white"},{value: 9, name: "WCO", color: "white"},{value: 8, name: "WLC", color: "white"},{value: 15, name: "WSP", color: "white"},{value: 1, name: "WFL", color: "white"},{value: 0, name: "EMP", color: "gray"},{value: 3, name: "WSE", color: "white"},{value: 11, name: "WS2", color: "white"},{value: 13, name: "WS4", color: "white"}]];
      let move = aiService.createComputerMove(board, 1,  {maxDepth: 1});
      let expectedMove = gameLogic.createMove(board, 1, move[2].set.value, move[3].set.value);
    expect(angular.equals(move, expectedMove)).toBe(true);
  });

  it("Since this is random, we are simply testing that white's moves are legal", function() {
    let board = [[{value: 16, name: "BFL", color: "black"},{value: 30, name: "BSP", color: "black"},{value: 17, name: "BPR", color: "black"},{value: 17, name: "BPR", color: "black"},{value: 17, name: "BPR", color: "black"},{value: 17, name: "BPR", color: "black"},{value: 17, name: "BPR", color: "black"},{value: 27, name: "BS3", color: "black"},{value: 0, name: "EMP", color: "gray"}],
      [{value: 20, name: "BL1", color: "black"},{value: 25, name: "BS1", color: "black"},{value: 22, name: "BMA", color: "black"},{value: 29, name: "BS5", color: "black"},{value: 21, name: "BCA", color: "black"},{value: 18, name: "BSE", color: "black"},{value: 26, name: "BS2", color: "black"},{value: 28, name: "BS4", color: "black"},{value: 0, name: "EMP", color: "gray"}],
      [{value: 19, name: "BL2", color: "black"},{value: 24, name: "BCO", color: "black"},{value: 23, name: "BLC", color: "black"},{value: 30, name: "BSP", color: "black"},{value: 17, name: "BPR", color: "black"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
      [{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
      [{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
      [{value: 2, name: "WPR", color: "white"},{value: 2, name: "WPR", color: "white"},{value: 2, name: "WPR", color: "white"},{value: 2, name: "WPR", color: "white"},{value: 2, name: "WPR", color: "white"},{value: 2, name: "WPR", color: "white"},{value: 15, name: "WSP", color: "white"},{value: 12, name: "WS3", color: "white"},{value: 0, name: "EMP", color: "gray"}],
      [{value: 5, name: "WL1", color: "white"},{value: 10, name: "WS1", color: "white"},{value: 7, name: "WMA", color: "white"},{value: 14, name: "WS5", color: "white"},{value: 6, name: "WCA", color: "white"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
      [{value: 4, name: "WL2", color: "white"},{value: 9, name: "WCO", color: "white"},{value: 8, name: "WLC", color: "white"},{value: 15, name: "WSP", color: "white"},{value: 1, name: "WFL", color: "white"},{value: 0, name: "EMP", color: "gray"},{value: 3, name: "WSE", color: "white"},{value: 11, name: "WS2", color: "white"},{value: 13, name: "WS4", color: "white"}]];
      let move = aiService.createComputerMove(board, 0,  {maxDepth: 1});
      let expectedMove = gameLogic.createMove(board, 0, move[2].set.value, move[3].set.value);
    expect(angular.equals(move, expectedMove)).toBe(true);
  });

  it("Expect a losing move for white", function() {
    let board =   [[{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
      [{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
      [{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 16, name: "BFL", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
      [{value: 0, name: "EMP", color: "gray"},{value: 17, name: "BPR", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
      [{value: 17, name: "BPR", color: "gray"},{value: 1, name: "WFL", color: "white"},{value: 17, name: "BPR", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
      [{value: 0, name: "EMP", color: "gray"},{value: 17, name: "BPR", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
      [{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}],
      [{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"},{value: 0, name: "EMP", color: "gray"}]]
      let move = aiService.createComputerMove(board, 0,  {maxDepth: 1});
      let expectedMove = gameLogic.createMove(board, 0, move[2].set.value, move[3].set.value);
    expect(angular.equals(move, expectedMove)).toBe(true);
  });
});
