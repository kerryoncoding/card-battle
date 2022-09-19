

function shuffle() {
    let apiShuffle = `http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`;
    alert("shuffle");
    axios.get(apiShuffle).then(displayDeckId);
    document.querySelector("#button").innerHTML=`<button class="btn btn-secondary" id="play">Play Next Card</button>`;
    document.getElementById("play").addEventListener ("click", playCard);
};

function displayDeckId(response) {
    remaining_cards = response.data.remaining;
    console.log(remaining_cards);
    deck_name=response.data.deck_id;
    console.log(deck_name);
}

function playCard() {
    alert("next Card");
    let apiDraw = `http://deckofcardsapi.com/api/deck/${deck_name}/draw/?count=2`;
    axios.get(apiDraw).then(battle);
}

function battle(cards) {
    console.log(cards);
    console.log(cards.data.remaining);
    let cardsRemaining = document.querySelector("#card-count");
    cardsRemaining.innerHTML = cards.data.remaining;
    let computerCard= document.querySelector("#computer");
    computerCard.innerHTML = `<img src=${cards.data.cards[0].image}>`;
    let playerCard= document.querySelector("#player");
    playerCard.innerHTML = `<img src=${cards.data.cards[1].image}>`; 
}


let deck_name = null;
let remaining_cards= null;

document.getElementById("newGame").addEventListener ("click", shuffle);
