// Variables globales
let playerScore = 0;
let aiScore = 0;

// Variable du dom
const rockButton = document.getElementById("pierre");
const paperButton = document.getElementById("feuille");
const scissorsButton = document.getElementById("ciseaux");
const playerScoreSpan = document.getElementById("player-score");
const aiScoreSpan = document.getElementById("ai-score");

// Charge l’UI, initialise le jeu
document.addEventListener("DOMContentLoaded", () => {
  console.log("🎮 Jeu lancé");
  resetUI();
});

// Gestions des évènements
rockButton.addEventListener("click", () => {
  playRound("pierre");
});

paperButton.addEventListener("click", () => {
  playRound("feuille");
});

scissorsButton.addEventListener("click", () => {
  playRound("ciseaux");
});

// Fonction pour jouer une manche
function playRound(playerChoice) {
  // Récupérer choix du joueur
  const aiChoice = getAIChoice();
  const winner = getWinner(playerChoice, aiChoice);
  // Comparer les choix et déterminer le gagnant
  if (winner === "player") {
    playerScore++;
    updateResultText(`Vous avez gagné! ${playerChoice} bat ${aiChoice}`);
  } else if (winner === "ai") {
    aiScore++;
    updateResultText(`Vous avez perdu! ${aiChoice} bat ${playerChoice}`);
  } else {
    updateResultText(`Match nul! ${playerChoice} est égal à ${aiChoice}`);
  }
  // Mettre à jour les scores
  updateScores(playerScore, aiScore);
  highlightChoice(playerChoice);
  updateUI();
}
