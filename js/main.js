    // ===== CONTRÔLEUR PRINCIPAL =====
    
    class Game {
      constructor() {
        this.gameState = new GameState();
        this.ui = new UIManager();
        this.isAnimating = false;
        
        this.initializeEventListeners();
        this.updateDisplay();
        
        console.log("🎮 Jeu Pierre-Feuille-Ciseaux initialisé avec succès");
      }

      /**
       * Configure tous les écouteurs d'événements
       */
      initializeEventListeners() {
        // Boutons de choix
        this.ui.elements.buttons.forEach(button => {
          button.addEventListener("click", (event) => {
            const choice = event.target.dataset.choice;
            if (choice && !this.isAnimating) {
              this.playRound(choice);
            }
          });
        });

        // Bouton de réinitialisation
        this.ui.elements.resetButton.addEventListener("click", () => {
          this.resetGame();
        });

        // Bouton de thème
        this.ui.elements.themeButton.addEventListener("click", () => {
          this.ui.toggleTheme();
        });

        // Raccourcis clavier
        document.addEventListener("keydown", (event) => {
          if (this.isAnimating) return;
          
          const keyMap = {
            'p': 'pierre',
            'f': 'feuille', 
            'c': 'ciseaux',
            'r': 'reset'
          };
          
          const action = keyMap[event.key.toLowerCase()];
          if (action === 'reset') {
            this.resetGame();
          } else if (action) {
            this.playRound(action);
          }
        });
      }

      /**
       * Joue une manche complète
       * @param {string} playerChoice - Choix du joueur
       */
      async playRound(playerChoice) {
        if (this.isAnimating) return;
        
        try {
          this.isAnimating = true;
          
          // Validation du choix
          if (!isValidChoice(playerChoice)) {
            throw new Error(`Choix invalide: ${playerChoice}`);
          }

          // Génération du choix IA et calcul du résultat
          const aiChoice = getAIChoice();
          const result = determineWinner(playerChoice, aiChoice);
          
          // Animation visuelle
          this.ui.highlightChoice(playerChoice);
          
          // Affichage du résultat avec délai pour l'effet
          setTimeout(() => {
            const message = this.ui.generateResultMessage(result, playerChoice, aiChoice);
            this.ui.updateResultText(message, result);
            
            // Mise à jour des scores
            this.gameState.updateScore(result);
            this.updateDisplay();
            
            this.isAnimating = false;
          }, 300);

        } catch (error) {
          console.error("Erreur pendant la manche:", error);
          this.ui.updateResultText("❌ Erreur de jeu, réessayez !");
          this.isAnimating = false;
        }
      }

      /**
       * Remet le jeu à zéro
       */
      resetGame() {
        if (confirm("🔄 Voulez-vous vraiment réinitialiser tous les scores ?")) {
          this.gameState.reset();
          this.ui.resetInterface();
          this.updateDisplay();
          console.log("🔄 Jeu réinitialisé");
        }
      }

      /**
       * Met à jour tout l'affichage
       */
      updateDisplay() {
        this.ui.updateScoreDisplay(this.gameState);
      }
    }

    // ===== INITIALISATION =====
    
    // Démarrage du jeu quand le DOM est prêt
    document.addEventListener("DOMContentLoaded", () => {
      try {
        window.game = new Game();
      } catch (error) {
        console.error("❌ Erreur lors de l'initialisation du jeu:", error);
        alert("Erreur lors du démarrage du jeu. Veuillez recharger la page.");
      }
    });

    // Gestion des erreurs globales
    window.addEventListener("error", (event) => {
      console.error("❌ Erreur globale:", event.error);
    });