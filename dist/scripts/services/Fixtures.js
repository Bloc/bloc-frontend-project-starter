(function() {
	function Fixtures() {
		var Fixtures = {};
		
		var albumPicasso = {
			 name: 'The Colors',
			 artist: 'Pablo Picasso',
			 label: 'Cubism',
			 year: '1881',
			 albumArtUrl: '/assets/images/album_covers/01.png',
			 songs: [
					 { name: 'Blue', length: '161.71', audioURL: '/assets/music/blue' },
					 { name: 'Green', length: '103.96', audioURL: '/assets/music/green' },
					 { name: 'Red', length: '268.45', audioURL: '/assets/music/red' },
					 { name: 'Pink', length: '153.14', audioURL: '/assets/music/pink'},
					 { name: 'Magenta', length: '374.22', audioURL: '/assets/music/magenta'}
			 ]
 		};


		var albumMarconi = {
			 name: 'The Telephone',
			 artist: 'Guglielmo Marconi',
			 label: 'EM',
			 year: '1909',
			 albumArtUrl: '/assets/images/album_covers/20.png',
			 songs: [
					 { name: 'Hello, Operator?', length: '1:01' },
					 { name: 'Ring, ring, ring', length: '5:01' },
					 { name: 'Fits in your pocket', length: '3:21'},
					 { name: 'Can you hear me now?', length: '3:14' },
					 { name: 'Wrong phone number', length: '2:15'}
			 ]
 		};
		
		Fixtures.getAlbum = function() {
			return albumPicasso;
		};
		
		
		Fixtures.getCollection = function(numberOfAlbums) {
				var albums = [];
     			for (var i = 0; i < numberOfAlbums; i++) {
         		albums.push(angular.copy(albumPicasso));
					}
				return albums;
		};
		
		return Fixtures;
	}
	
	angular
		.module('blocJams')
		.factory('Fixtures', Fixtures);
})();