<!DOCTYPE HTML>

<html lang="en">

	<head>
		<title>PSN Catcher</title>

		<meta charset="utf-8" />

		<link rel="stylesheet" href="bower_components/foundation/css/foundation.min.css">
		<link rel="stylesheet" href="css/loader.css">
		<link rel="stylesheet" href="css/index.css">
	</head>

<body>

	<section class="presentation">
		<h1>PSN catcher - Game Research From Playstation Network</h1>

		<p>
			Welcome on PSN catcher ! <br><br>

			The principle of this little application is simple. You just have to possess a Playstation Network account and fill the username field. <br><br>

			Click on the search button with the limit of games you want (the more the longest to wait) and our service will get your games with trophies information, and also provide you some games related to what you played. <br><br>

			Very nice to discover new games associated with your own likings ;) <br><br>

			Enjoy !
		</p>
		<div class="arrow">></div>
	</section>

	<form action="" method="post">
		<h3>Please enter your Playstation Network username</h3>
		<input type="text" name="username" value="guillaumanga" />

		<div style="width:50px;">
			<label for="limit">Limit</label>
			<input type="number" name="limit" value="2"/>
		</div>

		<button>Search</button>
	</form>

	<p class="getFromTrophies"></p>

	<ul class="gamesList"></ul>

	<div class="game">

		<h2 class="title"></h2>
		<div class="description"></div>

		<br />

		<div class="game_trophies">
			<div class="number"></div>
			<ul></ul>
		</div>

		<iframe frameborder="0" width="480" height="300" src="" allowfullscreen></iframe>
	</div>

	<div class="bg_loader">
		<article class="loader">
	        <div class="rectangle-bounce selected">
	          <div class="rect1"></div>
	          <div class="rect2"></div>
	          <div class="rect3"></div>
	          <div class="rect4"></div>
	          <div class="rect5"></div>
	        </div>
	    </article>
	</div>

	<script src="bower_components/jquery/dist/jquery.min.js"></script>

	<script src="js/test.js"></script>
	<script src="js/main.js"></script>

</body>
</html>
