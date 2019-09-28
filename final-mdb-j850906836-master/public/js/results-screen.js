// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class ResultsScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.backToMenuContainer = containerElement.querySelector(".to-menu");
    this.percentContainer = containerElement.querySelector(".percent");
    this.correctContainer = containerElement.querySelector(".correct");
    this.IncorrectContainer = containerElement.querySelector(".incorrect");
    this.continueContainer = containerElement.querySelector(".continue");
    this.flag_percent;
    this.backToMenuContainer.addEventListener('click', this.backtoMenu);
}
backtoMenu() {
  cardTotal = 0;
  this.flag_percent = 0;
  wrongCards = [];
  document.body.style.backgroundColor = '#d0e6df';
  app.flashcards.show_value = [];
  document.querySelector(".correct").textContent = "0";
  document.querySelector(".incorrect").textContent = "0";
  app.results.hide();
  app.flashcards.hide();
  app.menu.show();
}
show(num_correct, num_wrong) {
  	let perc = Math.ceil(num_correct/(num_correct + num_wrong)*100);
    document.querySelector(".percent").textContent = perc;
    //  this.percentContainer.textContent = perc;
  	document.querySelectorAll(".correct")[1].textContent = num_correct;
  	document.querySelectorAll(".incorrect")[1].textContent = num_wrong;
    this.flag_percent=0;

  	if (perc === 100) {
      this.flag_percent = 1;
  		this.continueContainer.textContent = "Start Over?";
  		this.continueContainer.addEventListener('click', this.perfect);
  	} else {
      this.flag_percent = 0;
			this.continueContainer.textContent = "Continue";
			this.continueContainer.addEventListener('click', this.notperfect);
    }
    this.containerElement.classList.remove('inactive');
}
perfect() {
      console.log(app.flashcards.which_deck);
    if(((document.querySelector(".correct").textContent == 5)&&(app.flashcards.which_deck==0))||((document.querySelector(".correct").textContent == 7)&&(app.flashcards.which_deck!=0))) {
      console.log("correct in perfect:"+Number(document.querySelector(".correct").textContent));
      cardTotal = 0;
      app.flashcards.cardsGenerator(app.flashcards.which_deck);
      app.results.hide();
      app.flashcards.show();
  }
}
notperfect() {
    if(((document.querySelector(".correct").textContent < 5)&&(app.flashcards.which_deck==0))||((document.querySelector(".correct").textContent < 7)&&(app.flashcards.which_deck!=0))) {
    let tempKeys = [];
    let tempValues = [];

    console.log("correct:"+Number(document.querySelector(".correct").textContent));

    document.querySelector(".incorrect").textContent = "0";

    for (let i = 0; i < wrongCards.length; i ++) {
        tempKeys.push(wrongCards[i][0]);
        tempValues.push(wrongCards[i][1]);
      }
      app.flashcards.show_value = [tempKeys, tempValues];

      cardTotal = 0;
      wrongCards = [];

      app.results.hide();
      app.flashcards.show();
    }
}
  hide() {
    this.containerElement.classList.add('inactive');
  }
}
