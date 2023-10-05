recognition.lang = 'pt-Br';

recognition.continuous = true;

recognition.start();

recognition.onresult = (event) => {

    try{

        unhideAllElements();
        const guess = Number(event.results[event.results.length-1][0].transcript);
        if(isNaN(guess)) throw new Error('Só consigo entender números');
        console.log(guess);
        result(guess);
    }
    catch(error){

        messageElement.textContent = "Só consigo entender números...";
        reactionElement.textContent = "😒";
        if(!arrowElement.parentElement.hasAttribute('hidden')) arrowElement.parentElement.toggleAttribute('hidden');
    }
};
