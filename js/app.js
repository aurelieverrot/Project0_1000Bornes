//////// PROJECT 0: 1000 bornes //////////

///////////////////////////////////////////


// DOM variables
let btnElStart   = document.getElementById('start');
let btnElPlay    = document.getElementById('play');
let btnElDiscard = document.getElementById('discard');

let txtElPlayerKMTraveled = document.getElementById('playerKM');
let txtElCPUKMTraveled    = document.getElementById('cpuKM');

let spanElPlayerState = document.getElementById('playerState');
let spanElCPUState    = document.getElementById('cpuState');

let playerCardsEl = document.querySelectorAll('.playerHand');


// placeholder for new game
let game;


function displayCard(card) {

}

///////////////////////////////////////////

// stolen from https://javascript.info/task/shuffle
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

// function that creates the cards
function makeCards(typeOfCard, count, ...args) {
  let cards = [];
  for(let i = 1; i <= count; ++i) {
    cards.push(new typeOfCard(...args));
  }
  return cards;
}


//////// PLAYER CLASS : set name, hand, km/miles traveled, state of the car depending on card applied
class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
    this.kmTraveled = 0;
    this.state = 'Stopped'; // stopped | accidented | going | out_of_gas | ...
  }

  // function changing the state by calling specific state functions
  setState(newState) {
    // TODO : validation of the state value
    this.state = newState;
  }

  //// Hazards events

  // function called when player receives accidentCard
  getIntoAccident() {
    this.state = 'Accidented';
  }

  // function called when player -has- an accidentCard
  isAccidented() {
    return (this.state == 'Accidented');
  }

  // function called when player receives outOfGasCard
  runOutOfGas() {
    this.state = 'Out of Gas';
  }

  // function called when player -has- an outOfGasCard
  isOutOfGas() {
    return (this.state == 'Out of Gas');
  }

  // function called when player receives flatTireCard
  getFlatTire() {
    this.state = 'Flat Tire';
  }

  // function called when player -has- a flatTireCard
  hasFlatTire() {
    return (this.state == 'Flat Tire');
  }

  // function called when player receives a stopCard
  getStop() {
    this.state = 'Stopped';
  }

  // function called when player -has- a stopCard
  isStopped() {
    return (this.state == 'Stopped');
  }



  ///// Remedies events

  // function called when player applies a repairCard
  doesRepair() {
    this.state = 'Stopped';
  }

  // function called when player applies a gasolineCard
  giveGasoline() {
    this.state = 'Stopped';
  }

  // function called when player applies a spareTireCard
  hasSpareTire() {
    this.state = 'Stopped';
  }

  // function called when player applies a rollCard
  letsRoll() {
    this.state = 'Going';
  }

  // function called when player -has- a rollCard
  isGoing() {
    return (this.state == 'Going');
  }

  travel(kms) {
    this.kmTraveled += kms;
    if (this.kmTraveled >= 1000) {
      alert(`${this.name} won the game!`);
    }
    return this.kmTraveled;
  }

  // return player if card played successfuly
  // or return false if not
  play(cardIndex) {
    if(cardIndex < 0 || cardIndex >= this.hand.length) { // throw new Error("Can't play that card")
      //console.log(`bad index ${cardIndex}.`)
      return false;
    }

    let card = this.hand[cardIndex];

    //console.log(`player ${this.name} playing card`, card);

    if (card.apply(this)) {
      // applied successfully, let's remove it from their hand take card at index
      this.hand.splice(cardIndex,1);
      return this;
    } else {
      return false;
    }
  }
}



class Game {
  constructor() {
    this.resetGame();
  }

  resetGame() {  
    // shuffle the cards at setup
    this.resetDrawPile();
  
    this.player = new Player("Aaron");
    this.cpu    = new Player("CPU");
    
    // give cards in player's hand
    this.initialDraw(this.player);
    this.initialDraw(this.cpu);


    // 4/ rollPile, hazardPile, remedyPile, and discardPile are empty
    //this.discardPile = [];
  }

  initialDraw(player) {
    // draw cards
    //  => distribute 6 cards using draw functions in a loop
    for(let i = 1; i <= 6; i++) {
      this.draw(player.hand);
    }
  }

  resetDrawPile() {
    this.drawPile = [
      // Hazard cards
      ...makeCards(AccidentCard, 3),
      ...makeCards(OutOfGasCard, 3),
      ...makeCards(FlatTireCard, 3),
      ...makeCards(StopCard, 5),

      // Distance cards
      ...makeCards(DistanceCard, 10, 25),
      ...makeCards(DistanceCard, 10, 50),
      ...makeCards(DistanceCard, 10, 75),
      ...makeCards(DistanceCard, 12, 100),
      ...makeCards(DistanceCard, 4, 200),

      // Remedy cards
      ...makeCards(RepairCard, 6),
      ...makeCards(GasolineCard, 6),
      ...makeCards(SpareTireCard, 6),
      ...makeCards(RollCard, 14),

    ];  

    // shuffles the drawPile at game init
    shuffle(this.drawPile);
  }


