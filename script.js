const minNumberElement = document.querySelector('#min');
const maxNumberElement = document.querySelector('#max');
const guessNumberElement = document.querySelector('#number');
const messageElement = document.querySelector('#message');
const reactionElement = document.querySelector('#reaction');
const arrowElement = document.querySelector('.fa-solid');
const hiddenElements = document.querySelectorAll('.hidden-elements');

const minNumber = 0;
const maxNumber = 1000;

minNumberElement.textContent = `${minNumber}`;
maxNumberElement.textContent = `${maxNumber}`;
guessNumberElement.textContent = `💬`;


