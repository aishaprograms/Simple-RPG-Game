//object contructor for Character
function Character(name, image, health, attack, counterAttack) {
    this.name = name;
    this.image = image;
    this.health = health;
    this.attack = attack;
    this.baseAttack = attack;
    this.counterAttack = counterAttack;
    this.increaseAttack = increaseAttack;
    this.decreaseHealth = decreaseHealth;
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
var playerAttackPoints;
var enemyAttackPoints;

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
//!!!!!!!! currently keeps selecting new enemies
function selectFighters() {
    $('.character-figure').on('click', function() {
        if (!$(this).hasClass('enemy-figure') && !$(this).hasClass('player-figure')) {
            selectPlayer(this);
            moveEnemies(this);
        } else if ($(this).hasClass('enemy-figure') && !$(this).hasClass('defender-figure')) {
            selectDefender(this);
        }
    });
}

//activated by clicking on character figure
//chooses player
function selectPlayer(characterFigure) {
    player = setFighter(characterFigure);
    $(characterFigure).css('border', '2px green solid');
    $('#player-instruction').html('Your Character');
    $(characterFigure).insertAfter('#player-instruction');
    $(characterFigure).addClass('player-figure');
}

//moves other characters to enemy section
function moveEnemies(characterFigure) {
    $('.character-figure').not(characterFigure).css('border', '2px red solid');
    $('.character-figure').not(characterFigure).insertAfter('#enemy-header');
    $('.character-figure').not(characterFigure).addClass('enemy-figure');
}


//activated by clicking on character image
//chooses defender
//moves defender to defender section
function selectDefender(characterFigure) {
    enemy = setFighter(characterFigure);
    $(characterFigure).insertAfter('#defender-header');
    $(characterFigure).addClass('defender-figure');
}

//activated by attack button click
function toggleFight() {
    $('#attack-button').on('click', function() {
        fightersAttack();
        showAttackHit();
    });
}

//player attacks enemy to decrease enemy hp
//enemy counter attacks to decrease player hp
function fightersAttack() {
    playerAttackPoints = player[1].attack;
    enemyAttackPoints = enemy[1].attack;
    player[1].decreaseHealth(enemyAttackPoints);
    enemy[1].decreaseHealth(playerAttackPoints);
}

function showAttackHit() {
    $(player[0] + '-caption').html(player[1].name + ' ' + player[1].health + ' HP');
    $(enemy[0] + '-caption').html(enemy[1].name + ' ' + enemy[1].health + ' HP');

}

//true when enemy is defeated
function defeatedEnemy() {}

//true when player is defeated
function defeatedPlayer() {}

function renderDom() {
    selectFighters();
    toggleFight();
}

$(document).ready(function() {
    renderDom();
});
