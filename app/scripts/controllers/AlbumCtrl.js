(function() {
     function AlbumCtrl(Fixtures, SongPlayer) {
			 this.albumData = Fixtures.getAlbum();
			 this.songPlayer = SongPlayer;
     }
 
     angular
         .module('blocJams')
         .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);
 })();