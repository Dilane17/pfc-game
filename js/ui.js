// Gestion de l’interface (DOM)
// Affiche résultats, score, etc.

function updateResultText(result) {
  // Afficher le résultat d’une manche
  const resultText = document.getElementById("resultText");
  resultText.textContent = result;
}

function updateScore(playerScore, aiScore) {
  // Mettre à jour l’affichage du score
  const scoreText = document.getElementById("score");
  scoreText.textContent = `Score - Joueur: ${playerScore}, IA: ${aiScore}`;
}

function highlightChoice(choice) {
  // Mettre en surbrillance le choix du joueur
  const buttons = document.querySelectorAll("#buttons button");
  buttons.forEach((button) => {
    if (button.id === choice) {
      button.classList.add("highlight");
    } else {
      button.classList.remove("highlight");
    }
  });
}

function resetUI() {
  // Réinitialiser l'interface utilisateur
  updateResultText("");
  updateScore(0, 0);
  highlightChoice("");
}