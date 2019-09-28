// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class Flashcard {
  constructor(containerElement, frontText, backText) {
    this.containerElement = containerElement;
    this.origin = [null,null];
    this.change = [0,0];
    this.translate = [0,0];
    this.totalTranslate = [0,0];
    this.dragging = false;
    this.id;
    this.correctNum;
    this.incorrectNum;
    this.correctplus;
    this.incorrectplus;
    this._flipCard = this._flipCard.bind(this);
    this._dragStart = this._dragStart.bind(this);
    this._dragMove = this._dragMove.bind(this);
    this._dragEnd = this._dragEnd.bind(this);

    this.flashcardElement = this._createFlashcardDOM(frontText, backText);
    this.containerElement.append(this.flashcardElement);

    this.flashcardElement.addEventListener('pointerup', this._flipCard);
    this.flashcardElement.addEventListener('pointerdown', this._dragStart);
    this.flashcardElement.addEventListener('pointermove', this._dragMove);
    this.flashcardElement.addEventListener('pointerup', this._dragEnd);
  }

  _createFlashcardDOM(frontText, backText) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('flashcard-box');
    cardContainer.classList.add('show-word');

    const wordSide = document.createElement('div');
    wordSide.classList.add('flashcard');
    wordSide.classList.add('word');
    wordSide.textContent = frontText;

    const definitionSide = document.createElement('div');
    definitionSide.classList.add('flashcard');
    definitionSide.classList.add('definition');
    definitionSide.textContent= backText;

    cardContainer.appendChild(wordSide);
    cardContainer.appendChild(definitionSide);
    return cardContainer;
  }

  _flipCard(event) {
    this.flashcardElement.classList.toggle('show-word');
  }

  _dragStart(event) {
    this.origin[0] = event.clientX;
    this.origin[1] = event.clientY;
    this.origincorrectNum = Number(document.querySelector(".correct").textContent);
    this.originincorrectNum = Number(document.querySelector(".incorrect").textContent);
    this.correctNum = Number(document.querySelector(".correct").textContent)+1;
    this.incorrectNum = Number(document.querySelector(".incorrect").textContent)+1;
    this.correctplus = 0;
    this.incorrectplus = 0;
    event.target.style.transition = '';
    console.log("X "+this.origin[0]);
    console.log("Y "+this.origin[1]);

    this.dragging = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    clearInterval(this.id);
  }

  _dragMove(event) {
    if (!this.dragging) {
      return;
    }
    event.target.style.transition = '';
    event.preventDefault();
    this.translate[0] = this.change[0] + event.clientX - this.origin[0];
    this.translate[1] = this.change[1] + event.clientY - this.origin[1];
    this.totalTranslate[0] += this.translate[0];
    this.totalTranslate[1] += this.translate[1];
    event.currentTarget.style.transform = 'translate(' +  this.translate[0] + 'px,' +  this.translate[1] + 'px) ' ;
    let rotateAngle = 0.2*(event.clientX - this.origin[0]);
    event.currentTarget.style.transform += 'rotate(' + rotateAngle + 'deg)';


    if(event.clientX - this.origin[0] > 150) {
      document.querySelector(".correct").textContent = this.correctNum;
      this.correctplus++;
    }
    if(event.clientX - this.origin[0] < -150) {
      document.querySelector(".incorrect").textContent = this.incorrectNum;
      this.incorrectplus++;
    }
    if (event.clientX - this.origin[0] > 150||event.clientX - this.origin[0] < -150) {
    	document.body.style.backgroundColor = '#97b7b7';
    } else {
      if(this.correctplus>0) document.querySelector(".correct").textContent = this.origincorrectNum;
      if(this.incorrectplus>0) document.querySelector(".incorrect").textContent = this.originincorrectNum;
    	document.body.style.backgroundColor = '#d0e6df';
    }

  }

  _dragEnd(event) {
  	this.dragging = false;
  	if (event.clientX - this.origin[0] > 150||event.clientX - this.origin[0] < -150){
      if((event.clientX - this.origin[0] > 150) && (document.querySelector(".correct").textContent == this.correctNum))
          document.querySelector(".correct").textContent = this.origincorrectNum;
      if((event.clientX - this.origin[0] < -150) && (document.querySelector(".incorrect").textContent == this.incorrectNum))
          document.querySelector(".incorrect").textContent = this.originincorrectNum;
  		let yn;
  		cardTotal ++;
  	  if (event.clientX - this.origin[0] > 150){
  			yn = document.querySelector(".correct");
  	  } else if (event.clientX - this.origin[0] < -150) {
  	  	yn = document.querySelector(".incorrect");

  	  	wrongCards.push([app.flashcards.show_value[0][cardTotal-1],app.flashcards.show_value[1][cardTotal-1]]);
  		}
      console.log(yn);

  		let ynNum = yn.textContent;
  		yn.textContent=Number(ynNum)+1;

  		if (cardTotal === app.flashcards.show_value[0].length) {
  			app.flashcards.hide();
  			app.results.show(Number(document.querySelector(".correct").textContent), Number(document.querySelector(".incorrect").textContent));

  		} else {
  			app.flashcards.show();
  		}

    } else {
    	this.change[0] = this.totalTranslate[0]/600;
    	this.change[1] = this.totalTranslate[1]/600;
      event.target.style.transition = '0.6s';
    	event.target.style.transform = '';
    }
  }
}
