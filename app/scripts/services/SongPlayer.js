(function() {
	function SongPlayer($rootScope, Fixtures) {
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
	* @function stopSong
	* @desc Stops the current song and sets playing = null
	* @param {Object} song
	*/
		
		var stopSong = function(song) {
			currentBuzzObject.stop();
			SongPlayer.currentSong.playing = null;
		}
		
	/**
 	* @function setSong
 	* @desc Stops currently playing song and loads new audio file as currentBuzzObject
 	* @param {Object} song
 	*/
		
		var setSong = function(song) {
				if (currentBuzzObject) {
						stopSong(song);
				} 
			
			currentBuzzObject = new buzz.sound(song.audioURL, {
				formats: ['mp3'],
				preload: true
			});
			
			currentBuzzObject.bind('timeupdate', function() {
         $rootScope.$apply(function() {
             SongPlayer.currentTime = currentBuzzObject.getTime();
         });
      });
				
				SongPlayer.currentSong = song;
		};
		
	/**
	* @function playSong
	* @desc Plays the currently selected song and sets playing = true
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
		
	/**
	* @desc Current playback time (in seconds) of currently playing song
	* @type {Number}
	*/
		SongPlayer.currentTime = null;
		
		
		
		SongPlayer.play = function(song) {
			song = song || SongPlayer.currentSong;
			if (SongPlayer.currentSong !== song) {
				setSong(song);
				playSong(song);
			} else if (SongPlayer.currentSong !== null && SongPlayer.currentSong === song) {
						if (currentBuzzObject.isPaused()) {
								currentBuzzObject.play();
								song.playing = true;
						}
				}  else {
					song = currentAlbum.songs[0];
					setSong(song);
					playSong(song);
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
		
		/*
		repetition of playSong / setSong
		order of steps > serialization
		*/
		
	/**
	* @function SongPlayer.previous
	* @desc Decreaces the current song index by one, and plays the previous song. Unless the index is already zero, then the 				 player will stop playing. 
	*/
		
		SongPlayer.previous = function() {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex--;
			
			if (currentSongIndex < 0) {
				currentSongIndex = currentAlbum.songs.length - 1;
			}
			
			var song = currentAlbum.songs[currentSongIndex];
			
			setSong(song);
			playSong(song);
		};
		
	/**
	* @function SongPlayer.previous
	* @desc Increaces the current song index by one, and plays the next song. Unless the index is more that the array 							length, then the player will play the first song. 
	*/
		
		SongPlayer.next = function() {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex++;
			
			if (currentSongIndex > currentAlbum.songs.length - 1) {
				currentSongIndex = 0;
			} 
			
			var song = currentAlbum.songs[currentSongIndex];
			
			setSong(song);
			playSong(song);
		};
		
	/**
  * @function setCurrentTime
  * @desc Set current time (in seconds) of currently playing song
  * @param {Number} time
  */
		SongPlayer.setCurrentTime = function(time) {
   		if (currentBuzzObject) {
       	currentBuzzObject.setTime(time);
   		}
		};
		
		return SongPlayer;
	};
	
	angular
		.module('blocJams')
		.service('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();