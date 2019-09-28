// This class will represent the menu screen that you see when you first load
// the music visualizer.
//
// See HW4 writeup for more hints and details.
class MenuScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    function onJsonReady(json) {
        const songs = json;
        const themes = ['candy', 'charlie brown', 'computers', 'dance', 'donuts', 'hello kitty', 'flowers', 'nature', 'turtles', 'space'];
        const select = document.getElementById("song-selector");
        const enter_theme = document.getElementById("query-input");
        let random = getRandomInt(themes.length);
    //    console.log(themes[random]);
        enter_theme.setAttribute("value",themes[random]);
        for(let i of Object.keys(songs)){
          select.options[select.options.length] = new Option(songs[i].title,songs[i].songUrl);
    //      console.log(songs[i].title);
      }
    }
    function onResponse(response) {
      return response.json();
    }
    fetch('https://fullstackccu.github.io/homeworks/hw4/songs.json')
      .then(onResponse)
      .then(onJsonReady);
    // TODO(you): Implement the constructor and add fields as necessary.
  }


  show() {
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
