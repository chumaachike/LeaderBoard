import './index.css';
import API from './modules/API';

// gameID = 'sXfepIsNzVIibJ7qdAL3';
const api = new API();
const submitScore = document.getElementById('submitScore');
const refreshButton = document.getElementById('refreshButton');
const scores = document.getElementById('scores');

window.addEventListener('DOMContentLoaded', () => {
  const populateScores = async () => {
    const gamescores = await api.getGameScore();
    gamescores.result.forEach((gamescore) => {
      const newScore = document.createElement('li');
      newScore.innerHTML = `${gamescore.user}: ${gamescore.score}`;
      scores.append(newScore);
    });
  };

  submitScore.addEventListener('submit', (e) => {
    e.preventDefault();
    const playerName = document.getElementById('playerName').value;
    const playerScore = document.getElementById('playerScore').value;
    api.addNewScore(playerName, playerScore);
    populateScores();
  });

  refreshButton.addEventListener('click', populateScores);
  populateScores();
});
