(function() {
	function seekBar($document) {
		
		var calculatePercent = function(seekBar, event) {
     	var offsetX = event.pageX - seekBar.offset().left;
     	var seekBarWidth = seekBar.width();
     	var offsetXPercent = offsetX / seekBarWidth;
     	offsetXPercent = Math.max(0, offsetXPercent);
     	offsetXPercent = Math.min(1, offsetXPercent);
     	return offsetXPercent;
 		};

		
		return {
			templateUrl: '/templates/directives/seek_bar.html',
			replace: true,
			restrict: 'E',
			scope: { 
				onChange: '&'
			},
			link: function(scope, element, attributes) {
				scope.value = 0;
				scope.max = 100;
				
				var seekBar = $(element);
				
				attributes.$observe('value', function(newValue) {
					scope.value = newValue;
				});
				
				attributes.$observe('max', function(newValue) {
					scope.max = newValue;
				});
				
				var percentString = function () {
					var value = scope.value;
					var max = scope.max;
					var percent = value / max * 100;
					return percent + "%";
				};
				
				scope.fillStyle = function() {
					return {width: percentString()};
				};
				
				scope.thumbStyle = function() {
					return {left: percentString()};
				};
				
				scope.onClickSeekBar = function(event) {
					var percent = calculatePercent(seekBar, event);
					scope.value = percent * scope.max;
					notifyOnChange(scope.value);
				};
				
				scope.trackThumb = function() {
					$document.bind('mousemove.thumb', function(event) {
						var percent = calculatePercent(seekBar, event);
						scope.$apply(function() {
							scope.value = percent * scope.max;
							notifyOnChange(scope.value);
						});
					});
					
					$document.bind('mouseup.thumb', function() {
						$document.unbind('mousemove.thumb');
						$document.unbind('mouseup.thumb');
					});
				};
				
				var notifyOnChange = function(newValue) {
     			if (typeof scope.onChange === 'function') {
         			scope.onChange({value: newValue});
     			}
 				};
			}
		};
	}
	
	angular
		.module('blocJams')
		.directive('seekBar', ['$document', seekBar]);
})();