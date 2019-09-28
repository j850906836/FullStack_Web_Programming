class ResultsScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.backToMenuContainer = containerElement.querySelector(".to-menu");
    this.percentContainer = containerElement.querySelector(".percent");
    this.correctContainer = containerElement.querySelector(".correct");
    this.IncorrectContainer = containerElement.querySelector(".incorrect");
    this.continueContainer = containerElement.querySelector(".continue");
    this.storeScoreContainer = containerElement.querySelector(".storeScore");
    this.flag_percent;
    this.backToMenuContainer.addEventListener('click', this.backtoMenu);

}
backtoMenu() {
  cardTotal = 0;
  this.flag_percent = 0;
  wrongCards = [];
  document.body.style.backgroundImage = "url('https://www.reviewgeek.com/thumbcache/2/200/40d2d1911ab4c74c596d316902194b0a/p/uploads/2018/08/1b6b0fd0.jpg')";
  app.flashcards.show_value = [];
  document.querySelector(".correct").textContent = "0";
  document.querySelector(".incorrect").textContent = "0";
  app.results.hide();
  app.flashcards.hide();
  app.storesuc.classList.add("inactive");
  app.menu.show();
}

show(num_correct, num_wrong) {
  	let perc = Math.ceil(num_correct/(num_correct + num_wrong)*100);
    this.containerElement.classList.remove('inactive');
    document.body.style.backgroundColor = '#d0e6df';
    document.querySelector(".percent").textContent = perc;
  	document.querySelectorAll(".correct")[1].textContent = num_correct;
  	document.querySelectorAll(".incorrect")[1].textContent = num_wrong;
    this.flag_percent=0;
    const la = document.querySelector("#la");
    const lp = document.querySelector("#lp");
    const arr = [la.value, lp.value];

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(arr)
        }).then(function(res){
          return res.json();
        }).then(function(js){
        if(js.response == "success"){
          document.getElementById("show_name").innerHTML=la.value + "，您之前的分數為:" + `${js.Score}` + "分";
        }
        else{
          document.getElementById("show_name").innerHTML = "您好，要先登入才能記錄分數";
        }
       })

  	if (perc === 100) {
      this.flag_percent = 1;
  		this.continueContainer.textContent = "再次測驗";
  		this.continueContainer.addEventListener('click', this.perfect);
  	} else {
      this.flag_percent = 0;
			this.continueContainer.textContent = "完成錯誤選項";
			this.continueContainer.addEventListener('click', this.notperfect);
    }

    this.storeScoreContainer.addEventListener('click',this.storeScore);
}
storeScore() {
  const la = document.querySelector("#la");
  const lp = document.querySelector("#lp");
  let correct = document.querySelector(".correct").textContent;
  cardTotal = 0;
  this.flag_percent = 0;
  wrongCards = [];
  document.body.style.backgroundColor = '#d0e6df';
  app.flashcards.show_value = [];
  document.querySelector(".correct").textContent = "0";
  document.querySelector(".incorrect").textContent = "0";
  let score = correct/0.05;
  const arr = [la.value, lp.value, score];
  console.log(arr);
  fetch('/', {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(arr)
  })
  app.results.hide();
  app.flashcards.hide();
  app.storesuc.classList.remove("inactive");
  document.body.style.backgroundImage = "url('http://www.wendywl.uk/blog/wp-content/uploads/2017/08/hM8bEk9yc4tfGoTp5aheU2u01B3Bn9FJyI8ZRtgE.jpeg')";
  if(la.value != '') document.getElementById("score").innerHTML= "登記分數成功，分數為:" + score + "，回目錄繼續瀏覽";
  else document.getElementById("score").innerHTML= "登記分數成功，分數為:" + score + "，回目錄繼續瀏覽";
  app.results.hide();
  app.flashcards.hide();
  const backToMenuContainer = app.storesuc.querySelector(".to-menu");
  backToMenuContainer.addEventListener('click', app.results.backtoMenu);
}
perfect() {
      console.log(app.flashcards.which_deck);
    if((document.querySelector(".correct").textContent == 5)&&(app.flashcards.which_deck==1)) {
      console.log("correct in perfect:"+Number(document.querySelector(".correct").textContent));
      cardTotal = 0;
      app.flashcards.cardsGenerator(app.flashcards.which_deck);
      app.results.hide();
      app.flashcards.show();
  }
}
notperfect() {
    if((document.querySelector(".correct").textContent < 5)&&(app.flashcards.which_deck==1)) {
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
