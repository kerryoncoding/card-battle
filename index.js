

function shuffle() {
    let apiShuffle = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`;
    alert("New deck has been shuffled");
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
    let apiDraw = `https://deckofcardsapi.com/api/deck/${deck_name}/draw/?count=2`;
    axios.get(apiDraw).then(battle);
}




function battle(cards) {
    console.log(cards);
    console.log(cards.data.remaining);
    let cardsRemaining = document.querySelector("#card-count");
    cardsRemaining.innerHTML = cards.data.remaining;
    let computerCard= document.querySelector("#computer");
    computerCard.innerHTML = `<img src=${cards.data.cards[0].image} width="75%">`;
    let playerCard= document.querySelector("#player");
    playerCard.innerHTML = `<img src=${cards.data.cards[1].image} width="75%">`; 
        
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
                computer_score = computer_score + 1;
                player_score = player_score + 1;
            }
        }


    if (cards.data.remaining < 2) {
      /*  alert("final play");  */
        if (computer_score > player_score) {
           document.querySelector("#button").innerHTML=`<button class="btn btn-danger" id="GameOver">Game Over. Better luck next time.</button>`;
        } else { 
        document.querySelector("#button").innerHTML=`<button class="btn btn-warning" id="GameOver">You are the winner!</button>`;
        }
    } 

/*
function moveLeft() {
    alert("push left");
}

function moveRight(){
    alert("push right");
}

function split() {
    alert("split");
}
*/
        
    }






let deck_name = null;
let remaining_cards= null;
let computer_value = null;
let player_value = null;
let computer_score = 0;
let player_score = 0;
let winner = null;


document.getElementById("newGame").addEventListener ("click", shuffle);
