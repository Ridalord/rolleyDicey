/*
GAME RULES:

- The game has two players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his round score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his round score gets added to his GLOBAL score. After that, it's the next player's turn
- the first player to reach 100 points on GLOBAL score wins the game  

*/

var score, roundScore, activePlayer, dice, gamePlaying, lastDice, computer, friendly;
const wrapper = document.querySelector(".wrapper")
const friendBtn = document.querySelector(".btn-friend")
const computerBtn = document.querySelector(".btn-computer")
const instructions =  document.querySelector(".instructions")


wrapper.style.display = 'none'
friendBtn.addEventListener("click", () => {
    friendly = true
    init();
    instructions.style.display = 'none'
    wrapper.style.display = 'block'
})
computerBtn.addEventListener("click", () => {
    friendly = false
    init();
    instructions.style.display = 'none'
    wrapper.style.display = 'block'
    document.getElementById("name-1").textContent = "Computer"
    if (computer) {
        console.log("You Challenged Computer")
    }
})

document.querySelector(".btn-roll").addEventListener("click", function () {
    if(gamePlaying) {
        document.querySelector(".dice").style.display = "block";
        var dice = Math.floor(Math.random() * 6) + 1;
        diceDOM = document.querySelector(".dice");
        diceDOM.src = "img/dice-" + dice + ".png";

        if (lastDice === 6 && dice === 6) {
            score[activePlayer] = 0;
            document.querySelector("#score-" + activePlayer).textContent = score[activePlayer];
        }
        if (dice !== 1) {
            roundScore += dice;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        }
        else {
            if (friendly) {
                nextPlayer();
            } else {
                computerPlay();
            }
        }   
        lastDice = dice;
    }
})


document.querySelector(".btn-hold").addEventListener("click", function () {
    if(gamePlaying) {
        score[activePlayer] += roundScore;
        document.querySelector("#score-" + activePlayer).textContent = score[activePlayer];
        var winningScore = document.querySelector(".winningScore").value;
        
        if (winningScore) {
            var input = winningScore;
        }
        else {
            input = 100;
        }
        if (score[activePlayer] >= input) {
            document.querySelector("#name-" + activePlayer).textContent = "Winner!"
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;
        }
        else {
            if (friendly) {
                nextPlayer();
            } else {
                if (activePlayer === 1) {
                    nextPlayer()
                } else {
                    computerPlay()
                }
            }
        }   
    }
})
document.querySelector(".btn-new").addEventListener("click", init);
function init() {
    score = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true
    friendly ? computer = false : computer = true;
    wrapper.style.display = 'none'
    instructions.style.display = 'block'
    document.querySelector(".dice").style.display = "none";
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.querySelector(".winningScore").value = "";

    document.querySelector("#name-0").textContent = "Player 1";
    document.querySelector("#name-1").textContent = "Player 2";

    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.add("active");
};
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.querySelector(".player-0-panel").classList.toggle('active');
    document.querySelector(".player-1-panel").classList.toggle('active');

    document.querySelector(".dice").style.display = "none";
    console.log("invoked")
};
function computerPlay() {
    activePlayer = 1
    roundScore = 0
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.querySelector(".player-0-panel").classList.toggle('active');
    document.querySelector(".player-1-panel").classList.toggle('active');

    document.querySelector(".dice").style.display = "none";
    var hold = Math.floor(Math.random() * 10) + 1;
    console.log(hold)
    for (i = 0; i < hold; i++){
        var dice = Math.floor(Math.random() * 6) + 1;
        console.log(dice)
        diceDOM = document.querySelector(".dice");
        diceDOM.src = "img/dice-" + dice + ".png";

        if (lastDice === 6 && dice === 6) {
            score[activePlayer] = 0;
            document.querySelector("#score-" + activePlayer).textContent = score[activePlayer];
        }
        if (dice !== 1) {
            roundScore += dice;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
            lastDice = dice;
        } else {
            roundScore = 0
            break;
        }
    }
    score[activePlayer] += roundScore;
    document.querySelector("#score-" + activePlayer).textContent = score[activePlayer];
    var winningScore = document.querySelector(".winningScore").value;

    if (winningScore) {
        var input = winningScore;
    }
    else {
        input = 100;
    }
    if (score[activePlayer] >= input) {
        document.querySelector("#name-" + activePlayer).textContent = "Winner!"
        document.querySelector(".dice").style.display = "none";
        document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
        document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
        gamePlaying = false;
    }
    nextPlayer();
}