# bs-game-server

BS Game Server is intended to be free and open source engine for 
playing card games with friends.  The initial implementation will
include a couple of variations of poker.

This is intended to accompany it's sister project, BS Game UI, 
though you are free to use this independently if you choose.

# Usage

Below are the current (ok, planned) API endpoints:

## createTable() : TableId

Creates a new table for users to join.

## joinTable(String tableId) : TableId

Allows user to join a table.

## Table.startGame(GameType gameType) : Game

Initiates a round of game play

## Game.deal()

Deals the cards per the rules of the game type.  This is to be 
implemented as an iterator, with the outcome managed by the rules 
of the game type.

## Game.takeTurn(Turn turn)

Called with a turn object to indicate check, call, bet, raise, or fold.

## Table.leaveTable()

Removes the player from the table.