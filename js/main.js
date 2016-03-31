$(document).ready(function() {

	var myLoader = new Loader();

	setTimeout(function() {
		if(testing_dev) $('button').click();
	}, 500);

	$('form').on('submit', function(e) {
		e.preventDefault();

		var username = $('input').val();
		if(testing_dev) username = 'guillaumanga';
		getRandomGameFromPSNTrophies(username);
	});

	function rand(min, max) {
		return the_random = Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function getRandomGameFromPSNTrophies(entry) {

		myLoader.show();

		if(testing) return handleTrophiesResponse(fake_trophies_response);

		$.ajax({
			method: 'GET',
			url: 'http://webarranco.fr:3000/PSN/'+entry+'/trophies',

			success: function(response) {
				handleTrophiesResponse(response);
			},
			error: function(err) {
				console.log(err);
			}
		});
	}

	function handleTrophiesResponse(response) {
		// console.log('PSN', response);

		var game = response.trophyTitles[rand(0, response.trophyTitles.length - 1)];
		var gameName = game.trophyTitleName;

		// console.log('game', game);

		$('.getFromTrophies').html("From the "+response.trophyTitles.length+ " games which you got trophies, we selected one random which is : <b>"+gameName+"</b>");

		$('.game_trophies .number').html("You have "+game.fromUser.progress+"% of this game trophies.");

		getGameAttributesFromGiantBombAPI(gameName);
	}


	function Loader() {

		this.show = function() {
			$('.bg_loader').show();
		};

		this.hide = function() {
			$('.bg_loader').hide();
		};
	}

	function getGameAttributesFromGiantBombAPI(game) {
		if(testing) game = 'naruto ultimate';

		if(testing) return handleGameAttributesResponse(fake_games_response);

		$.ajax({
			method: 'GET',
			url: 'http://www.giantbomb.com/api/search/?api_key=3327051ef20bf9cf0ad5f8c80b8032066d1ef5f9&format=jsonp&json_callback=localJsonpCallback&query='+game,
			dataType: 'jsonp',
			jsonpCallback: "localJsonpCallback",

			success: function(response) {
				handleGameAttributesResponse(response);
			},

			error: function(err) {
				console.log(err);
			}
		});
	}

	function handleGameAttributesResponse(response) {
		console.log('giantBomb', response);

		myLoader.hide();

		var game = {};

		if(typeof response.results !== "undefined") {

			if(response.results.length > 1) {

				var newId = 0,
					newName = '';

				// for (var i = 0; i < response.results.length; i++) {
				// 	var id = response.results[i].id;
				// 	var name = response.results[i];

				// 	if((id < newId && name !== null) || newId === 0) {
				// 		newId = id;
				// 		newName = name;
				// 	}
				// }

				game = response.results[0];

			} else {
				game = response.results[0];
			}
		}

		console.log(game);

		$('.game .title').html(game.name);
		$('.game .description').html(game.description);

		var realText = $('.game div p').eq(0).html();

		$('.game .description').html(realText);
		$('.game .picture').attr('src', game.image.medium_url);
	}

});
