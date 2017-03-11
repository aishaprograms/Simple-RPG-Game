// =====================================================
// CHARACTER METHODS AND CONSTRUCTOR

//Each time the Character attacks, their character's Attack Power increases by its base Attack Power.
function increaseAttack() {
    this.attack += this.baseAttack;
}

//An attack on either the Player or Enemy leads to a decrease in HP of Character
function decreaseHealth(enemyCounterAttack) {
    this.health -= enemyCounterAttack;
}

//returns true if the character lost
function isLoser(Character) {
    return this.health <= 0;
}

//resets manipulated parameters of character
function resetCharacter() {
    this.health = this.baseHealth;
    this.attack = this.baseAttack;
}

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

// =====================================================
// CHARACTER INSTANCES AND GLOBAL VARIABLES

//new instances of Characters
//global variables
var beast = new Character('Beast', '../images/beast.jpeg', 100, 5, 5);
var magneto = new Character('Magneto', '../images/magneto.jpeg', 150, 15, 15);
var phoenix = new Character('Phoenix', '../images/phoenix.jpeg', 120, 8, 8);
var wolverine = new Character('Wolverine', '../images/wolverine.jpeg', 180, 25, 25);
var player;
var enemy;
var playerAttackPoints;
var enemyAttackPoints;

// =====================================================
// CHARACTER SELECTION BASED ON CHARACTER-FIGURE CLICKED ON

//returns Character object based on figure selected
function setFighter(characterFigure) {
    if ($(characterFigure).is('#Beast-figure')) {
        return beast;
    } else if ($(characterFigure).is('#Magneto-figure')) {
        return magneto;
    } else if ($(characterFigure).is('#Phoenix-figure')) {
        return phoenix;
    } else if ($(characterFigure).is('#Wolverine-figure')) {
        return wolverine;
    }
}

// =====================================================
// CHOOSE PLAYER AND MAKE OTHERS ENEMIES

//activated by clicking on character figure
//chooses player
function selectPlayer(characterFigure) {
    player = setFighter(characterFigure);
    playerCharacter =$(characterFigure).css('border', '2px green solid');
    $('#player-instruction').html('Your Character');
    $('#selected-player').append(characterFigure);
    $(characterFigure).addClass('player-figure');
}

//moves other characters to enemy section after player is selected
function moveEnemies(characterFigure) {
    $('.character-figure').not(characterFigure).css('border', '2px red solid');
    $('.character-figure').not(characterFigure).insertAfter('#enemy-header');
    $('.character-figure').not(characterFigure).addClass('enemy-figure');
}

// =====================================================
// SELECT DEFENDER

//activated by clicking on character image
//chooses defender
//moves defender to defender section
function selectDefender(characterFigure) {
    enemy = setFighter(characterFigure);
    $(characterFigure).insertAfter('#defender-header');
    $(characterFigure).addClass('defender-figure');
    $('#play-message').html('You selected to fight ' + enemy.name);
}

// =====================================================
// FIGHTING

//player attacks enemy to decrease enemy hp
//enemy counter attacks to decrease player hp
function fightersAttack() {
    playerAttackPoints = player.attack;
    enemyAttackPoints = enemy.counterAttack;
    player.decreaseHealth(enemyAttackPoints);
    enemy.decreaseHealth(playerAttackPoints);
    player.increaseAttack();
}

//manipulates the figure captions of the player and enemy
function showAttackHit() {
    $('#' + player.name + '-figure-caption').html(player.name + ' ' + player.health + ' HP');
    $('#' + enemy.name + '-figure-caption').html(enemy.name + ' ' + enemy.health + ' HP');

}

//show enemy and player attacks
//displays message of each game play during attacks
function showGamePlay() {
    var playerMove = player.name + ' attacked with ' + player.attack + 'HP! </br>';
    var enemyMove = enemy.name + ' attacked with ' + enemy.attack + 'HP! </br>';
    $('#play-message').html(playerMove + enemyMove);
}

// =====================================================
// PLAYER OR ENEMY LOST

//true when enemy is defeated
function defeatedEnemy() {
    return enemy.isLoser();
}

//true when player is defeated
function defeatedPlayer() {
    return player.isLoser();
}

// =====================================================
// GAME OVER

//show reset
//show gameover msg
//show any characters that were hidden in previous rounds
function gameOver() {
    if (defeatedPlayer()) {
        $('#play-message').html('Game over...');
        var resetButton = '<button type="button" class="btn btn-info" id="reset-button">Reset</button>';
        $('#reset').html(resetButton);
        $('#fight-section').removeClass('show').addClass('hidden');
        reset();
        $('.character-figure').show();
    }
}

