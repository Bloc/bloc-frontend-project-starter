(function() {
	function SongPlayer() {
		var SongPlayer = {};
		
 /**
 * @desc Buzz object audio file
 * @type {Object}
 */
		
		var currentSong = null;
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
		
		
		SongPlayer.play = function(song) {
			if (currentSong !== song) {
				setSong(song);
				currentBuzzObject.play();
				song.playing = true;
			} else if (currentSong === song) {
						if (currentBuzzObject.isPaused()) {
							currentBuzzObject.play;
						}
				}
		};
		
		SongPlayer.pause = function(song) {
			currentBuzzObject.pause();
			song.playing = false;
		};
		
		return SongPlayer;
	};
	
	angular
		.module('blocJams')
		.service('SongPlayer', SongPlayer);
})();