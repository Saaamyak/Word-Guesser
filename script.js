const inputs = document.querySelector(".inputs"),
    hints = document.querySelector(".hints"),
    invalidLetters = document.querySelector(".invalid"),
    resetButton = document.querySelector(".btn"),
    remainingGuesses = document.querySelector(".remaining-guess"),
    typingInput = document.querySelector(".type-input");

let words, maxGuesses, incorrectLetters = [], correctLetters = [];

function randomWord() {
    let randomObj = wordsList[Math.floor(Math.random() * wordsList.length)];
    words = randomObj.words;
    maxGuesses = 8;
    correctLetters = []; incorrectLetters = [];
    hints.innerText = `Hint: ${randomObj.hint}`;
    remainingGuesses.innerText = `Remaining guesses: ${maxGuesses}`;
    invalidLetters.innerText = `Wrong letters: ${incorrectLetters}`;

    let input = "";
    for (let i = 0; i < words.length; i++) {
        input += `<input type="text" disabled>`;
        inputs.innerHTML = input;
    }
}
randomWord();

function startGame(e) {
    let key = e.target.value.toLowerCase();
    if (key.match(/^[A-Za-z]+$/) && !incorrectLetters.includes(` ${key}`) && !correctLetters.includes(key)) {
        if (words.includes(key)) {
            for (let i = 0; i < words.length; i++) {
                if (words[i] == key) {
                    correctLetters += key;
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maxGuesses--;
            incorrectLetters.push(` ${key}`);
        }
        remainingGuesses.innerText = `Remaining guesses: ${maxGuesses}`;
        invalidLetters.innerText = `Wrong letters: ${incorrectLetters}`;
    }
    typingInput.value = "";

    setTimeout(() => {
        if (correctLetters.length === words.length) {
            alert(`Congrats!🎉 You found the words ${words.toUpperCase()}`);
            return randomWord();
        } else if (maxGuesses < 1) {
            alert("Game over! You don't have any remaining guesses");
            for (let i = 0; i < words.length; i++) {
                inputs.querySelectorAll("input")[i].value = words[i];
            }
        }
    }, 100);
}

resetButton.addEventListener("click", randomWord);
typingInput.addEventListener("input", startGame);
document.addEventListener("keydown", () => typingInput.focus());
inputs.addEventListener("click", () => typingInput.focus());