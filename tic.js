$( document ).ready(function() {
	checkWinner();

	// responsive stuff
	var gridWidth = $('div.grid').css('width');
	$('div.grid').css('height', gridWidth); // responsive height
	$('div.grid').css('font', gridWidth+'/'+gridWidth+' monospace'); // responsive font/line size

	$('#button').click(function() {
		gameEnd = false;
		moves = 0;
		var grid = $('div.grid');
		grid.each( function(i) {
			$(grid[i]).removeClass('fixed');
			grid[i].innerHTML = '';
		});
		$('#game-end').fadeOut(300);
		// $('#game-end').css('display', 'none');
	});

	$('div.grid').click(function() {
		var cell = $(this).text();
		if (gameEnd === false && (cell === '' || $(this).hasClass('temp')) && !$(this).hasClass('fixed')) {
			if (player === 1) {
				$(this).text('X').addClass('fixed');
				player++;
			} else if (player === 2) {
				$(this).text('O').addClass('fixed');;
				player--;
			}
			moves++;
			checkEverything();
		}
	});

	$('div.grid')
		.mouseenter(function() {
			if ( !$(this).hasClass('fixed') ) {
				player === 1 ? $(this).text('X').addClass('temp') : $(this).text('O').addClass('temp');
			}
		})
		.mouseleave(function() {
			$(this).removeClass('temp');
			$(this).hasClass('fixed') ? true : $(this).text('')
		});

	function checkEverything() {
		if (!gameEnd) checkRow();
		if (!gameEnd) checkCol();
		if (!gameEnd) checkDiag();
		if (!gameEnd) checkTie();
		if (gameEnd) {
			$('#game-end').fadeIn(300);
		}
	}

	// create array of scores from the divs grid
	function arrayOfRows() {
		var preGrid = $('div.grid');
		maxMoves = preGrid.length
		var size = Math.sqrt(maxMoves);
		var arrayGrid = [];
		for (var i = 0, l = preGrid.length; i < l; i += size) {
			arrayGrid.push(preGrid.slice(i, i+size));
		}
		return arrayGrid;
	};

	// Check rows for winner
	function checkRow() {
		var grid = arrayOfRows();
		grid.forEach( function(row) {
			resetScores();
			row.each( function(el) {
				countScores(row[el].innerHTML);
			});
		});
	}

	// Check columns for winner
	function checkCol() {
			var grid = arrayOfRows();
			for (x = 0; x < grid.length; x++) {
				resetScores();
				for (y = 0; y < grid.length; y++) {
					countScores(grid[y][x].innerHTML);
				}
			}
		}

	// Check diagonals for winner
	function checkDiag() {
		var grid = arrayOfRows();
		// Check top left diagonal
		resetScores();
		for (x = 0; x < grid.length; x++) {
			for (y = 0; y < grid[x].length; y++) {
				if (x == y) {
					countScores(grid[x][y].innerHTML);
				}
			}
		}
		// Check top right diagonal
		resetScores();
		for (x = 0; x < grid.length; x++) {
			for (y = 0; y < grid[x].length; y++) {
				if (x+y == 2) {
					countScores(grid[x][y].innerHTML);
				}
			}
		}
	}

});


// game tracking stuff
var player = 1; // keep track of player turn
var moves  = 0; // keep track of the amount of moves
var gameEnd = false; // keep track when womeone will win
var p1 = 0, p2 = 0; //set default scores
var maxMoves = 0;

function checkWinner() {
	if (p1 === 3) {
		gameEnd = true;
		$('#winner').text('Player X WINS!')
	} else if (p2 === 3) {
		gameEnd = true;
		$('#winner').text('Player O WINS!')
	}
}

function countScores(val) {
	if (val === 'X') {
		p1++;
	} else if (val === 'O') {
		p2++;
	}
	checkWinner();
}

function resetScores() {
	p1 = 0, p2 = 0;
}

function checkTie() {
	if (maxMoves == moves) {
		gameEnd = true;
		$('#winner').text('Tie!')
	}
}