  draw(hand) {
    hand.push(this.drawPile.pop());
  }
  
  throwRandomCard(player) {
    // // throw first one, don't care about optimizing which card to throw
    // let discardedCard = player.hand.shift();
    // console.log("\tdiscarding", discardedCard);
    // this.discardPile.push(discardedCard);
    // console.log(`\tnow discard pile`, this.discardPile)
  }
  
}
////////////////////
class Card {
  // apply
  //   returns true if card can be applied
  //   returns false when the card isn't valid
  //     (because the state of the player doesn't allow playing this type of card)
  apply(player) {
    throw new Error('You have to implement this when you implement a new type of card'); 
  }

  getImage() {
    throw new Error('You have to implement this when you implement a new type of card'); 
  }
}

////////////////////
class HazardCard extends Card {
  constructor() {
    super();
  }
}
////////////////////
class AccidentCard extends HazardCard {
  constructor() { 
    super(); 
  }

  getImage() {
    return `url('./images/accident.png')`;
  }

  apply(player) {
    if(player.isGoing()) {
      console.log("i can be applied, i'm an accident");
      player.getIntoAccident();
      return true;
    } else {
      console.log("i can't be applied because the player isn't going");
      alert(`Sorry, you can't play this card!`);
      return false;
    }
  }
}

class OutOfGasCard extends HazardCard {
  constructor() { 
    super(); 
  }

  getImage() {
    return `url('./images/out_of_gas.png')`;
  }

  apply(player) {
    if(player.isGoing()) {
      console.log("i can be applied, i'm an OOG card");
      player.runOutOfGas();
      return true;
    } else {
      console.log("i can't be applied because the player isn't going");
      return false;
    }
  }
}

class FlatTireCard extends HazardCard {
  constructor() { 
    super(); 
  }

  getImage() {
    return `url('./images/flat_tire.png')`;
  }

  apply(player) {
    if(player.isGoing()) {
      console.log("i can be applied, i'm an flat tire card");
      player.getFlatTire();
      return true;
    } else {
      console.log("i can't be applied because the player isn't going");
      return false;
    }
  }
}

class StopCard extends HazardCard {
  constructor() { super(); }

  getImage() {
    return `url('./images/stop.png')`;
  }

  apply(player) {
    if(player.isGoing()) {
      console.log("i can be applied, i'm a stop card");
      player.getStop();
      return true;
    } else {
      console.log("i can't be applied because the player isn't going");
      return false;
    }
  }
}


//////////////////
class RemedyCard extends Card {
  constructor() { super(); }
}

class RepairCard extends RemedyCard {
  constructor() { super(); }

  getImage() {
    return `url('./images/repairs.png')`;
  }

  apply(player) {
    if(player.isAccidented()) {
      console.log("i can be applied, i was accidented");
      player.doesRepair();
      return true;
    } else {
      console.log("i can't be applied because i'm not accidented");
      return false;
    }
  }
}

class GasolineCard extends RemedyCard {
  constructor() { 
    super(); 
  }

  getImage() {
    return `url('./images/gasoline.png')`;
  }

  apply(player) {
    if(player.isOutOfGas()) {
      console.log("i can be applied, i am out of gas");
      player.giveGasoline();
      return true;
    } else {
      console.log("i can't be applied because i'm not out of gas");
      return false;
    }
  }
}

class SpareTireCard extends RemedyCard {
  constructor() { 
    super(); 
  }

  getImage() {
    return `url('./images/spare_tire.png')`;
  }

  apply(player) {
    if(player.hasFlatTire()) {
      console.log("i can be applied, i have a flat tire");
      player.hasSpareTire();
      return true;
    } else {
      console.log("i can't be applied because i don't have a flat tire");
      return false;
    }
  }
}

class RollCard extends RemedyCard {
  constructor() { 
    super(); 
  }
  
  getImage() {
    return `url('./images/roll.png')`;
  }

  apply(player) {
    if(player.isStopped()) {
      console.log("i can be applied, i am stopped");
      player.letsRoll();
      return true;
    } else {
      console.log("i can't be applied because i'm already going");
      return false;
    }
  }
}

////////////////////////////

class DistanceCard extends Card {
  constructor(kms) { 
    super(); 
    this.kms = kms;
  }

