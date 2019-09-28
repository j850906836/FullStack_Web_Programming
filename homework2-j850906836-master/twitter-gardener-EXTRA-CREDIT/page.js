// TODO(you): Add your own positive messages if you'd like!
const POSITIVE_MESSAGES = [
  'You are worthy.',
  'You are enough.',
  'Be kind and forgiving to yourself.',
  'You are amazing.',
  'It\'s okay not to be okay.',
  'It\'s enough to just breathe.',
  'You are loved.',
  'I believe in you.',
  'You can do it!',
  'You are not a failure.',
  'You matter.',
  'Your life matters.'
];
const CURSOR_URL = chrome.runtime.getURL('images/rose-cursor.gif');
const BACKGROUD_URL = chrome.runtime.getURL('images/sparkle.gif');

chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(onMessage);
});

function startGardening() {
  const tweets = document.querySelectorAll('.tweet');
  for(let tweet of tweets) {
    tweet.style.cursor = 'url(' + CURSOR_URL + ') 4 12, auto';
    tweet.addEventListener('mouseover',onMouseover);
    tweet.addEventListener('mouseout',onMouseout);
    tweet.addEventListener('click',onClick);
  //  console.log("start");
  }
}
function onMouseover(event) {
  const tweet = event.currentTarget;
  tweet.style.backgroundImage = 'url(' + BACKGROUD_URL + ') ';
  tweet.style.opacity = 0.8;
}
function onMouseout(event) {
  const tweet = event.currentTarget;
  tweet.style.backgroundImage = '';
  tweet.style.opacity = '';
}
function onClick(event) {
//  event.stopPropagation();
  const tweet = event.currentTarget;
  event.stopPropagation();
  const text = tweet.querySelector('.tweet-text');
  let i = Math.floor(Math.random() * POSITIVE_MESSAGES.length);
  text.textContent = POSITIVE_MESSAGES[i];
  console.log(text.textContent);
}
function stopGardening() {
  const tweets = document.querySelectorAll('.tweet');
  for(let tweet of tweets) {
    tweet.style.cursor = '';
    tweet.removeEventListener('mouseover',onMouseover);
    tweet.removeEventListener('mouseout',onMouseout);
    tweet.removeEventListener('click',onClick);
  }
}
function onMessage(gardeningInProgress) {
  if(gardeningInProgress) {
    startGardening();
  }
  else {
    stopGardening();
  }
}
