import "./index.css";
import API from "./modules/API.js";

// gameID = 'sXfepIsNzVIibJ7qdAL3';
const api = new API();
const submitScore = document.getElementById("submitScore");
const refreshButton = document.getElementById("refreshButton");
const scores = document.getElementById("scores");

window.addEventListener("DOMContentLoaded", () => {
  submitScore.addEventListener("submit", (e) => {
    e.preventDefault();
    const playerName = document.getElementById("playerName").value;
    const playerScore = document.getElementById("playerScore").value;
    api.addNewScore(playerName, playerScore);
    populateScores();
  });

  const populateScores = async () => {
    const gamescores = await api.getGameScore();
    gamescores.result.forEach((gamescore) => {
      const newScore = document.createElement("li");
      newScore.innerHTML = `${gamescore.user}: ${gamescore.score}`;
      scores.append(newScore);
    });
  };
  refreshButton.addEventListener("click", populateScores);
  populateScores();
});
