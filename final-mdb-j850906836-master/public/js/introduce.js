class Introduction{
  constructor(containerElement){
    this.containerElement = containerElement;
    this.backToMenuContainer = containerElement.querySelector(".to-menu");
    this.ToDemovideoContainer = containerElement.querySelector(".to-demo");
    this.backToMenuContainer.addEventListener('click', this.backtoMenu);
    this.ToDemovideoContainer.addEventListener('click', this.toDemo);
  }
  toDemo() {
    app.introduce.hide();
    app.demovideo.show();
  }
  backtoMenu() {
    app.introduce.hide();
    app.menu.show();
  }
  show() {
    document.body.style.backgroundImage = "url('../public/images/coffee_5.jpg')";
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
    document.body.style.backgroundImage = "url('../public/images/coffee_3.jpg')";
  }
}
