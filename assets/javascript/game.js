//object contructor for Character
function Character(name, image, health, attack, counterAttack) {
    this.name = name;
    this.image = image;
    this.health = health;
    this.attack = attack;
    this.baseAttack = attack;
    this.counterAttack = counterAttack;
    this.increaseAttack = increaseAttack;
}

//Each time the Character attacks, their character's Attack Power increases by its base Attack Power.
function increaseAttack() {
    this.attack += this.baseAttack;
}

//An attack on either the Player or Enemy leads to a decrease in HP of Character
function decreaseHealth(enemyAttack) {
    this.health -= enemyAttack;
}

//A Character is either the user's Player or Enemy
function Player(Character) {
    this.characterType = 'Player';
    this.isLoser = isLoser;
}

function Enemy(Character) {
    this.characterType = 'Enemy';
    this.isLoser = isLoser;
}

function isLoser(Character) {
    return this.health <= 0;
}

//new instances of Characters
//need to change attack and counterattack
var beast = Character('Beast', '../images/beast.jpeg', 100, 10, 10);
var magneto = Character('Magneto', '../images/magneto.jpeg', 150, 15, 15);
var phoenix = Character('Phoenix', '../images/phoenix.jpeg', 120, 12, 12);
var wolverine = Character('Wolverine', '../images/wolverine.jpeg', 180, 18, 18);

//activated by clicking on character image
//chooses player
//moves player to fight section
function setPlayer() {}

//activated by clicking on character image
//chooses enemy
//moves enemy to defender section
function setEnemy() {}

//activated by attack button click
//player attacks enemy to decrease enemy hp
//enemy counter attacks to decrease player hp
function attackEnemy() {}


//true when enemy is defeated
function defeatedEnemy() {}

//true when player is defeated
function defeatedPlayer() {}

function renderDom() {}
