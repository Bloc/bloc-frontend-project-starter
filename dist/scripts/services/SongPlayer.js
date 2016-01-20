(function() {
	function SongPlayer() {
		var SongPlayer = {};
	
		
 /**
 * @desc Currently selected song
 * @type {Object} 
 */
		var currentSong = null;
		
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
						currentSong.playing = null;
				} 
			
			currentBuzzObject = new buzz.sound(song.audioURL, {
				formats: ['mp3'],
				preload: true
			});
				
				currentSong = song;
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
		
		
		SongPlayer.play = function(song) {
			if (currentSong !== song) {
				setSong(song);
				playSong(song);
			} else if (currentSong === song) {
						if (currentBuzzObject.isPaused()) {
								currentBuzzObject.play();
								song.playing = true;
						}
				}
		};
		
		SongPlayer.pause = function(song) {
			currentBuzzObject.pause();
			song.playing = false
			setSong(song);
		};
		
		return SongPlayer;
	};
	
	angular
		.module('blocJams')
		.service('SongPlayer', SongPlayer);
})();