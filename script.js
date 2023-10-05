window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();


const minNumberElement = document.querySelector('#min');
const maxNumberElement = document.querySelector('#max');
const guessNumberElement = document.querySelector('#number');
const messageElement = document.querySelector('#message');
const reactionElement = document.querySelector('#reaction');
const buttonElement = document.querySelector('#button');
const arrowElement = document.querySelector('.fa-solid');
const hiddenElements = document.querySelectorAll('.hidden-elements');

const minNumber = 0;
const maxNumber = 1000;
const secretNumber = Math.floor(((maxNumber+1-minNumber)*Math.random())+minNumber);
console.log(secretNumber);
let guess;
let lastGuess = 10000;

minNumberElement.textContent = `${minNumber}`;
maxNumberElement.textContent = `${maxNumber}`;
guessNumberElement.textContent = `💬`;

function result(guess){

    const result = compareNumbers(guess);
    console.log(result ? 'Você acertou!!!' : 'Você errou...');
        
    guessNumberElement.textContent = guess;

}

function compareNumbers(guess){

    console.log(`${guess} - ${secretNumber}`)
    
    if(guess === secretNumber){
        console.log('>>>>');
        guessRightMessage(guess);
        return true;
    }
    updateMessage(guess);
    lastGuess = guess;
    return false
}

function updateMessage(guess){

    const maxDif = maxNumber-minNumber;
    const guessDif = Math.abs(guess - secretNumber);
    const proximity = guessDif/maxDif;
    const maior = (guess - secretNumber) > 0 ? true : false;

    unhideAllElements();

    switch(true){

        case (proximity < 0.05): reactionElement.textContent = '😱'; break;
        case (proximity < 0.1): reactionElement.textContent = '😨'; break;
        case (proximity < 0.15): reactionElement.textContent = '🫣'; break;
        case (proximity < 0.25): reactionElement.textContent = '🫢'; break;
        case (proximity < 0.5): reactionElement.textContent = '😌'; break;
        case (proximity >= 0.5): reactionElement.textContent = '🥱'; break;
    }

    if(maior){

        messageElement.textContent = "O número é menor!";
        arrowElement.classList.add('fa-angles-down');
        arrowElement.classList.remove('fa-angles-up');
    }
    else{

        messageElement.textContent = "O número é maior!";
        arrowElement.classList.add('fa-angles-up');
        arrowElement.classList.remove('fa-angles-down');
    }
}

function guessRightMessage(guess){

    unhideAllElements();

    recognition.abort();
    recognition.stop();
    buttonElement.toggleAttribute('hidden');

    const maxDif = maxNumber-minNumber;
    const lastGuessDif = Math.abs(lastGuess - secretNumber);
    const proximity = lastGuessDif/maxDif;

    switch(true){

        case (proximity > 1): reactionElement.textContent = '🤯'; break;
        case (proximity > 0.25): reactionElement.textContent = '😯'; break;
        case (proximity > 0.1): reactionElement.textContent = '🥳'; break;
        case (proximity > 0): reactionElement.textContent = '😮‍💨'; break;
    }

    arrowElement.classList.remove('fa-angles-up');
    arrowElement.classList.remove('fa-angles-down');

    switch(true){

        case (proximity > 1): messageElement.textContent = "Como assim?! Acertou!!!"; break;
        case (proximity > 0.25): messageElement.textContent = "Acertou!!! Belo chute!"; break;
        case (proximity > 0.1): messageElement.textContent = "Acertou!!!"; break;
        case (proximity > 0): messageElement.textContent = "Aleluia! Finalmente acertou!"; break;
    }
}

function unhideAllElements(){

    hiddenElements.forEach((h)=>{

        h.removeAttribute('hidden');
    });
}

buttonElement.addEventListener('click',() => {

    buttonElement.toggleAttribute('hidden');
    location.reload();
});