// =====================================================
// RESET

//resets all Character properties which were changed and resets the DOM
function reset() {
    $('#reset-button').on('click', function() {
        // reset html
        $('#player-instruction').html('Choose a Player');
        $('.character-figure').appendTo('#characters');
        $('.character-figure').removeClass('player-figure enemy-figure defender-figure');
        $('.character-figure').css('border', '2px yellow solid');
        $('#play-message').html('');
        $('#reset').html('');
        // reset characters
        beast.resetCharacter();
        phoenix.resetCharacter();
        magneto.resetCharacter();
        wolverine.resetCharacter();
        // change figure captions
        $('#' + beast.name + '-figure-caption').html(beast.name + ' ' + beast.baseHealth + ' HP');
        $('#' + phoenix.name + '-figure-caption').html(phoenix.name + ' ' + phoenix.baseHealth + ' HP');
        $('#' + magneto.name + '-figure-caption').html(magneto.name + ' ' + magneto.baseHealth + ' HP');
        $('#' + wolverine.name + '-figure-caption').html(wolverine.name + ' ' + wolverine.baseHealth + ' HP');
        // hide divs
        $('#defender').removeClass('show').addClass('hidden');
        $('#enemies').removeClass('show').addClass('hidden');
        $('#fight-section').removeClass('show').addClass('hidden');
        $('#game-play').removeClass('show').addClass('hidden');
        $('#reset').removeClass('show').addClass('hidden');
        $('#selected-player').removeClass('col-sm-6').addClass('col-sm-12');
    });
}

// =====================================================
// PLAYER WINS

//message saying you defeated character
//message to choose new enemy
function defenderLost() {
    if (defeatedEnemy()) {
        var message = player.name + ' defeated ' + enemy.name + '! Choose a new enemy';
        $('#play-message').html(message);
        $('.defender-figure').hide();
        $('.defender-figure').removeClass('defender-figure');
        $('#enemies').removeClass('hidden').addClass('show');
        $('#fight-section').removeClass('show').addClass('hidden');
        if (allDefeated()) {
            $('#play-message').html('Congratulations! You defeated all enemies.');
            var resetButton = '<button type="button" class="btn btn-info" id="reset-button">Reset</button>';
            $('#reset').html(resetButton);
            $('#enemies').removeClass('show').addClass('hidden');
            $('#fight-section').removeClass('show').addClass('hidden');
            reset();
            $('.character-figure').show();
        }
    }
}

// =====================================================
// PLAYER DEFEATS ALL

//loops through all figures which have a hidden class of enemy-figure and collects a total
//if total is 3, all enemies have been defeated
function allDefeated() {
    var total = 0;
    $('.enemy-figure:hidden').each(function() {
        total++;
    });
    return total === 3;
}

// =====================================================
// MAIN METHODS

//DOM modifiying function using jQuery
//selects the player and defender using the modified classes of the figures
//moves player, potential enemies, and defender to appropriate locations
function selectFighters() {
    $('.character-figure').on('click', function() {
        if (!$(this).hasClass('enemy-figure') && !$(this).hasClass('player-figure')) {
            selectPlayer(this);
            moveEnemies(this);
            $('#enemies').removeClass('hidden').addClass('show');
        } else if ($(this).hasClass('enemy-figure') && !$(this).hasClass('defender-figure')) {
            selectDefender(this);
            // hide divs
            $('#enemies').removeClass('show').addClass('hidden');
            $('#defender').removeClass('hidden').addClass('show');
            $('#selected-player').removeClass('col-sm-12').addClass('col-sm-6');
            $('#fight-section').removeClass('hidden').addClass('show');
            $('#game-play').removeClass('hidden').addClass('show');
        }
    });
}

//activated by attack button click
//added no enemy selected condition here
//carries out attack functions, DOM manipulation, gameover, player win, and restart game
//noDefender set to a boolean if there is no defender 
var noDefender = !$('.character-figure').hasClass('defender-figure');

function toggleFight() {
    $('#attack-button').on('click', function() {
        showGamePlay();
        fightersAttack();
        showAttackHit();
        $('#reset').removeClass('hidden').addClass('show');
        gameOver();
        defenderLost();
    });
}


// =====================================================
// RENDER DOM

//manipulates the DOM to display selected Characters and the effect of pressing the attack button
function renderDom() {
    selectFighters();
    toggleFight();
}

$(document).ready(function() {
    renderDom();
});
