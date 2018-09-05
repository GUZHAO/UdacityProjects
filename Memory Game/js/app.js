/*
 * Create a list that holds all of your cards
 */
let card = document.getElementsByClassName('card');
let cardList = [...card];

//initiate reset related variables
let counter = document.querySelector('.moves');
counter.innerHTML = 'Not Started';
let timeIt = document.getElementById('seconds');
let move = 0;
let stars = 3;
let points = 0;
let timeCount = 0;
let timeInterval = 0;
//initiate an array for opened cards
let openedCard = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

let shuffledDeck = shuffle(cardList);
let addDeck = document.querySelector('.deck');
for (let aCard of shuffledDeck) {
    aCard.classList.remove('open', 'show', 'match');
    addDeck.appendChild(aCard);
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

for (let aCard of shuffledDeck) {
    aCard.addEventListener('click', flip);
    aCard.addEventListener('click', check);
}

function flip() {
    this.classList.toggle('open');
    this.classList.toggle('show');
    this.style.pointerEvents = 'none';
}

function check() {
    openedCard.push(this);
    if (openedCard.length === 2) {
        count();
        // if (openedCard[0].isEqualNode(openedCard[1])) {
        if (openedCard[0].innerHTML === openedCard[1].innerHTML) {
            match();
            points++;
        }
        else {
            setTimeout(mismatch,1000);
            freeze();
        }
        setTimeout(unfreeze, 1000);
        setTimeout(score, 1000);

    }
}

function match() {
    openedCard.forEach(function (element) {
        element.classList.add('match');

        // element.classList.remove('open', 'show');
        // element.style.pointerEvents = 'none';
    });
    openedCard = [];
}

function mismatch() {
    openedCard.forEach(function (element) {
        element.classList.remove('open', 'show');
    });
    openedCard = [];
}

function freeze() {
    for (let element of shuffledDeck) {
        element.style.pointerEvents = 'none';
    }
}

function unfreeze() {
    for (let element of shuffledDeck) {
        if (!element.classList.contains('match')) {
            element.style.pointerEvents = 'auto';
        }
    }
}

function count() {
    move++;
    counter.innerHTML = move;
    if (move > 12 && move <= 24) {
        document.getElementById('thirdStar').classList.remove('fas', 'fa-star');
        document.getElementById('thirdStar').classList.add('far', 'fa-star');
        stars = 2;
    } else if (move > 24) {
        document.getElementById('secondStar').classList.remove('fas', 'fa-star');
        document.getElementById('secondStar').classList.add('far', 'fa-star');
        stars = 1;
    }
}

let modal = document.getElementById('myModal');
let span = document.getElementsByClassName('close')[0];
let scoreMsg = document.getElementsByClassName('score')[0];

function score() {
    if (points === 8) {
        scoreMsg.innerHTML = 'Nice job! You star rating is ' + stars + ' and you used ' + move + ' moves in ' + timeCount + ' seconds to finish the game.';
        modal.style.display = "block";
        stopTimer();
    }
}

span.onclick = function () {
    modal.style.display = "none";
};

// window.onclick = function (event) {
//     if (event.target === modal) {
//         modal.style.display = "none";
//     }
// };

addDeck.addEventListener('click', triggerTimer, {once: true});

function triggerTimer() {
    timeInterval = setInterval(startTimer, 1000);
}

function startTimer() {
    timeCount++;
    timeIt.innerText = "You have been playing for " + timeCount + " seconds.";
}

function stopTimer() {
    clearInterval(timeInterval);
}