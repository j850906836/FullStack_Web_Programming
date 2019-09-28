// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields
var wrongCards = [];
var cardTotal = 0;

class FlashcardScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    document.querySelector(".correct").textContent = "0";
    document.querySelector(".incorrect").textContent = "0";
    this.which_deck = -1;
    this.show_value = [];
    this.wrongCards = [];
    this.cardTotal = 0;
  }

  show() {
    const flashcardContainer = document.querySelector('#flashcard-container');
    flashcardContainer.innerHTML ="";
    new Flashcard(flashcardContainer,this.show_value[0][cardTotal], this.show_value[1][cardTotal]);
    this.containerElement.classList.remove('inactive');
    document.body.style.backgroundImage = "url('')";
    document.body.style.backgroundColor = '#d0e6df';
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
  cardsGenerator(which_deck) {
    this.which_deck = which_deck;
    this.show_value = [Object.keys(FLASHCARD_DECKS[which_deck].words), Object.values(FLASHCARD_DECKS[which_deck].words)];
    document.querySelector(".correct").textContent = "0";
    document.querySelector(".incorrect").textContent = "0";
  }
}
