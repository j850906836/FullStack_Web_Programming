var chosen_num = 0;
var ans = new Array(3);

function choose (term){
    if(chosen_num < 3) {
      var x = document.getElementById(term);
      var chosen = document.querySelectorAll("[data-question-id='"+ x.dataset.questionId + "']");

      for(let i=0; i<chosen.length; i++) {
        if(chosen[i].dataset.choiceId == x.dataset.choiceId) {
             chosen[i].style.opacity = 1.0;
        	   chosen[i].style.backgroundColor = "#cfe3ff";
					   chosen[i].innerHTML = chosen[i].innerHTML.substring(0,chosen[i].innerHTML.indexOf("checkbox")) + 'checkbox" src="images/checked.png"/>';
        }
        else {
          if (chosen[i].style.opacity != 0.6) {
					   chosen[i].style.opacity = 0.6;
					   chosen[i].style.backgroundColor = "#f4f4f4";
					   chosen[i].innerHTML = chosen[i].innerHTML.substring(0,chosen[i].innerHTML.indexOf("checkbox")) + 'checkbox" src="images/unchecked.png"/>';
           }
         }
      }
      if(chosen_num < 3) {
          if(x.dataset.questionId == "one" ){
              ans[0] = x.dataset.choiceId;
          }
          else if (x.dataset.questionId == "two" ) {
              ans[1] = x.dataset.choiceId;
          }
          else {
              ans[2] = x.dataset.choiceId;
          }
      }
      if(ans[0]!= null && ans[1]!= null && ans[2]!= null) {
          if(ans[0]!=ans[1] && ans[1]!=ans[2] && ans[0]!= ans[2]) {
              ans[2] = ans[0];
          }
          else if(ans[0] == ans[1]) {
              ans[2] = ans[0];
          }
          chosen_num = 3;
      }
    }
    if(chosen_num == 3) {
        let result = RESULTS_MAP[ans[2]];
        document.getElementById("result_title").style.display = "block";
        document.getElementById("result_content").style.display = "block";
        document.getElementById("result_title").innerHTML = "You got: " + result.title;
        document.getElementById("result_content").innerHTML = result.contents;
      }
};

function restart() {
  chosen_num = 0;
  ans[0] = ans[1] = ans[2] = null;
  var cnt = ["one","two","three"];
  for(let j=0; j<3; j++) {
    var clear = document.querySelectorAll("[data-question-id='"+cnt[j]+"']");
    for(let i=0; i<9; i++) {
      clear[i].style.opacity = 1.0;
      clear[i].style.backgroundColor = "#f4f4f4";
      clear[i].innerHTML = clear[i].innerHTML.substring(0,clear[i].innerHTML.indexOf("checkbox")) + 'checkbox" src="images/unchecked.png"/>';
    }
  }
    document.getElementById("result_title").style.display = "none";
    document.getElementById("result_content").style.display = "none";
    document.documentElement.scrollTop = document.body.scrollTop =0;
};
