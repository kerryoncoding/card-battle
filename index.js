

function shuffle() {
    let apiShuffle = 'http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
    alert("shuffle");
    axios.get(apiShuffle).then(displayDeckId);
};

function displayDeckId(response) {
    remaining_cards = response.data.remaining;
    console.log(remaining_cards);
    deck_name=response.data.deck_id;
    console.log(deck_name);
}

function playCard() {
    alert("next Card");
}

let deck_name = null;
let remaining_cards= null;

document.getElementById("start").addEventListener ("click", shuffle);


document.getElementById("play").addEventListener ("click", playCard);