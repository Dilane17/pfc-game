// ===== LOGIQUE DU JEU =====

// Configuration du jeu
const GAME_CONFIG = Object.freeze({
    choices: ["pierre", "feuille", "ciseaux"],
    rules: {
    "pierre": "ciseaux",    // Pierre bat Ciseaux
    "feuille": "pierre",    // Feuille bat Pierre  
    "ciseaux": "feuille"    // Ciseaux bat Feuille
    },
    results: {
    WIN: "win",
    LOSE: "lose", 
    DRAW: "draw"
    },
    emojis: {
    "pierre": "🗿",
    "feuille": "📄", 
    "ciseaux": "✂️"
    }
});

/**
 * Valide si un choix est correct
 * @param {string} choice - Le choix à valider
 * @returns {boolean} - True si le choix est valide
 */
function isValidChoice(choice) {
    if (typeof choice !== "string") return false;
    const normalizedChoice = choice.toLowerCase().trim();
    return GAME_CONFIG.choices.includes(normalizedChoice);
}

/**
 * Génère un choix aléatoire pour l'IA
 * @returns {string} - Choix de l'IA
 */
function getAIChoice() {
    const randomIndex = Math.floor(Math.random() * GAME_CONFIG.choices.length);
    return GAME_CONFIG.choices[randomIndex];
}

/**
 * Détermine le gagnant entre deux choix
 * @param {string} playerChoice - Choix du joueur
 * @param {string} aiChoice - Choix de l'IA
 * @returns {string} - Résultat: "win", "lose" ou "draw"
 */
function determineWinner(playerChoice, aiChoice) {
    // Normalisation des entrées
    const player = playerChoice.toLowerCase().trim();
    const ai = aiChoice.toLowerCase().trim();

    // Validation des choix
    if (!isValidChoice(player) || !isValidChoice(ai)) {
    throw new Error(`Choix invalide: joueur="${player}", IA="${ai}"`);
    }

    // Logique de victoire
    if (player === ai) {
    return GAME_CONFIG.results.DRAW;
    } else if (GAME_CONFIG.rules[player] === ai) {
    return GAME_CONFIG.results.WIN;
    } else {
    return GAME_CONFIG.results.LOSE;
    }
}