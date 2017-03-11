# Simple-RPG-Game

Update (3/11/17): This is the first app I designed with jQuery. At that time, I handled much of the DOM manipulation with classes. If I were to redo this app, firstly, I would use React instead of jQuery. However, if I did use jQuery, I would manipulate the game based on the position of the character figure instead of its class. I did make some changes to clean up the display of the app so that the game works as expected and its use is straightforward. Additionally, I placed some instructions for those users that would like to understand how the game works.

## Let's play!
Sometimes the X-Men like to battle it out on the battlefield...

## Understand
This is a RPG game which involves an attack and counter attack strategy.

This game uses Bootswatch theme Superhero and jQuery. The game itself is set up with an object prototype Character and DOM manipulations using jQuery. 

* When the game starts, the player will choose a character by clicking on the characters's picture. The player will fight as that character for the rest of the game.

* The player must then defeat all of the remaining fighters

* The player chooses an opponent by clicking on an enemy's picture.

* Once the player selects an opponent, that enemy is moved to a `defender area`.

* The player will now be able to click the `attack` button.
    * Whenever the player clicks `attack`, their character damages the defender. The opponent will lose `HP` (health points). These points are displayed at the bottom of the defender's picture. 
    * The opponent character will instantly counter the attack. When that happens, the player's character will lose some of their `HP`. These points are shown at the bottom of the player character's picture.

* The player will keep hitting the attack button in an effort to defeat their opponent. When the defender's HP is reduced to zero or below, the enemy is removed from the defender area. The player character can now choose a new opponent.

* The player wins the game by defeating all enemy characters. The player loses the game the game if their character's HP falls to zero or below.

## Credits
Images obtained from http://www.ranker.com/list/list-of-all-uncanny-x-men-members/super-hero-teams


## Heroku
Heroku app: https://secret-chamber-50409.herokuapp.com/
