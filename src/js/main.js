var rps = {
	/*
	*  Array positions are important:
	*    - next beats previous but first beats last
	*	 - ['rock', 'spock', 'paper', 'lizard', 'scissors'];
	*/
	items: [ 'rock', 'paper', 'scissors' ],

	// Used in scope for timer
	counter: null,

	// Returns random selection from array
	random: function() {

		'use strict';

		var arr = this.items,
		arrLength = arr.length;

		return arr[ Math.floor( Math.random() * arrLength ) ];

	},

	// User selection screen click events
	selection: function() {

		'use strict';

		var $trigger = $( '.js-options' ).find( 'a' ),
			_this = this;

		$trigger.on( 'click', function( e ){

			e.preventDefault();

			var $self = $( this ),
				id = this.hash;

			// Show the next screen and hide current
			$( id ).show();
			$self.closest( '.game__screen' ).hide();

			// Run correct logic depending on user selection
			switch ( id ) {
				case '#single':
					_this.pvc();
				break;
				case '#auto':
					_this.cvc();
				break;
			}

		});

	},

	// Player vs Computer
	pvc: function() {

		'use strict';

		var $trigger = $( '.js-item' ),
			_this = this;

		$trigger.on( 'click', function(){

			var $self = $( this ),
				userChoice = $self.attr( 'data-item' ),
				computer = _this.random(),
				$result = $( '.game__result' ),
				winner = _this.result( userChoice, computer, true );

			// Change view to result screen
			$self.closest( '.game__screen--selection' ).hide().siblings( '.game__screen--result' ).show();

			// Append the choices to the cards
			$( '.game__player[data-player="one"]' ).find( '.card__result' ).text( userChoice );
			$( '.game__player[data-player="two"]' ).find( '.card__result' ).text( computer );

			// Start the timer and show winner
			_this.timer( $result, winner );

		});

	},

	// Computer vs Computer
	cvc: function() {

		'use strict';

		var player1 = this.random(),
			player2 = this.random(),
			winner = this.result( player1, player2, false ),
			$result = $( '.game__result' );

		// Append the choices to the cards
		$( '.game__player[data-player="one"]' ).find( '.card__result' ).text( player1 );
		$( '.game__player[data-player="two"]' ).find( '.card__result' ).text( player2 );

		// Start the timer and show winner
		this.timer( $result, winner );

	},

	// Count down to start game
	timer: function( el, winner ) {

		'use strict';

		var count = 3,
			$counter = el,
			$card = $( '.card' ),
			_this = this;

		$counter.text( 'Get Ready!' );

		// Set a timer to count down every second
		this.counter = setInterval( function(){

			$counter.text( count );
			count--;

			if ( count === -1 ) {

				$counter.text( 'Go!' );

				// Reset the timer
				clearInterval( _this.counter );


				// Add active class to card for animation
				$card.addClass( 'card--active' );

				// Announce the winner
				setTimeout(function () {
				    $counter.text( winner );
				}, 500);

			}

		}, 1000 );

	},

	// Logic to work out the result of the game
	result: function( player1, player2, user ) {

		'use strict';

		var arr = this.items,
			arrLength = arr.length-1,
			option1 = arr.indexOf( player1 ),
			option2 = arr.indexOf( player2 ),
			player = user ? 'You' : 'Player 1',
			ending = user ? ' win!' : ' wins!',
			result;

		if( option1 === option2 ) {

			result = 'It\'s a tie!';

		} else if( ( option1 === arrLength || option2 === arrLength ) && ( option1 === 0 || option2 === 0 ) ) {

			// First item beats last item in array
			result = option1 === 0 ? player : 'Player 2';
			result += ending;

		} else {

			// Work out largest number, grab that entry from array and return either Player 1 or Player 2
			result = ( player1 === arr[ Math.max( option1, option2 ) ] ) ? player : 'Player 2';
			result += ending;

		}

		return result;

	},

	// Reset the game
	reset: function() {

		'use strict';

		var $trigger = $( '.js-reset' ),
			$screens = $( '.game__screen' ),
			$card = $( '.card' ),
			_this = this;

		$trigger.on( 'click', function( e ){

			e.preventDefault();

			// Reset timer
			clearInterval( _this.counter );


			// Remove previous binding
			$( '.js-item' ).off( 'click' );

			// Hide all screens and show start
			$screens.hide();
			$( this.hash ).show();
			$( '.game__screen--selection' ).show();

			// Reset card animations
			$card.removeClass( 'card--active' );
		});

	},

	init: function() {

		'use strict';

		// Ask for player selection
		this.selection();

		// Enable reset click event
		this.reset();

	}
};

// Wait for document load before running
$(document).load( rps.init() );