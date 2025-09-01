
// ===== GESTIONNAIRE D'ÉTAT =====

class GameState {
  constructor() {
  this.playerScore = 0;
  this.aiScore = 0;
  this.draws = 0;
  this.totalGames = 0;
  this.loadFromStorage();
}

/**
 * Met à jour les scores selon le résultat
 * @param {string} result - Résultat de la manche
 */
updateScore(result) {
this.totalGames++;

switch(result) {
  case GAME_CONFIG.results.WIN:
    this.playerScore++;
    break;
  case GAME_CONFIG.results.LOSE:
    this.aiScore++;
    break;
  case GAME_CONFIG.results.DRAW:
    this.draws++;
    break;
  default:
    console.error("Résultat de manche invalide:", result);
}

this.saveToStorage();
}

/**
 * Remet à zéro tous les scores
 */
reset() {
this.playerScore = 0;
this.aiScore = 0;
this.draws = 0;
this.totalGames = 0;
this.saveToStorage();
}

/**
 * Sauvegarde l'état dans le stockage local
 */
saveToStorage() {
try {
  const gameData = {
    playerScore: this.playerScore,
    aiScore: this.aiScore,
    draws: this.draws,
    totalGames: this.totalGames,
    lastPlayed: Date.now()
  };
  // Note: localStorage non disponible dans Claude.ai, utilisation d'une variable
  window.gameData = gameData;
} catch (error) {
  console.warn("Impossible de sauvegarder les données:", error);
}
}

/**
 * Charge l'état depuis le stockage local
 */
loadFromStorage() {
try {
  const saved = window.gameData;
  if (saved) {
    this.playerScore = saved.playerScore || 0;
    this.aiScore = saved.aiScore || 0;
    this.draws = saved.draws || 0;
    this.totalGames = saved.totalGames || 0;
  }
} catch (error) {
  console.warn("Impossible de charger les données:", error);
}
}
}
