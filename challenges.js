/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*eslint-disable no-console, no-unused-vars*/
var scores, roundScore, activePlayer, gamePlaying, previousRoll, winScore, diceDOM, dice, dice1, dice2;
    

init();

// var x = document.querySelector('#score-0').textContent;
// console.log(x);


document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {

    //1. Random number
        dice = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
        dice1 = dice[0];
        dice2 = dice[1]

    //2. Display the result
        diceDOM = document.querySelectorAll('.dice');

    for (var i = 0; i < diceDOM.length; i++) {
        diceDOM[i].style.display = 'block';
        diceDOM[i].src = diceDOM.src = 'dice-' + dice[i] + '.png';
    }

    // console.log(diceDOM.length);
    // diceDOM.style.display = 'block';
    // diceDOM.src = 'dice-' + dice + '.png';

    //Add the second dice
    // var diceDOM2 = document.querySelector('#dice2');
    // diceDOM2.style.display = 'block';
    // diceDOM2.src = 'dice-' + dice2 + '.png';

    //3. Update the round score IF the rolled number was NOT a 1
    if (dice1 !== 1 && dice2 !== 1) {
        //Add rule that if 'rolls two six in a roll', loses entire score and goes to the next player
        if (dice1 === 6 && previousRoll === dice1) {
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = '0';
            nextPlayer();
        } else {
        // Add score
        previousRoll = dice1;
        roundScore += dice1 + dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }

    } else {       
        // Next player
        nextPlayer();
    }

    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying){

    // Add current score to global score
    scores[activePlayer] += roundScore;
    
    // Add winning socre as player input
    winScore = document.getElementById('winScore').value;

    // Undefined, 0, null or "" are COERCED to false
    // Anything else is COERCED to true
    if (winScore) {
        var winningScore = winScore;
    } else {
        winningScore = 100;
    }

    // Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // Check if player won the game
    if (scores[activePlayer] >= winningScore) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('#dice2').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
    } else {
        // Next player
        nextPlayer();
    }
    }
});


function nextPlayer() {
    previousRoll = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('#dice2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('#dice2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'PLAYER 1';
    document.getElementById('name-1').textContent = 'PLAYER 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
}

// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';