//////// PROJECT 0: 1000 bornes //////////

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

class Player {
  constructor(name, hand) {
    this.name = name;
    this.hand = hand;
    this.kmTraveled = 0;
    this.state = 'stopped'; // stopped | accidented | going | out_of_gas | ...
  }

  // function changing the state by calling specific state functions
  setState(newState) {
    // TODO : validation of the state value
    this.state = newState;
  }

  ///////////// Hazards events

  // function called when player receives accidentCard
  getIntoAccident() {
    this.state = 'accidented';
  }

  // function called when player -has- an accidentCard
  isAccidented() {
    return (this.state == 'accidented');
  }

  // function called when player receives outOfGasCard
  runOutOfGas() {
    this.state = 'out_of_gas';
  }

  // function called when player -has- an outOfGasCard
  isOutOfGas() {
    return (this.state == 'out_of_gas');
  }

  // function called when player receives flatTireCard
  getFlatTire() {
    this.state = 'flat_tire';
  }

  // function called when player -has- a flatTireCard
  hasFlatTire() {
    return (this.state == 'flat_tire');
  }

  // function called when player receives a stopCard
  getStop() {
    this.state = 'stopped';
  }

  // function called when player -has- a stopCard
  isStopped() {
    return (this.state == 'stopped');
  }



  ///////////// Remedies events

  // function called when player applies a repairCard
  doesRepair() {
    this.state = 'repaired';
  }

  // function called when player -had- applied a repairCard
  isRepaired() {
    return (this.state == 'repaired');
  }

  // function called when player applies a gasolineCard
  giveGasoline() {
    this.state = 'fueled';
  }

  // function called when player -had- applied a gasolineCard
  isFueled() {
    return (this.state == 'fueled');
  }

  // function called when player applies a spareTireCard
  appliesSpareTire() {
    this.state = 'new_tire';
  }

  // function called when player -had- applied a spareTireCard
  hasSpareTire() {
    return (this.state == 'new_tire');
  }

  // function called when player applies a rollCard
  letsRoll() {
    this.state = 'going';
  }

  // function called when player -has- a rollCard
  isGoing() {
    return (this.state == 'going');
  }

  travel(kms) {
    this.kmTraveled += kms;
    return this.kmTraveled;
  }

  // return player if card played successfuly
  // or return false if not
  play(cardIndex) {
    // some sanity check
    if(cardIndex < 0 || cardIndex >= this.hand.length) {
      // throw new Error("Can't play that card")
      console.log(`bad index bro ${cardIndex}.`)
      return false;
    }

    let card = this.hand[cardIndex];

    console.log(`player ${this.name} playing card`, card);

    if (card.apply(this)) {
      // applied successfully, let's remove it from their hand
      // take card at index
      this.hand.splice(cardIndex,1);

      return this;
    } else {
      // we fucked it up
      return false;
    }
  }
}



class Game {
  constructor() {
    this.resetGame();
  }

  resetGame() {  
    // INIT
    // 1/ shuffle the cards
    this.resetDrawPile();
    // 2/ give 6 cards to each player, we see both players'hand on screen
    // 3/ rest of [cards] is the draw pile

    this.initialDraw();

    // 3/ both player traveled 0 kmTraveled
    this.player = new Player("Alice", this.playerHand);
    this.cpu    = new Player("CPU", this.cpuHand);

    // 4/ rollPile, hazardPile, remedyPile, and discardPile are empty
    this.discardPile = [];
  }

  initialDraw() {
    // draw cards
    //  => distribute 6 cards using draw functions in a loop
    this.playerHand = []
    for(let i = 1; i <= 6; i++) {
      this.draw(this.playerHand);
    }
    this.cpuHand = []
    for(let i = 1; i <= 6; i++) {
      this.draw(this.cpuHand);
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


  
  throwAndDraw(player) {
    // throw first one, don't care about optimizing which card to throw
    let discardedCard = player.hand.pop();
    console.log("\tdiscarding", discardedCard);
    this.discardPile.push(discardedCard);
    console.log(`\tnow discard pile`, this.discardPile)

    // draw one card
    this.draw(player.hand);
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

  apply(player) {
    if(player.isGoing()) {
      console.log("i can be applied, i'm an accident");
      player.getIntoAccident();
      return true;
    } else {
      console.log("i can't be applied because the player isn't going");
      return false;
    }
  }
}

class OutOfGasCard extends HazardCard {
  constructor() { 
    super(); 
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

  apply(player) {
    if(player.isStopped()) {
      console.log("i can be applied, i am stopped");
      player.letsRoll();
      return true;
    } else {
      console.log("i can't be applied because i don't have a flat tire");
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

function autoPlay(game, player) {
  // make the CPU iterate over its cards until one can be played (apply doesn't return false)
  let cards = player.hand;
  for (const [cardIndex, card] in cards) {
    console.log("hey", cardIndex);
    if (player.play(cardIndex)) {
      console.log(`${player.name} played successfully`)
      return true;
      // played success
    } else {
      console.log(`\t[${player.name}] iterating to another card because i couldn't play that one`)
      // let's continue playing other cards
    }
  }
  game.throwAndDraw(player);
  return false; // couldn't find any card working, we should have returned true above
}


let game = new Game();
// console.log(game.player);
// console.log(game.cpu);

// player.play(0);
console.log("begin autoplay");

for(let i = 0; i <10; ++i) {
  console.log("================= TURN", i)
  autoPlay(game, game.player);
  autoPlay(game, game.cpu);
}
console.log("after autoplay");

// console.log(game.player);
// console.log(game.cpu);
console.log(game);

// game.play()
// some how get input from me
// apply my card
// make other player play instantly
//     and give focus back to me




// let card = deck[0];

// card.apply(player);
// console.log("L162", player);

// player.setState('going');
// console.log("L166", player);

// card.apply(player);
// console.log(player);

// card = new RepairCard();
// card.apply(player);
// console.log(player);


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



















