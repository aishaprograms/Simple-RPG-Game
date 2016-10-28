//object contructor for Character
function Character(name, image, health, attack, counterAttack) {
    this.name = name;
    this.image = image;
    this.health = health;
    this.attack = attack;
    this.baseAttack = attack;
    this.counterAttack = counterAttack;
    this.increaseAttack = increaseAttack;
    this.isLoser = isLoser;
}

//Each time the Character attacks, their character's Attack Power increases by its base Attack Power.
function increaseAttack() {
    this.attack += this.baseAttack;
}

//An attack on either the Player or Enemy leads to a decrease in HP of Character
function decreaseHealth(enemyAttack) {
    this.health -= enemyAttack;
}


function isLoser(Character) {
    return this.health <= 0;
}

//new instances of Characters
//need to change attack and counterattack
var beast = new Character('Beast', '../images/beast.jpeg', 100, 10, 10);
var magneto = new Character('Magneto', '../images/magneto.jpeg', 150, 15, 15);
var phoenix = new Character('Phoenix', '../images/phoenix.jpeg', 120, 12, 12);
var wolverine = new Character('Wolverine', '../images/wolverine.jpeg', 180, 18, 18);
var characterArray = [];
characterArray.push(beast);
characterArray.push(magneto);
characterArray.push(phoenix);
characterArray.push(wolverine);
var player;
var enemy;

//DOM modifiying function using jQuery
//activated by clicking on character image
//moves player to fight section
function selectPlayer() {
    $('.character').on('click', function() {
        $('#player-instruction').html('Your Character');
        var playerArray = setPlayer(this);
        var playerId = playerArray[0];
        var enemyArray = makeEnemies(playerArray[1], characterArray);
        for (var i = 0; i < enemyArray.length; i++) {
            $('#' + enemyArray[i].name).css('border', '2px red solid');
        }
        // $(this).css('border', '2px green solid');
    });
}

//returns array of player ID, Character object based on image selected
function setPlayer(characterImg) {
    if ($(characterImg).is('#Beast')) {
        return ['#Beast', beast];
    } else if ($(characterImg).is('#Magneto')) {
        return ['#Magneto', magneto];
    } else if ($(characterImg).is('#Phoenix')) {
        return ['#Phoenix', phoenix];
    } else if ($(characterImg).is('#Wolverine')) {
        return ['#Wolverine', wolverine];
    }
}

function findWithAttr(array, attr, value) {
    for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

function makeEnemies(player, arrayCharacter) {
    var indexPlayer;
    if (player === beast) {
        indexPlayer = findWithAttr(characterArray, 'name', 'Beast');
    } else if (player === magneto) {
        indexPlayer = findWithAttr(characterArray, 'name', 'Magneto');
    } else if (player === phoenix) {
        indexPlayer = findWithAttr(characterArray, 'name', 'Phoenix');
    } else if (player === wolverine) {
        indexPlayer = findWithAttr(characterArray, 'name', 'Wolverine');
    }
    return arrayCharacter.splice(indexPlayer, 1);
}

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

function renderDom() {
    selectPlayer();
}

$(document).ready(function() {
    renderDom();
});
