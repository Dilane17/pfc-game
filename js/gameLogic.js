// Logique pure du jeu (aucun DOM ici)

// Liste des choix canoniques
const choices = ["pierre", "feuille", "ciseaux"];
Object.freeze(choices); // Empêche la modification de ce tableau

// Règle du jeu 
const rules = Object.freeze({
    "pierre" : "ciseaux",
    "feuille" : "pierre",
    "ciseaux" : "feuille"
});



// Constantes pour les résultats
const RESULT_WIN = "win";
const RESULT_LOSE = "lose";
const RESULT_DRAW = "draw";

function isValidChoice(choice) {
    return typeof choice === "string" && choices.includes(choice.toLowerCase().trim());
}


/**
 * Retourne le gagnant entre deux choix
 * @param {string} player
 * @param {string} ai
 * @returns {"win"|"lose"|"draw"}
 */
function getWinner(player, ai) {
    //Normalisation
    player = player.toLowerCase().trim();
    ai = ai.toLowerCase().trim();

    // Vérifier si les choix sont valides
    if (!isValidChoice(player) || !isValidChoice(ai)) {
        throw new Error("Choix invalide");
    }

    // Décision
    if (player === ai) {
        return RESULT_DRAW;
    } else if (rules[player] === ai) {
        return RESULT_WIN;
    } else {
        return RESULT_LOSE;
    }
}