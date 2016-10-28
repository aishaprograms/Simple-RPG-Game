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
var player;
var enemy;

//returns array of player ID, Character object based on figure selected
function setFighter(characterFigure) {
    if ($(characterFigure).is('#Beast-figure')) {
        return ['#Beast-figure', beast];
    } else if ($(characterFigure).is('#Magneto-figure')) {
        return ['#Magneto-figure', magneto];
    } else if ($(characterFigure).is('#Phoenix-figure')) {
        return ['#Phoenix-figure', phoenix];
    } else if ($(characterFigure).is('#Wolverine-figure')) {
        return ['#Wolverine-figure', wolverine];
    }
}

//DOM modifiying function using jQuery
//activated by clicking on character figure
//moves other characters to enemy section
function selectPlayer() {
    $('.character-figure').on('click', function() {
        player = setFighter(this);
        $('#player-instruction').html('Your Character');
        $(this).css('border', '2px green solid');
        $('.figure').not(this).css('border', '2px red solid');
        $('.figure').not(this).insertAfter('#enemy-header');
        $('.figure').not(this).addClass('enemy-figure').removeClass('character-figure');
        $(this).addClass('player-figure').removeClass('character-figure');
    });
}

//activated by clicking on character image
//chooses enemy
//moves enemy to defender section
function selectEnemy() {
    $('.enemy-figure').on('click', function() {
        $(this).insertAfter('#defender-header');
    });
}

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
    selectEnemy();
}

$(document).ready(function() {
    renderDom();
});
