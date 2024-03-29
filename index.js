
function shuffle() {
    let apiShuffle = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`;
    axios.get(apiShuffle).then(displayDeckId);
    document.querySelector("#button").innerHTML=`<button class="btn btn-secondary" id="play">Draw Cards</button>`;
    document.getElementById("play").addEventListener ("click", playCard);
};

function displayDeckId(response) {
    console.log(response);
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
    let cardsRemaining = document.querySelector("#card-count");
    cardsRemaining.innerHTML = cards.data.remaining;
    let computerCard= document.querySelector("#computer-card");
    computerCard.innerHTML = `<div class="computer-white" id="computer"><img src=${cards.data.cards[0].image} width="85%" id="computer-card"></div>`;
    let playerCard= document.querySelector("#player-card");
    playerCard.innerHTML = `<div class="player-white" id="player"><img src=${cards.data.cards[1].image} width="85%" id="player-card"></div>`;
    console.log(computer_value);
    
    computer_value = (cards.data.cards[0].value);   
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
        document.querySelector("#computer-score").innerHTML = `<span>${computer_score}</span>`;
        document.querySelector("#player-score").innerHTML = `<span>${player_score}</style>`;
        computerCard.innerHTML = `<div class="computer-win" id="computer"><img src=${cards.data.cards[0].image} width="85%" id="computer-card"></div>`
        playerCard.innerHTML = `<div class="player-white" id="player"><img src=${cards.data.cards[1].image} width="85%" id="player-card"></div>`;  
    } else { 
            if (Number(computer_value) < Number(player_value)){
            player_score = player_score + 2;
            document.querySelector("#player-score").innerHTML = `<span>${player_score}</style>`;
            document.querySelector("#computer-score").innerHTML = `<span>${computer_score}</span>`;
            playerCard.innerHTML = `<div class="player-win" id="player"><img src=${cards.data.cards[1].image} width="85%" id="player-card"></div>`;
            computerCard.innerHTML = `<div class="computer-white" id="computer"><img src=${cards.data.cards[0].image} width="85%" id="computer-card"></div>`;
            } else {
                computer_score = computer_score + 1;
                player_score = player_score + 1;
                document.querySelector("#computer-score").innerHTML = `<span>${computer_score}</span>`;
                document.querySelector("#player-score").innerHTML = `<span>${player_score}</style>`;
            }
        }


    if (cards.data.remaining < 2) {
        if (computer_score > player_score) {
           document.querySelector("#button").innerHTML=`<button class="btn btn-danger" id="GameOver">Game Over. Better luck next time.</button>`;
           computerCard.innerHTML = `<div class="computer-win" id="computer"><img src=${cards.data.cards[0].image} width="85%" id="computer-card"></div>`;
           playerCard.innerHTML = `<span style="font-size: 40px">Game Over<span><div class="col" id="button">
              <button class="btn btn-dark"  onclick="location.reload();">Try Again</button>
            </div>`;
        } else { 
        document.querySelector("#button").innerHTML=`<button class="btn btn-warning" id="GameOver">You are the winner!</button>`;
        playerCard.innerHTML = `<div class="player-win" id="player"><img src=${cards.data.cards[1].image} width="85%" id="player-card"></div>`;
        computerCard.innerHTML = `<span style="font-size: 40px">Game Over<span><div class="col" id="button">
              <button class="btn btn-dark"  onclick="location.reload();">Play Again</button>
            </div>`;
        }
    }         
    }


let deck_name = null;
let remaining_cards= null;
let computer_value = null;
let player_value = null;
let computer_score = 0;
let player_score = 0;
let winner = null;


document.getElementById("newGame").addEventListener ("click", shuffle);
