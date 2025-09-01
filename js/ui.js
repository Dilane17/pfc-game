// ===== GESTIONNAIRE D'INTERFACE =====

class UIManager {
constructor() {
  this.elements = {
    resultText: document.getElementById("resultText"),
    score: document.getElementById("score"),
    gameStats: document.getElementById("gameStats"),
    buttons: document.querySelectorAll("#buttons button"),
    resetButton: document.getElementById("resetButton"),
    themeButton: document.getElementById("themeButton")
  };
  this.isDarkTheme = false;
}

/**
 * Met à jour le texte de résultat avec style
 * @param {string} message - Message à afficher
 * @param {string} type - Type de résultat pour le style
 */
updateResultText(message, type = "") {
  const element = this.elements.resultText;
  element.textContent = message;
  
  // Supprime les anciennes classes de style
  element.classList.remove("win", "lose", "draw");
  
  // Ajoute la nouvelle classe si spécifiée
  if (type) {
    element.classList.add(type);
  }
}

/**
 * Met à jour l'affichage des scores
 * @param {GameState} gameState - État actuel du jeu
 */
updateScoreDisplay(gameState) {
  this.elements.score.textContent = 
    `Joueur: ${gameState.playerScore} | IA: ${gameState.aiScore} | Égalités: ${gameState.draws}`;
  
  this.elements.gameStats.textContent = 
    `Parties jouées: ${gameState.totalGames}`;
}

/**
 * Met en surbrillance le bouton sélectionné
 * @param {string} choice - Choix à mettre en surbrillance
 */
highlightChoice(choice) {
  this.elements.buttons.forEach(button => {
    if (button.dataset.choice === choice) {
      button.classList.add("highlight");
      // Supprime la surbrillance après l'animation
      setTimeout(() => {
        button.classList.remove("highlight");
      }, 1000);
    }
  });
}

/**
 * Remet l'interface à son état initial
 */
resetInterface() {
  this.updateResultText("Choisissez votre arme !");
  this.elements.buttons.forEach(button => {
    button.classList.remove("highlight");
  });
}

/**
 * Bascule entre les thèmes clair et sombre
 */
toggleTheme() {
  this.isDarkTheme = !this.isDarkTheme;
  const body = document.body;
  
  if (this.isDarkTheme) {
    body.classList.remove("light");
    body.classList.add("dark");
    this.elements.themeButton.textContent = "☀️ Mode clair";
  } else {
    body.classList.remove("dark");
    body.classList.add("light");
    this.elements.themeButton.textContent = "🌙 Mode sombre";
  }
}

/**
 * Génère un message de résultat personnalisé
 * @param {string} result - Résultat de la manche
 * @param {string} playerChoice - Choix du joueur
 * @param {string} aiChoice - Choix de l'IA
 * @returns {string} - Message formaté
 */
generateResultMessage(result, playerChoice, aiChoice) {
  const playerEmoji = GAME_CONFIG.emojis[playerChoice];
  const aiEmoji = GAME_CONFIG.emojis[aiChoice];
  
  const messages = {
    [GAME_CONFIG.results.WIN]: [
      `🎉 Victoire ! ${playerEmoji} ${playerChoice} bat ${aiEmoji} ${aiChoice}`,
      `💪 Bien joué ! Votre ${playerChoice} écrase ${aiChoice}`,
      `🏆 Excellent ! ${playerChoice} triomphe sur ${aiChoice}`
    ],
    [GAME_CONFIG.results.LOSE]: [
      `😔 Défaite... ${aiEmoji} ${aiChoice} bat ${playerEmoji} ${playerChoice}`,
      `🤖 L'IA gagne avec ${aiChoice} contre votre ${playerChoice}`,
      `😅 Pas de chance ! ${aiChoice} l'emporte sur ${playerChoice}`
    ],
    [GAME_CONFIG.results.DRAW]: [
      `🤝 Égalité ! ${playerEmoji} ${playerChoice} = ${aiEmoji} ${aiChoice}`,
      `⚖️ Match nul ! Même choix des deux côtés`,
      `🎯 Parfaite synchronisation ! Égalité avec ${playerChoice}`
    ]
  };
  
  const messageArray = messages[result];
  return messageArray[Math.floor(Math.random() * messageArray.length)];
}
}