var myLoader = new Loader(),
	testing = false,
	testing_dev = false,
	myAPI = new API();
;

$(document).ready(function() {
	myAPI.init();
});

function API() {

	this.init = () => {
		this.initJqueryFunctions();
	};

	this.getRandomGameFromPSNTrophies = (entry, limit) => {

		myLoader.show();

		if(testing) return this.handleTrophiesResponse(fake_trophies_response);

		$.ajax({
			method: 'GET',
			url: 'http://webarranco.fr:3000/PSN/'+entry+'/trophies',

			success: (response) => {
				this.handleTrophiesResponse(response, limit);
			},
			error: function(err) {
				console.log(err);
			}
		});
	};

	this.handleTrophiesResponse = (response, limit) => {

		$('.getFromTrophies').html("You got trophies in "+response.trophyTitles.length+" games. Please pick one to see his trailer and description.");
		$('.gamesList').empty();

		for(var game in response.trophyTitles) {

			if(game < limit) {

				var uniquid = response.trophyTitles[game].npCommunicationId,
					bronze = response.trophyTitles[game].definedTrophies.bronze,
					silver = response.trophyTitles[game].definedTrophies.silver,
					gold = response.trophyTitles[game].definedTrophies.gold,
					platinum = response.trophyTitles[game].definedTrophies.platinum
				;

				var li = 
					`<li class="${uniquid}" data-description="" data-title="">
						<ul>
							<li><img src="img/bronze.png" width="20" /> ${bronze}</li>
							<li><img src="img/silver.png" width="20" /> ${silver}</li>
							<li><img src="img/gold.png" width="20" /> ${gold}</li>
							<li><img src="img/platinum.png" width="20" /> ${platinum}</li>
						</ul>
						<div class="divPicture"></div>
						<button class="seeGame">See this game</button>
					</li>`
				;

				$('.gamesList').append(li);
			} else {
				break;
			}
		}

		this.getGameAttributesFromGiantBombAPI(response.trophyTitles, 0, limit);
	};

	this.getGameAttributesFromGiantBombAPI = (games, offset, limit) => {

		var game = games[offset],
			gameName = game.trophyTitleName,
			gameClass = game.npCommunicationId
		;

		offset = offset + 1;

		var url = 
		'http://www.giantbomb.com/api/search/?api_key=3327051ef20bf9cf0ad5f8c80b8032066d1ef5f9&format=jsonp&json_callback=localJsonpCallback&limit=2&query='+gameName;

		$.ajax({
			method: 'GET',
			url: url,
			dataType: 'jsonp',
			jsonpCallback: "localJsonpCallback",

			success: (response) => {

				if(typeof response.results[0] !== "undefined") {
					$('.'+gameClass+' .divPicture').append('<img class="gamePicture" width="100" src="'+response.results[0].image.medium_url+'">');
					$('.'+gameClass).attr('data-description', response.results[0].description);
					$('.'+gameClass).attr('data-title', response.results[0].name);
				}

				if(offset < limit) {
					this.getGameAttributesFromGiantBombAPI(games, offset, limit);
				} else {
					this.getVideoTrailerFromDailymotion();
				}
			},

			error: function(err) {
				console.log(err);
			}
		});
	};

	this.handleGameAttributesResponse = function(response) {

		myLoader.hide();

		var game = {};

		if(typeof response.results !== "undefined") {

			if(response.results.length > 1) {

				var newId = 0,
					newName = '';

				game = response.results[0];

			} else {
				game = response.results[0];
			}
		}

		$('.game .title').html(game.name);
		$('.game .description').html(game.description);

		var realText = $('.game div p').eq(0).html();

		$('.game .description').html(realText);
		$('.game .picture').attr('src', game.image.medium_url);
	};

	this.getVideoTrailerFromDailymotion = function() {

		$('.gamesList li').each(function() {
			var that = $(this);

			if(typeof $(this).attr('data-title') !== "undefined") {

				var game = $(this).attr('data-title') + ' game trailer';

				$.ajax({
					method: 'GET',
					url: "https://api.dailymotion.com/videos?fields=id,url%2Ctitle&country=it&search="+game+"&page=2&limit=50",

					success: function(response) {
						that.attr('data-video', "//www.dailymotion.com/embed/video/"+response.list[0].id);
					},

					error: function(err) {
						console.log(err);
					}
				});
			}
		});

		myLoader.hide();
	};

	this.initJqueryFunctions = () => {

		var _this = this;

		setTimeout(function() {
			if(testing_dev) $('button').click();
		}, 500);

		$('form').on('submit', function(e) {
			e.preventDefault();

			var username = $('input[name=username]').val();
			if(testing_dev) username = 'guillaumanga';

			var limit = $('input[name=limit]').val();

			_this.getRandomGameFromPSNTrophies(username, limit);
		});

		$('.presentation .arrow').on('click', function() {

			if($('.presentation').hasClass('active')) {
				$('.presentation').removeClass('active');
				$(this).text('>');
			} else {
				$('.presentation').addClass('active');
				$(this).text('<');
			}
		});

		$(document).on('click', '.seeGame', function() {

			var li = $(this).parent();

			$('.game .title').empty().append(li.attr('data-title'));
			$('.game .description').empty().append(li.attr('data-description'));
			$('.game img').attr('src', li.find('.gamePicture').attr('src'));
			$('.game iframe').attr('src', li.attr('data-video'));
		});
	};
}

function rand(min, max) {
	return the_random = Math.floor(Math.random() * (max - min + 1)) + min;
}

function Loader() {

	this.show = function() {
		$('.bg_loader').show();
	};

	this.hide = function() {
		$('.bg_loader').hide();
	};
}
