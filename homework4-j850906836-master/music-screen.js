// This class will represent the music visualizer screen, i.e. the screen that
// you see after you select a song.
//
// This class should create and own:
//   - 1 AudioPlayer
//   - 1 GifDisplay
//   - 1 PlayButton
//
// See HW4 writeup for more hints and details.
class MusicScreen {
  constructor(musicElement) {
  	this.song;
  	this.url;
    this.musicElement = musicElement;
    var gifElement=document.querySelector('#player');
    this.Hide=this.hide.bind(this);
    this.Show=this.show.bind(this);
    this._onKick=this._onKick.bind(this);

    this.GifDisplay = new GifDisplay(gifElement);
  }

  hide() {
  	this.musicElement.classList.add('inactive');
  }

  async show (music,gif,App) {
    this.parent = App;
    this.url = music;
    this.musicElement.classList.remove('inactive');
    var buttonElement=document.querySelector('#ControlBar');
    this.Button = new PlayButton(buttonElement);
    this.audioPlayer = new AudioPlayer();
    this.audioPlayer.setSong(music);
    this.playing = true;
    this.audioPlayer.play();
    this.audioPlayer.setKickCallback(this._onKick);
    this.toggle = this.toggle.bind(this);
    this.container = document.querySelector("img");
    this.container.addEventListener('click',this.toggle);
    this.GifDisplay.SetBackground(gif,this);
  }
  toggle(event) {
    if(this.playing == true) {
      this.pause();
    }
    else {
      this.play();
    }
    this.playing = !this.playing;
  }

  play() {
    this.container.src = "images/pause.png";
    this.audioPlayer.setSong(this.url);
    this.audioPlayer.play();
  }

  pause() {
    this.container.src = "images/play.png";
    this.audioPlayer.pause();
  }
  _onKick() {
   console.log('kick!');
   this.GifDisplay.ChangeBackground();
 }
  TooSmall() {
    this.parent.NoGIF();
  }
}
