document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  let squares = Array.from(document.querySelectorAll(".grid div"));
  const startBtn = document.querySelector("#start");
  const width = 10;
  let timeSet;

  //define terminos
  // const lTer = [
  //   [1, width + 1, width * 2 + 1, width * 2 + 1],
  //   [2, width, width + 1, width + 2],
  //   [width * 2 + 2, width, width + 1, width + 2],
  //   [1, 2, width + 1, width * 2 + 1],
  // ];
  // const iTer = [
  //   [width, width + 1, width + 2],
  //   [1, width + 1, width * 2 + 1],
  // ];
  // const zTer = [
  //   [width + 1, width + 2, width * 2, width * 2 + 1],
  //   [2, width + 1, width + 2, width * 2 + 1],
  //   [width * 2, width * 2 + 1, width + 1, width + 2],
  //   [0, width, width + 1, width * 2 + 1],
  // ];
  // const oTer = [[0, 1, width + 1, width ]];
  // const tTer = [
  //   [1, width, width + 1, width + 2],
  //   [1, width + 1, width + 2, width * 2 + 1],
  //   [width, width + 1, width + 2, width * 2 + 1],
  //   [width, width + 1, 1, width * 2 + 1],
  // ];

  const lTer = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
  ];

  const zTer = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
  ];

  const tTer = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1],
  ];

  const oTer = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ];

  const iTer = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];

  //set-up variable
  const allTer = [lTer, tTer, zTer, iTer, oTer];
  //const allTer = [iTer];
  let currentRotation = 0;
  let nextRandom = 0;
  let random = Math.floor(Math.random() * allTer.length);
  let currentTer = allTer[random][currentRotation];
  let currentPos = 4;
  //display();
  console.log(squares);

  function draw() {
    currentTer.forEach((i) => {
      //console.log( i + currentPos);
      squares[i + currentPos].classList.add("ter");
    });
  }
  function unDraw() {
    currentTer.forEach((i) => {
      //console.log( i + currentPos);
      squares[i + currentPos].classList.remove("ter");
    });
  }
  draw();

  //assign functions to keyCodes
  document.addEventListener("keyup", control);
  function control(e) {
    if (e.keyCode === 37) {
      moveLeft();
    } else if (e.keyCode === 38) {
      rotate();
    } else if (e.keyCode === 39) {
      moveRight();
    } else if (e.keyCode === 40) {
      moveDown();
      moveDown();
    } else if (e.keyCode === 32) {
      unDraw();
      random = nextRandom;
      currentTer = allTer[nextRandom][0];
      nextRandom = Math.floor(Math.random() * allTer.length);
      currentPos = 4;
      draw();
    }
  }

  startBtn.addEventListener("click", () => {
    if (timeSet) {
      clearInterval(timeSet);
      timeSet = null;
    } else {
      display();
      draw();
      timeSet = setInterval(moveDown, 500);
    }
  });

  let flagHit = false;
  function hit() {
    if (
      currentTer.some((i) =>
        squares[width + i + currentPos].classList.contains("taken")
      )
    ) {
      currentTer.forEach((i) => squares[currentPos + i].classList.add("taken"));
      currentPos = 4;
      random = nextRandom;
      currentTer = allTer[random][0];
      nextRandom = Math.floor(Math.random() * allTer.length);
      display();
      gameOver();
      addScore();
      draw();
    }
  }

  function moveDown() {
    console.log("moveDown");
    unDraw();
    currentPos = currentPos + width;
    draw();
    //flagHit = true
    hit();
  }

  let a = currentPos;

  function moveLeft() {
    unDraw();
    const isAtLeftEdge = currentTer.some(
      (index) => (currentPos + index) % width === 0
    );
    if (!isAtLeftEdge) {
      currentPos -= 1;
      a = currentPos;
    }
    if (
      currentTer.some((index) =>
        squares[currentPos + index].classList.contains("taken")
      )
    ) {
      currentPos += 1;
    }
    draw();
  }

  function moveRight() {
    unDraw();
    const isAtRightEdge = currentTer.some(
      (index) => (currentPos + index) % width === width - 1
    );
    if (!isAtRightEdge) {
      currentPos += 1;
      a = currentPos;
    }
    if (
      currentTer.some((index) =>
        squares[currentPos + index].classList.contains("taken")
      )
    ) {
      currentPos -= 1;
    }
    draw();
  }

  function rotate() {
    let flag = true;
    currentRotation++;
    console.log(random);
    if (currentRotation === 4) {
      currentRotation = 0;
    }
    //test change
    let temTer = allTer[random][currentRotation];

    const isAtRightEdge = temTer.some(
      (index) => (currentPos + index) % width === width - 1
    );
    const isAtLeftEdge = temTer.some(
      (index) => (currentPos + index) % width === 0
    );

    if (
      temTer.some((i) => squares[currentPos + i].classList.contains("taken")) ||
      (isAtLeftEdge && isAtRightEdge)
    ) {
      flag = false;
      // currentRotation = currentRotation === 0 ? 3 : currentRotation - 1;
      // currentTer = allTer[random][currentRotation];
      //change back if at left or right or hit another tiles
    }
    if (flag) {
      unDraw();
      currentTer = temTer;
      console.log(random + "/" + currentRotation);
      draw();
    }
  }

  const displayWith = 3;
  const displaySquares = Array.from(document.querySelectorAll(".display div"));
  const displayTer = [
    [1, 2, displayWith + 1, displayWith * +1], //lTer
    [1, displayWith, displayWith + 1, displayWith + 2], //tTer
    [0, displayWith, displayWith + 1, displayWith * 2 + 1], //zTer
    [1, displayWith + 1, displayWith * 2 + 1], // iTer
    [0, 1, displayWith, displayWith + 1], //oTer
  ];

  function display() {
    let nextTer = displayTer[nextRandom];
    displaySquares.forEach((i) => i.classList.remove("ter"));
    nextTer.forEach((i) => displaySquares[i].classList.add("ter"));
  }

  //check if any row in squares has a full ter and taken cell
  //if so add score and remove it con cat it to the top
  const height = 199;
  function addScore() {
    let totalScore = 0;
    let baseScore = 100;
    let multiplier = 0;
    for (var i = 0; i < height; i += width) {
      let scored = true;
      //loop to check that row
      for (var j = i; j < i + 10; j++) {
        console.log("loop check");
        if (!squares[j].classList.contains("ter")) {
          scored = false;
          break;
        }
      }

      //check if scored still true after check
      if (scored) {
        totalScore += baseScore + multiplier * baseScore;
        multiplier += 0.5;
        for (var j = i; j < i + 10; j++) {
          squares[j].classList.remove("ter");
          squares[j].classList.remove("taken");
        }
        //splice out the row add it to the top and re-draw
        const removedRow = squares.splice(i, width);
        squares = removedRow.concat(squares);
        squares.forEach((cell) => grid.appendChild(cell));
      }
    }
  }

  function gameOver() {
    if (
      currentTer.some((i) =>
        squares[currentPos + i].classList.contains("taken")
      )
    ) {
      clearInterval(timeSet);
      //alert("over")
    }
  }

  //
});
