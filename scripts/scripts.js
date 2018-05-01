// This Starter Kit workshop is designed for you to create the foundation for your next project! You've had a bit of time to get familiar with object oriented JavaScript. Now let’s build a Jukebox!

// You will build a music player that will end up playing any mp3 you can find online. Think about what functionality you might need for this to work. Encapsulate all of this functionality in a JavaScript object so that starting a song is as simple as calling Jukebox.play() You need an array of song objects and the ability to play, stop and pause a song. How would you switch songs? Can you shuffle songs? Focus on getting the JavaScript to work and keep the HTML/CSS minimal, make it work before you make it look good!

// Hint: The next project you will be able to continue styling this Jukebox and API integration.

var audio = document.getElementById("player");
var playBtn = document.getElementById("play");
var stopBtn = document.getElementById("stop");
var nextBtn = document.getElementById("next");
var randBtn = document.getElementById("shuffle");

var songList = [];

var queueHolder = document.getElementById("queueHolder");

	// class Song {
	// 	constructor (name, path, artist, genre, coverart) {
	// 		this.name = name;
	// 		this.path = path;
	// 		this.artist = artist;
	// 		this.genre = genre;
	// 		this.coverart = coverart;
	// 	}
	// 	addToList () {
	// 		songList.push(this);
	// 		console.log(songList);
	// 	}
	// 	// addToList();
	// 	// this.addToList();
	// 	addToList.call();
	// }

// NOTE TO SELF — can you not call a function within a class?

function Song (name, path, artist, genre, coverart, queueSpot) {
		this.name = name;
		this.path = path;
		this.artist = artist;
		this.genre = genre;
		this.coverart = coverart;
		this.queueSpot = queueSpot;
		this.addToList = function (){
			songList.push(this);
		}
		this.addToQueue = function (){
			var newQueue = document.createElement("div");
			newQueue.className = queueSpot + " songqueue";
			newQueue.innerHTML = "<b>" + this.name + "</b>, by " + this.artist;
			queueHolder.appendChild(newQueue);
		}
		this.addToList();
		this.addToQueue();
}


// SAMPLE SONGS
var power = new Song ("A Fistful of Power", "music/A_Fistful_of_Power_395486.mp3", "Score Squad", ["rock", "dubstep", "electronic"], "images/power.jpg", 0);
var bones = new Song ("Bones", "music/Bones_395933.mp3", "GG Riggs", ["rock", "electronic"], "images/bones.png", 1);
var rainbow = new Song ("Colours of the Rainbow", "music/Colours_of_the_Rainbow_394598.mp3", "Yan Perchuk", ["folk", "indie pop", "pop rock", "upbeat", "pop", "indie"], "images/rainbow.jpeg", 2);
var stars = new Song ("Dusted Stars", "music/Dusted_Stars_430616.mp3", "Zane Dickinson", ["chill out", "pop rock", "electro pop", "electronic"], "images/stars.jpeg", 3);
var bubble = new Song ("Bubbles", "music/Bubbles_395408.mp3", "Material Music", ["bright", "fun", "happy", "playful", "pop"], "images/bubbles.jpg", 4);
// end sample songs



var art = document.getElementById("coverart");
var infoBox = document.getElementById("info");
var genreBox = document.getElementById("genres");

var current = 0;

var findGenres = function (array) {
	var all = array[0];
	for (i=1;i<array.length;i++) {
		all += "</li><li>";
		all += array[i];
	}
	return all;
}

playBtn.addEventListener("click", function() {audio.play()});
stopBtn.addEventListener("click", function() {audio.pause()});

nextBtn.addEventListener("click", function() {
	changeSong(current);
});

var changeSong = function (songNum) {
	if (current == songList.length - 1) {
		current = 0;
	} else {
		current = songNum + 1;
	}
	audio.setAttribute("src", songList[current].path);
	art.setAttribute("src", songList[current].coverart);
	infoBox.innerHTML = "<h1>" + songList[current].name + "</h1> <h2>" + songList[current].artist + "</h2>";
	genreBox.innerHTML = "<h3><ul><li>" + findGenres(songList[current].genre) + "</li></ul></h3>";
	audio.play();
}

changeSong(-1);


// START INPUTS + ADD NEW SONGS CODES

var newTitle = document.getElementById("title");
var newArtist = document.getElementById("artist");
var newURL = document.getElementById("url");
var newGenre = document.getElementById("genreNew");
var newArt = document.getElementById("art");
var goButton = document.getElementById("addNew");

goButton.addEventListener("click", function() {
	var res = [];
	function cutGenres (list) {
    	res = list.split(",");
	}
	cutGenres(newGenre.value);
	var songValue = songList.length;
	new Song(newTitle.value, newURL.value, newArtist.value, res, newArt.value, songValue);
});


// START QUEUE BUTTONS CODES

var queueList = document.getElementsByClassName("songqueue");

for (i=0; i<queueList.length;i++) {
	var queueSong = function(e) {
		var check = e.target.className[0];
		audio.setAttribute("src", songList[check].path);
		art.setAttribute("src", songList[check].coverart);
		infoBox.innerHTML = "<h1>" + songList[check].name + "</h1> <h2>" + songList[check].artist + "</h2>";
		genreBox.innerHTML = "<h3><ul><li>" + findGenres(songList[check].genre) + "</li></ul></h3>";
		audio.play();
	}
	queueList[i].addEventListener("click", queueSong, false);
}


// i can't believe i forgot to add a random button.....

randBtn.addEventListener("click", function() {randomSong()})

var randomSong = function() {
	var rando = (Math.random() * (songList.length - 1)).toFixed(0);
	audio.setAttribute("src", songList[rando].path);
	art.setAttribute("src", songList[rando].coverart);
	infoBox.innerHTML = "<h1>" + songList[rando].name + "</h1> <h2>" + songList[rando].artist + "</h2>";
	genreBox.innerHTML = "<h3><ul><li>" + findGenres(songList[rando].genre) + "</li></ul></h3>";
	audio.play();
}

