# Project0_1000Bornes

"1000 Bornes" is a famous French card game where you play a driver and your goal is to travel 1000 "bornes" (informal word that means kilometers in French).

## Rules

The original game is composed of a set of 96 cards:
- Hazards:
    Accident:3
    Out of Gas:3
    Flat Tire:3
    Stop:5
    Speed Limit:4
- Remedies:
    Repairs:6
    Gasoline:6
    Spare Tire:6
    Go/Roll/Drive:14
    End of Speed Limit:6
- Safeties:
    Driving Ace:1
    Fuel Tank:1
    Puncture Proof:1
    Right of Way/Emergency Vehicle :1
- Distance:
    25 Mile:10
    50 Mile:10
    75 Mile:10
    100 Mile:12
    200 Mile:4

Remedies and Hazards are opposite cards. Safeties are a way to avoid to receive a Hazard card during the whole game, and Distance cards make the player approach its goal.

The game can be played by 2 to 4 players.



## Differences between this game and the original

This game has a lot of conditions. In order to ease the rules, I removed the Safety cards, and the Speed Limit cards (and their remedy card).

The game let only one player play against the CPU.



## Description of a turn

First we initiate the setup of the game.
We take the players, give them cards (6 cards + 1 that is automatically given). Their mileage is equal to 0 and they are stopped.

When the turn starts, the player has to apply a Roll card to start driving. If he doesn't have one, he can discard a card, and let the opponent play its turn.
A Roll card will set the player's state to "Going". This will allow him to travel at the next turn, unless he receives a Hazard card from the opponent.
A Hazard card st the player's state to a Hazard state, and the player has to apply the Remedy card associated to the Hazard state:
    Out of Gas <> Gasoline
    Flat Tire <> Spare Tire
    Accident <> Repair
    Stop <> Roll

After a Remedy card is applied, the car is stopped, so the layer will need a new Roll card to drive again.

The first player that reaches 1000 "bornes" wins.


## Screenshot of the UI


##  How the game is built

The code is written is Javascript.

There are 3 classes: Player, Cards, and Game.
1 - Player sets the player, and contains all the actions a player can make.
2 - Cards contains 3 classes, which are the 3 types of cards. Each type of card has as many classes as it exists cards of this type.
For example: Card > HazardCard > StopCard, AccidentCard, OutofGasCard, and FlatTireCard. Each class contains functions for their card.
3 - Game is the Game Engine. It sets the cards, the display, resets the game, ...

Thr CPU plays in autoplay, and the player decides what he plays using the UI.


## State of the game

The game still contains some bugs and some features are missing:

[] The CPU is supposed to iterate in its hand to find the first card it can play. One that card is found , it plays it and the function should stop. I found out the CPU can play multiple cards at the same time (a Roll and 3 Distance cards). Same thing for the discarded cards.

[] Hazard cards have to be applied to the opponent. So far, I can only apply them to myself.

[] I would like to show on the screen what kind of Hazard card is applied when applicable.

[] I would like the popup an alert with a style associed to the game.

[] I would like to integrate the Speed Limit and Safety cards.






