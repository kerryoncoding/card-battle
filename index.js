

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
        
    computer_value = (cards.data.cards[0].value);
    console.log(computer_value);
    console.log(typeof (computer_value));
    console.log(computer_score);
    
    
    if (computer_value === `JACK`) {
        computer_value = "11";
    }

    if (computer_value === `QUEEN`) {
        computer_value = "12";
    }

    if (computer_value === `KING`) {
        computer_value = "13";
    }
     if (computer_value === `ACE`) {
        computer_value = "14";
    }

    player_value = (cards.data.cards[1].value);
    console.log(player_value);    
    
    if (player_value === `JACK`) {
        player_value = "11";
    }

    if (player_value === `QUEEN`) {
        player_value = "12";
    }

    if (player_value === `KING`) {
        player_value = "13";
    }
     if (player_value === `ACE`) {
        player_value = "14";
    }

    if (Number(computer_value) > Number(player_value)) {
        computer_score = computer_score + 2;
        document.querySelector("#computer-score").innerHTML = computer_score;} else { 
            if (Number(computer_value) < Number(player_value)){
            player_score = player_score + 2;
            document.querySelector("#player-score").innerHTML = player_score;
            } else {
                alert("draw");
            }
        }
        
   
 

}



let deck_name = null;
let remaining_cards= null;
let computer_value = null;
let player_value = null;
let computer_score = 0;
let player_score = 0;


document.getElementById("newGame").addEventListener ("click", shuffle);
