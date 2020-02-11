//////// PROJECT 0: 1000 bornes //////////

class Player {
  constructor(name) {
    this.name = name;
    // this.cardsInHand = [];
    // this.playedPile = [];
    this.kmTraveled = 0;
    this.state = 'stopped'; // stopped | accidented | going | out_of_gas | ...
  }

  isGoing() {
    return (this.state == 'going');
  }

  isAccidented() {
    return (this.state == 'accidented');
  }
  
  getIntoAccident() {
    this.state = 'accidented';
  }
  runOutOfGas() {
    this.state = 'out_of_gas';
  }

  setState(newState) {
    // TODO : validation of the state value
    this.state = newState;
  }
}

class Game {
  constructor() {
    // INIT
    // 1/ shuffle the cards
    // 2/ give 6 cards to each player, we see both players'hand on screen
    // 3/ rest of [cards] is the draw pile
    // 3/ both player traveled 0 kmTraveled
    // 4/ rollPile, hazardPile, remedyPile, and discardPile are empty

    this.discardPile = [];
    this.turns = 0;
  
    // stolen from https://javascript.info/task/shuffle
    function shuffle(array) {
      array.sort(() => Math.random() - 0.5);
    }

    function makeCards(typeOfCard, count, ...args) {
      let cards = [];
      for(let i = 1; i <= count; ++i) {
        cards.push(new typeOfCard(...args));
      }
      return cards;
    }

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
    shuffle(this.drawPile);

    // distribute cards
    // only 1 player, so pick 6 cards for player + CPU
    // this.players
    this.playerHand = []
    for(let i = 1; i <= 6; ++i) {
      this.drawToPlayer();
    }
    this.cpuHand = []
    for(let i = 1; i <= 6; ++i) {
      this.drawToCPU();
    }
  }

  drawToPlayer() {
    this.playerHand.push(this.drawPile.shift());
  }

  drawToCPU() {
    this.cpuHand.push(this.drawPile.shift());
  }
}

class Card {
}

class DistanceCard extends Card {
  constructor(value) {
    super();
    this.value = value;
  }
}

class HazardCard extends Card {
  constructor() {
    super();
  }
}

class OutOfGasCard extends HazardCard {
  constructor() { super(); }

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
  constructor() { super(); }

  apply(player) {
    if(player.isGoing()) {
      console.log("i can be applied, i'm an flat tire card");
      player.setState('flat_tired')
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
      player.setState('stopped')
      return true;
    } else {
      console.log("i can't be applied because the player isn't going");
      return false;
    }
  }
}

class AccidentCard extends HazardCard {
  constructor() { super(); }

  apply(player) {
    if(player.isGoing()) {
      console.log("i can be applied, i'm an accident");
      player.setState('accidented')
      return true;
    } else {
      console.log("i can't be applied because the player isn't going");
      return false;
    }
  }
}



class RemedyCard extends Card {
  constructor() { super(); }
}

class RepairCard extends RemedyCard {
  constructor() { super(); }

  apply(player) {
    if(player.isAccidented()) {
      console.log("i can be applied, i was accidented");
      player.setState('stopped')
      return true;
    } else {
      console.log("i can't be applied because i'm not accidented");
      return false;
    }
  }
}


let game = new Game();

// game.play()
// some how get input from me
// apply my card
// make other player play instantly
//     and give focus back to me


console.log(game);

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



















