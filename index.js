let scores,
  currentPlayer,
  currentScore,
  dice,
  diceDom,
  currentDom,
  playerTotalDom;

//Initial Game State
const init = () => {
  scores = [0, 0];
  currentPlayer = 0;
  currentScore = 0;

  //Reset Dom
  document.querySelector('#current-0').textContent = '0';
  document.querySelector('#current-1').textContent = '0';
  document.querySelector('#score-0').textContent = '0';
  document.querySelector('#score-1').textContent = '0';
  document.getElementById('player-0').textContent = '';
  document.getElementById('player-1').textContent = '';
  document.getElementById('player-0').classList.remove('winner');
  document.getElementById('player-1').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  diceDom = document.querySelector('.dice');
  diceDom.style.display = 'none';
  currentDom = document.querySelector('#current-' + currentPlayer);
  playerTotalDom = document.querySelector('#score-' + currentPlayer);
};
init();

//Functions
const roll = () => {
  diceDom.style.display = 'block';
  dice = throwDice();
  diceDom.src = 'dice-' + dice + '.png';

  if (dice !== 1) {
    currentScore += dice;
    currentDom.textContent = currentScore;
  } else {
    switchPlayers();
  }
};

const hold = () => {
  scores[currentPlayer] += currentScore;
  playerTotalDom = document.querySelector('#score-' + currentPlayer);
  playerTotalDom.textContent = scores[currentPlayer];
  if (scores[currentPlayer] >= 100) {
    document.getElementById('player-' + currentPlayer).textContent = 'Winner!';
    document
      .querySelector('.player-' + currentPlayer + '-panel')
      .classList.add('winner');
  } else {
    switchPlayers();
  }
};

throwDice = () => {
  return Math.floor(Math.random() * 6) + 1;
};

switchPlayers = () => {
  currentScore = 0;
  currentDom.textContent = currentScore;
  currentPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);
  currentDom = document.querySelector('#current-' + currentPlayer);
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
};

//Event Listeners
document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.btn-roll').addEventListener('click', roll);

document.querySelector('.btn-hold').addEventListener('click', hold);
