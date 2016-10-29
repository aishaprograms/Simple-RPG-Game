//object contructor for Character
function Character(name, image, health, attack, counterAttack) {
    this.name = name;
    this.image = image;
    this.baseHealth = health;
    this.health = health;
    this.attack = attack;
    this.baseAttack = attack;
    this.counterAttack = counterAttack;
    this.increaseAttack = increaseAttack;
    this.decreaseHealth = decreaseHealth;
    this.isLoser = isLoser;
    this.resetCharacter = resetCharacter;
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

function resetCharacter() {
    this.health = this.baseHealth;
    this.attack = this.baseAttack;
}

//new instances of Characters
//need to change attack and counterattack
var beast = new Character('Beast', '../images/beast.jpeg', 100, 5, 5);
var magneto = new Character('Magneto', '../images/magneto.jpeg', 150, 15, 15);
var phoenix = new Character('Phoenix', '../images/phoenix.jpeg', 120, 8, 8);
var wolverine = new Character('Wolverine', '../images/wolverine.jpeg', 180, 25, 25);
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
    $('#play-message').html('You selected to fight ' + enemy[1].name);
}

//activated by attack button click
//add no enemy here
function toggleFight() {
    $('#attack-button').on('click', function() {
        if (enemy === undefined || (defeatedEnemy() && !$('.character-figure').hasClass('defender-figure')) && !allDefeated()) {
            $('#play-message').html('Enemy has not been selected!');
        } else if (!defeatedPlayer()) {
            showGamePlay();
            fightersAttack();
            showAttackHit();
            gameOver();
            defenderLost();
        } else {
            return;
        }
    });
}

//player attacks enemy to decrease enemy hp
//enemy counter attacks to decrease player hp
function fightersAttack() {
    playerAttackPoints = player[1].attack;
    enemyAttackPoints = enemy[1].attack;
    player[1].decreaseHealth(enemyAttackPoints);
    enemy[1].decreaseHealth(playerAttackPoints);
    player[1].increaseAttack();
}

function showAttackHit() {
    $(player[0] + '-caption').html(player[1].name + ' ' + player[1].health + ' HP');
    $(enemy[0] + '-caption').html(enemy[1].name + ' ' + enemy[1].health + ' HP');

}

//show enemy and player attacks
function showGamePlay() {
    var playerMove = player[1].name + ' attacked with ' + player[1].attack + 'HP! </br>';
    var enemyMove = enemy[1].name + ' attacked with ' + enemy[1].attack + 'HP! </br>';
    $('#play-message').html(playerMove + enemyMove);
}

//true when enemy is defeated
function defeatedEnemy() {
    return enemy[1].isLoser();
}

//true when player is defeated
function defeatedPlayer() {
    return player[1].isLoser();
}

//show reset
//show gameover msg
function gameOver() {
    if (defeatedPlayer()) {
        $('#play-message').html('Game over...');
        var resetButton = '<button type="button" class="btn btn-info" id="reset-button">Reset</button>';
        $('#reset').html(resetButton);
        reset();
        $('.character-figure').show();
    }
}

function reset() {
    $('#reset-button').on('click', function() {
        $('#player-instruction').html('Choose a Player');
        $('.character-figure').appendTo('#characters');
        $('.character-figure').removeClass('player-figure enemy-figure defender-figure');
        $('.character-figure').css('border', '2px yellow solid');
        $('#play-message').html('');
        $('#reset').html('');
        beast.resetCharacter();
        phoenix.resetCharacter();
        magneto.resetCharacter();
        wolverine.resetCharacter();
        $('#' + beast.name + '-figure-caption').html(beast.name + ' ' + beast.baseHealth + ' HP');
        $('#' + phoenix.name + '-figure-caption').html(phoenix.name + ' ' + phoenix.baseHealth + ' HP');
        $('#' + magneto.name + '-figure-caption').html(magneto.name + ' ' + magneto.baseHealth + ' HP');
        $('#' + wolverine.name + '-figure-caption').html(wolverine.name + ' ' + wolverine.baseHealth + ' HP');
    });
}

//message saying you defeated character
//message to choose new enemy
function defenderLost() {
    if (defeatedEnemy()) {
        var message = player[1].name + ' defeated ' + enemy[1].name + '! Choose a new enemy';
        $('#play-message').html(message);
        $('.defender-figure').hide();
        $('.defender-figure').removeClass('defender-figure');
        if (allDefeated()) {
            $('#play-message').html('Congratulations! You defeated all enemies.');
            var resetButton = '<button type="button" class="btn btn-info" id="reset-button">Reset</button>';
            $('#reset').html(resetButton);
            reset();
            $('.character-figure').show();
        }
    }
}

function allDefeated() {
    var index = 0;
    $('.enemy-figure:hidden').each(function() {
        index++;
    });
    return index === 3;
}

function renderDom() {
    selectFighters();
    toggleFight();
}

$(document).ready(function() {
    renderDom();
});