  getImage() {
    return `url('./images/km${this.kms}.png')`;
  }

  apply(player) {
    if(player.isGoing()) {
      console.log("i can be applied, i am going");
      // if card can be applied, km traveled is updated
      player.travel(this.kms);
      return true;
    } else {
      console.log("i can't be applied because i'm not going");
      return false;
    }
  }
}



//////////////////////////////////////////////////////////////////
// function autoplay for the CPU
function autoPlay(game, cpu) {
  // pick a 7th card
  window.game.draw(cpu.hand);

  // make the CPU iterate over its cards until one can be played (=> apply doesn't return false)
  let cards = cpu.hand;
  let playedCard = false;
  for (const [cardIndex, card] in cards) {
    //console.log("hey", cardIndex);
    if (cpu.play(cardIndex) == true) {
      console.log(`${cpu.name} played successfully`)
      playedCard = true;
      break;
      // played success
    } else {
      console.log(`\t[${cpu.name}] iterating to another card because i couldn't play that one`)
      // let's continue playing other cards
    }
  }

  if (playedCard) {
    return true;
  } else {    
    game.throwRandomCard(cpu);
    return false; // couldn't find any card working, we should have returned true above
  }
}


// functions for the player using UI to play
function startGame() {
  window.game = new Game();
  console.log("game initialized");

  refreshDisplay();
  setupTurnForPlayer();
}

// we start with nothing selected
window.selectedCard = undefined;

function toggleSelectedCard(targetEl) {
  let el = targetEl.target;

  // if a card has already been selected, selectCard is NOT undefined
  if (window.selectedCard != undefined) {
    window.selectedCard.style.border = "2px solid black";  
  }

  window.selectedCard = el;
  el.style.border = "2px dashed black";
  //console.log("card selected", window.selectedCard);
}

function refreshDisplay() {
  for (let i = 0; i < playerCardsEl.length; i++) {
    let card = window.game.player.hand[i];

    if (card) { // if we only have 6 cards... because seems like it's useful to model that somehow... i dont know man
      //console.log(card.constructor.name);
      playerCardsEl[i].style.background = card.getImage();
      playerCardsEl[i].innerText = '';
      playerCardsEl[i].setAttribute('card-index', i.toString());
      playerCardsEl[i].removeEventListener('click', toggleSelectedCard);
      playerCardsEl[i].addEventListener('click', toggleSelectedCard);
    }
  }

  txtElPlayerKMTraveled.innerText = `${window.game.player.kmTraveled} miles`;
  txtElCPUKMTraveled.innerText = `${window.game.cpu.kmTraveled} miles`;
  spanElPlayerState.innerText = window.game.player.state;
  spanElCPUState.innerText = window.game.cpu.state;
}

// function draws a card by default when it's player's turn
function setupTurnForPlayer() {
  let player = window.game.player;
  window.game.draw(player.hand);
  refreshDisplay();
}

// function used by player
function playTurn() {
  console.log("playing selected card", window.selectedCard);

  // can't play if no card is selected
  if(window.selectedCard == undefined) {
    alert("Please first select a card");
    return;
  }

  let cardIndex = window.selectedCard.getAttribute('card-index');
  let actualCard = window.game.player.hand[cardIndex];

  let result = window.game.player.play(cardIndex);
  
  // gives turn to CPU
  autoPlay(window.game, window.game.cpu);

  // gives back turn to player when CPU's turn is over
  setupTurnForPlayer();
  
}



btnElStart.addEventListener('click', startGame);
btnElPlay.addEventListener('click', playTurn);






///////////////
//pseudo code
///////////////



// // TURN IF !ROLL CARD
// 1/ each player pick a card from the draw pile:
//   if player has a rollCard, he places it on rollPile
//   if Not, he chooses a card from his hand and place it in discardPile
//   change player

// // TURN WITH A ROLL CARD && !HAZARD CARD
// 2/ he picks a card from drawPile
//    then he can:
//     - place distance on distancePile, and add distance to kmTraveled
//     - place a hazard card on player2's hazardPile
//     - discard a card in discardPile
//    if he plays a remedy card, pop up alert: Move not authorized 
//    if kmTraveled >= 1000, player wins, other player looses
//        if not change player

// // TURN WITH A HAZARD CARD
// 3/ if player has a hazardCard in hazardPile
//    he picks a card from drawPile
//    then he can:
//     - place a hazard card on player2's hazard pile
//     - place the good remedy card on his remedyPile => this action empties hazardPile && remedyPile
//     - discard a card
//    if he plays distanceCard, pop up alert: Move not authorized
//    if he plays a rollCard, pop up alert: Move not authorized
//    change player



















