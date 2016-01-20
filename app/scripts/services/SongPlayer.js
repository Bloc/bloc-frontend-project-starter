(function() {
	function SongPlayer(Fixtures) {
		var SongPlayer = {};
		
		
	/**
	* @desc Stores album info in currentAlbum variable
	* @type {Object} 
	*/
		
		var currentAlbum = Fixtures.getAlbum();
	
		
 /**
 * @desc Buzz object audio file
 * @type {Object}
 */
		
		var currentBuzzObject = null;
		
	/**
 	* @function setSong
 	* @desc Stops currently playing song and loads new audio file as currentBuzzObject
 	* @param {Object} song
 	*/
		
		var setSong = function(song) {
				if (currentBuzzObject) {
						currentBuzzObject.stop();
						SongPlayer.currentSong.playing = null;
				} 
			
			currentBuzzObject = new buzz.sound(song.audioURL, {
				formats: ['mp3'],
				preload: true
			});
				
				SongPlayer.currentSong = song;
		};
		
	/**
	* @function playSong
	* @desc Plays the currently selected song
	* @param {Object} song
	*/
		
		var playSong = function(song) {
			currentBuzzObject.play();
			song.playing = true;
		};
		
	/**
	* @function getSongIndex
	* @desc Stores the song index in the getSongIndex variable
	* @param {Object} song
	*/
		
		var getSongIndex = function(song) {
			return currentAlbum.songs.indexOf(song);
		};
		
	/**
 	* @desc Initializes currently selected song to null
 	* @type {Object} 
 	*/
		SongPlayer.currentSong = null;
		
		
		SongPlayer.play = function(song) {
			song = song || SongPlayer.currentSong;
			if (SongPlayer.currentSong !== song) {
				setSong(song);
				playSong(song);
			} else if (SongPlayer.currentSong === song) {
						if (currentBuzzObject.isPaused()) {
								currentBuzzObject.play();
								song.playing = true;
						}
				}
		};
		
		SongPlayer.pause = function(song) {
			song = song || SongPlayer.currentSong;
			currentBuzzObject.pause();
			song.playing = false
			setSong(song);
		};
		
	/**
	*	@desc Stores currently playing song index in the currentSongIndex variable
	* @type {Object} 
	*/
		
		
		
	/**
	* @function SongPlayer.previous
	* @desc Decreaces the current song index by one, and plays the previous song. Unless the index is already zero, then the 				 player will remain on the first song
	*/
		
		SongPlayer.previous = function() {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex--;
			
			if (currentSongIndex < 0) {
				currentBuzzObject.stop();
				SongPlayer.currentSong.playing = null;
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		};
		
		return SongPlayer;
	};
	
	angular
		.module('blocJams')
		.service('SongPlayer', ['Fixtures', SongPlayer]);
})();