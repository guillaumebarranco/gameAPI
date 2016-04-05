<?php

// Trouver avec l'API PSN le jeu correspondant au premier trophée de la liste renvoyée.
// Trouver avec une API de site de jeux vidéo la correspondance de ce jeu avec sa fiche technique ou autre.
// Trouver avec l'API Youtube le trailer associé à ce jeu vidéo.
/*
$entry = 'guillaumanga';
$psnUrl = "http://webarranco.fr:3000/PSN/".$entry."/trophies";

$cl = curl_init($psnUrl);

curl_setopt($cl,CURLOPT_RETURNTRANSFER,true);
$response = json_decode(curl_exec($cl));
curl_close($cl);


$game = $response->trophyTitles[rand(0, count($response->trophyTitles) - 1)]->trophyTitleName;

echo "Parmi les ".count($response->trophyTitles). " jeux où vous avez obtenu des trophées nous en avons choisi un au hasard qui est : <b>".$game."</b>";
*/

?>

<!DOCTYPE HTML>

<html lang="en">

	<head>
		<title>API Mix</title>

		<meta charset="utf-8" />

		<link rel="stylesheet" href="bower_components/foundation/css/foundation.min.css">
		<link rel="stylesheet" href="css/loader.css">
		<link rel="stylesheet" href="css/index.css">
	</head>

<body>

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

	<form action="" method="post">
		<h3>Please enter your Playstation Network username</h3>
		<input type="text" name="username" value="guillaumanga" />

		<div style="width:50px;">
			<label for="limit">Limit</label>
			<input type="number" name="limit" value="2"/>
		</div>

		<button>Rechercher</button>
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

	<script src="bower_components/jquery/dist/jquery.min.js"></script>
	<!-- <script src="js/auth.js"></script>
	<script src="https://apis.google.com/js/client.js?onload=googleApiClientReady"></script> -->

	<script src="js/test.js"></script>
	<script src="js/main.js"></script>

</body>
</html>
