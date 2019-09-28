// This class will represent the gif display area. It keeps track of which gif
// is being shown and can select a new random gif to be shown.
//
// See HW4 writeup for more hints and details.
class GifDisplay {
  constructor(theme) {
    var search = "https://api.giphy.com/v1/gifs/search?q=";
    this.url = search + theme + "&api_key=gm2ZMlRhxG54KrlmuhJ8J4O2SREJW4G7&limit=25&rating=g";
    this.SetBackground=this.SetBackground.bind(this);
    this.ChangeBackground=this.ChangeBackground.bind(this);
    this.getRandomInt=this.getRandomInt.bind(this);
    this.GetGIF=this.GetGIF.bind(this);
    this.front = document.querySelector('#fore');
    this.front.style.zIndex=3;
    this.back = document.querySelector('#back');
    this.back.style.zIndex=2;
    this.preload = document.querySelector('#preload');
    this.gifUrl = "";
    this.GIFData = [];
    this.LoadGIF = [];
    this.GIFLength = 0;
    this.Random = 0;
    this.ifConstruct = true;

    console.log(this.GIFData);

  }
  // TODO(you): Add methods as necessary.

async SetBackground(theme,MusicScreen){
    this.parent = MusicScreen;
    await this.GetGIF(theme);
    if(this.ifConstruct==false) return;
    let random = getRandomInt(this.GIFLength);
  //  console.log("random"+random);
    this.Random = random;
    console.log(this.GIFData[random]);
    this.gifUrl = this.GIFData[random];
    if(this.front.style.backgroundImage!=null) this.preload.style.display = "none";
    else this.preload.style.display = "block";
    this.front.style.backgroundImage="url('"+this.gifUrl+"')";
    console.log(this.GIFData[random]);
    this.back.style.backgroundImage="url('"+this.GIFData[(random+1)%this.GIFLength]+"')";
}
async GetGIF(theme) {

    var search = "https://api.giphy.com/v1/gifs/search?q=";
    this.url = search + theme + "&api_key=gm2ZMlRhxG54KrlmuhJ8J4O2SREJW4G7&limit=25&rating=g";

    var gifArray = [];
    var flag = 0;
    let i=0;
    function onJsonReady(json) {
      if( json.data.length < 2 || json == null ) {
          flag = 1;
      }
      for(let i=0 ;i < json.data.length; i++)  {
        gifArray[i] = json.data[i].images.downsized.url;
      }
    }

    function onResponse(response) {
      return response.json();
    }
    await fetch(this.url)
      .then(onResponse)
      .then(onJsonReady);
    if(flag == 1){
      this.ifConstruct=false;
      this.parent.TooSmall();
      return;
    }
    this.GIFData = gifArray;
    this.GIFLength = this.GIFData.length;

  }

   ChangeBackground(){
     this.preload.style.display = "block";
    if(this.front.style.zIndex==3) {
      this.front.style.zIndex = 2;
      this.back.style.zIndex = 3;
      let random = getRandomInt(this.GIFLength);
      if(this.Random == random) this.Random++;
      else this.Random = random;
      this.gifUrl = this.GIFData[this.Random];
      console.log(this.GIFData[random]);
      if(this.front.style.backgroundImage!=null) this.preload.style.display = "none";
      else this.preload.style.display = "block";
      this.front.style.backgroundImage="url('"+this.gifUrl+"')";
      console.log("front"+this.Random);
    }
    else{
      this.front.style.zIndex = 3;
      this.back.style.zIndex = 2;
      let random = getRandomInt(this.GIFLength);
      if(this.Random == random) this.Random++;
      else this.Random = random;
      this.gifUrl = this.GIFData[this.Random];
      if(this.back.style.backgroundImage!=null) this.preload.style.display = "none";
      else this.preload.style.display = "block";
      this.back.style.backgroundImage="url('"+this.gifUrl+"')";
      console.log("back"+this.Random);
    }
  }
  getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
  }

}
