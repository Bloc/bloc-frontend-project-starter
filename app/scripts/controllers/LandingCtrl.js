(function() {
     function LandingCtrl() {
			 this.heroTitle = "Turn the Music Up!";
     }
 
     angular
         .module('blocJams')
         .controller('LandingCtrl', LandingCtrl);
 })();