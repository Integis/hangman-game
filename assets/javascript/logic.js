// Create a hangmanGame Object to house all logic, functions, and variables
var hangmanGame = {
    // Integis: Private Equity Glossary of Terms
    words: [
        "Acquisition",
        "Acquisition finance",
        "Advisory board",
        "alternative assets",
        "asset",
        "asset allocation",
        "balanced fund",
        "benchmark",
        "Bond",
        "Bridge loan",
        "buyout",
        "capital call",
        "capital drawdown",
        "capital commitment",
        "capital distribution",
        "capital gain",
        "capital under investment",
        "captive firm",
        "carried interest",
        "catch up",
        "clawback",
        "deal closing",
        "fund closing",
        "coinvestment",
        "company buyback",
        "debt financing",
        "distressed debt",
        "distribution",
        "dividend cover",
        "drawdown",
        "dry closing",
        "due diligence",
        "early stage finance",
        "equity financing",
        "evergreen fund",
        "exit",
        "first time fund",
        "follow on funding",
        "fund of funds",
        "fund raising",
        "gatekeeper",
        "general partner",
        "holding period",
        "hurdle rate",
        "institutional buyout",
        "initial public offering",
        "internal rate of return",
        "later stage finance",
        "lead investor",
        "leveraged buyout",
        "limited partners",
        "limited partnership",
        "lockup period",
        "management buyout",
        "management fee",
        "mezzanine financing",
        "portfolio",
        "portfolio company",
        "placement agent",
        "preferred return",
        "private equity",
        "private markets",
        "private placement",
        "public to private",
        "ratchets",
        "recapitalisation",
        "secondaries",
        "secondary buyout",
        "secondary market",
        "sliding fee scale",
        "spinout firms",
        "strategic investment",
        "syndication",
        "take downs",
        "term sheet",
        "tombstone",
        "turnaround",
        "venture capital",
        "vintage year"
    ],

    // Initialize variables before game begins
    wordInPlay: null,
    noSpacesInWord: [],
    lettersOfTheWord: [],
    spacesInWord: [],
    matchedLetters: [" "],
    guessedLetters: [],
    guessesLeft: 0,
    totalGuesses: 0,
    letterGuessed: null,
    wordView: "",

    // Begin Game On-click

    // DOES THIS RESET ALL VARIABLES AFTER WIN/LOSS??
    // NEEDS TO INCLUDE RESTART GAME FUNCTION?

    beginGame: function() {
        // Get random word
        var keys = Object.keys(this.words)
        this.wordInPlay = this.words[keys[keys.length * Math.random() << 0]];
        console.log(this.wordInPlay);
        // Split the wordInPlay into individual letters (getting rid of the spaces first)
        this.noSpacesInWord = this.wordInPlay.replace(/ /g, "");
        this.lettersOfTheWord = this.noSpacesInWord.split("");
        console.log(this.lettersOfTheWord);
        // Create wordWithSpaces for buildWorldView function
        this.spacesInWord = this.wordInPlay.split("");
        console.log(this.spacesInWord);
        // Builds the representation of the word we are trying to guess and makes the initial display
        this.buildWorldView();
        // Update user guesses
        this.updateTotalGuesses();
    },

    buildWorldView: function() {
        this.wordView = "";
        // Loop through the letters of the wordInPlay
        for (var i = 0; i < this.spacesInWord.length; i++) {
            // If the current letter is space, display the space
            if (this.spacesInWord[i] === " ") {
                this.wordView += "\xa0\xa0\xa0";
            }
            // If the current letter is guessed, display the letter
            else if (this.matchedLetters.indexOf(this.spacesInWord[i]) !== -1) {
                this.wordView += this.spacesInWord[i];
            }
            // If it has not been guessed, display "_" instead.
            else {
                this.wordView += "_ ";
            }
        }
        // Update the page with the new string built
        $("#current-word").text(this.wordView);
        console.log(this.wordView);
    },

    // This function sets the initial guesses the user gets (can make variable based on word length down the road)
    updateTotalGuesses: function() {
        // User will have 10 total incorrect guesses before the game is over
        this.totalGuesses = 10;
        this.guessesLeft = this.totalGuesses;
        // Render the guesses left to the page
        $("#guesses-remaining").text(this.guessesLeft);
    },

    // The functions below work after the game has been set-up

    // Update page on submit letter key press
    updatePage: function(letter) {
        console.log(letter);
        // Check for and handle incorrect guesses
        this.updateGuesses(letter);
        // Check for and handle correct guesses
        this.updateMatchedLetters(letter);
        // Build the view of the word
        this.buildWorldView();
        // If the user wins, show winning page
        this.didUserWin();
        // If the user loses, show losing page
        this.didUserLose();
    },

    // This function governs what happens when the user makes an INCORRECT letter guess
    updateGuesses: function(letter) {
        // if the letter is not in the guessedLetters array and the letter is not in the lettersOfTheWord array 
        if ((this.guessedLetters.indexOf(letter) === -1) && (this.lettersOfTheWord.indexOf(letter) === -1)) {
            // Add letter to the guessedLetters array
            this.guessedLetters.push(letter);
            // Decrease guesses remaining by one
            this.guessesLeft--;
            // Update guesses remaining, guess response, and letters guessed on the page
            $("#guesses-remaining").text(this.guessesLeft);
            $("#guess-response").text("The letter you guessed (" + letter + ") is incorrect.");
            $("#letters-guessed").text(this.guessedLetters);
        }
    },

    // This function governs what happens when the user makes a CORRECT letter guess
    updateMatchedLetters: function(letter) {
        // Loop through the letters of the wordInPlay
        for (var i = 0; i < this.lettersOfTheWord.length; i++) {
            // If the guessed letter is in the solution, and it has not been guessed already...
            if ((letter === this.lettersOfTheWord[i]) && (this.matchedLetters.indexOf(letter) === -1)) {
                // push the correctly guessed letter into the matched letters
                this.matchedLetters.push(letter);
                // Update guess response
                $("#guess-response").text("The letter you guessed (" + letter + ") is correct.");
            }
        }
    },

    // This function checks to see if the user has won
    didUserWin: function() {
        if (this.wordView.replace(/\s/g, '') === this.wordInPlay.replace(/\s/g, '')) {
            console.log("The user wins.")
            $("#guess-response").text("YOU WIN! Press restart game to play another game!")
        }
    },

    // This function check to see if the user has lost
    didUserLose: function() {
        if (this.guessesLeft <= 0) {
            $("#guess-response").text("YOU LOSE! Press restart game to try again.")
        }
    },

    // This function resets all the variables to restart the game
    restartGame: function() {
        $("#guess-response").text("Press any letter to begin guessing.");
        $("#current-word").text("");
        $("#letters-guessed").text("No incorrect letters guessed yet.");
        $("#guesses-remaining").text("");
        this.wordInPlay = null;
        this.noSpacesInWord = [];
        this.lettersOfTheWord = [];
        this.spacesInWord = [];
        this.matchedLetters = [];
        this.guessedLetters = [];
        this.guessesLeft = 0;
        this.totalGuesses = 0;
        this.lettersGuessed = null;
        this.beginGame();
    },
};

// Initialize the game when the page loads.
hangmanGame.beginGame();

// When a key is pressed..
document.onkeyup = function(event) {
    // If the key pressed is a letter
    if (event.which >= 65 && event.which <= 90) {
        // Capture pressed key and make it lowercase string.
        hangmanGame.letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
        // Pass the guessed letter into our updatePage function to run the game logic.
        hangmanGame.updatePage(hangmanGame.letterGuessed);
    }
    // If the key pressed is NOT a letter 
    else {
        alert("The key you pressed is not a letter.");
    }
};

// Restart Game button functions on click
document.getElementById("restart-game").onclick = function() { hangmanGame.restartGame() };