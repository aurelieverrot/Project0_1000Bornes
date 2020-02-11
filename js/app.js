//////// PROJECT 0: 1000 bornes ///////////
console.log("Hey!")

// VARIABLES
const config = [
  {
    category: 'Hazards',
    type: [
        {
        cardName: 'Accident',
        quantity: 3
        },
        {
        cardName: 'Out of gas',
        quantity: 3
        },
        {
        cardName: 'Flat tire',
        quantity: 3
        },
        {
        cardName: 'Stop',
        quantity: 5
        }],

    category: 'Remedy',
    type:[ 
        {
        cardName: 'Repairs',
        opposite: 'Accident',
        quantity: 6
        },
        {
        cardName: 'Gasoline',
        opposite: 'Out of gas',
        quantity: 6
        },
        {
        cardName: 'Spare tire',
        opposite: 'Flat tire',
        quantity: 6
        },
        {
        cardName: 'Roll',
        opposite: 'Stop',
        quantity: 14
        }],
  

    category: 'Distance',
    type: [
        {
        cardName: 'km25',
        value: 25,
        quantity: 10
        },
        {
        cardName: 'km50',
        value: 50,
        quantity: 10
        },
        {
        cardName: 'km75',
        value: 75,
        quantity: 10
        },
        {
        cardName: 'km100',
        value: 100,
        quantity: 12
        },
        {
        cardName: 'km200',
        value: 200,
        quantity: 4
        }],
  }];

// CLASS PLAYER
class Player {
  constructor() {
    this.name = name;
    this.cardsInHand = [];
    this.rollPile = [null, 1, -1];
    this.hazardPile = [null, 1, -1];
    this.remedyPile = [null, 1, -1];
    this.distancePile = [];
    this.kmTraveled = 0;
  }
}

class Game {
  constructor() {
    this.drawPile = [];
    this.discardPile = [];
    this.turns = 0;
  }
}




///////////////
//pseudo code
///////////////

// SETUP
// 1/ shuffle the cards
// 2/ give 6 cards to each player, we see both players'hand on screen
// 3/ rest of [cards] is the draw pile
// 3/ both player traveled 0 kmTraveled
// 4/ rollPile, hazardPile, remedyPile, and discardPile are empty


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



















