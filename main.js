var level = 16;
var clickNum = 1;
var timerInterval;
var gBorad = createBoard()
renderBoard(gBorad)


function createBoard() {
  var board = [];
  for (var i = 0; i < level; i++) {
    board.push(i + 1)
  }
  shuffle(board)
  return board;
}


function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}


function renderNextStep() {
  var strHtml = '';
  strHtml += `The next step: ${clickNum}`
  var elNext = document.querySelector('.next');
  elNext.innerHTML = strHtml
  console.log(elNext);
}


function renderBoard(board) {
  var strHtml = '';
  for (var i = 0; i < Math.sqrt(level); i++) {
    strHtml += '<tr>'
    for (var j = 0; j < Math.sqrt(level); j++) {
      var cell = board.pop();
      strHtml += `<td class="${cell}"
          data="${cell}" 
          onclick="cellClicked(this)"
          >${cell}</td>`
    }
    strHtml += '</tr>'
  }
  var elBoard = document.querySelector('.board');
  elBoard.innerHTML = strHtml


}



function cellClicked(elCell) {
  var curNum = elCell.getAttribute("data");
  if (curNum == clickNum) {
    elCell.classList.add('clicked');
    if (curNum == 1) setTimer()
    clickNum++
    if (curNum == level) {
      clearInterval(timerInterval)
    }
  }
  renderNextStep()

}


function setTimer() {
  timerInterval = setInterval(updateCountdown, 1000);
}

const staringMinutes = 0;
var time = staringMinutes * 60;
const countdownEl = document.querySelector('.timer');

function updateCountdown() {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  console.log(countdownEl)
  seconds = seconds < 10 ? '0' + seconds : seconds;
  countdownEl.innerHTML = `${minutes} : ${seconds}`;
  time++;
}


function changeLevel(elBtn) {
  elBtn.getAttribute("class")
  switch (elBtn.getAttribute("class")) {
    case 'Easy':
      level = 16;
      break;
    case 'Hard':
      level = 25;
      break;
    case 'Extreme':
      level = 36;
  }
  clickNum = 1;
  clearInterval(timerInterval)
  renderBoard(createBoard());

}


function restartGame() {
  clearInterval(timerInterval)
  renderBoard(createBoard());
  clickNum = 1;
  time = 0;
}