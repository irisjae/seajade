document .addEventListener ('DOMContentLoaded', function () {
	var reps = 100;

	svg .then (function (svg_str) {
		var canvas = document .createElement ('canvas');
		canvas .setAttribute ('style', 'position: absolute; width: 320px; height: 568px; left: 0px; top: 0px; touch-action: none; user-select: none;');
		document .body .insertBefore (canvas, null);
		
		var options = {
			width: 320,
			height: 568,
			baseUrl: 'https://kodingkingdom.com/'
		};
		
		
		var i = 0;
		var render = function () {
			return Promise .resolve () .then (function () {
				if (i < reps) {
			        var ctx = canvas .getContext ('2d');
					ctx .clearRect (0, 0, canvas .width, canvas .height);
					return rasterizeHTML .drawHTML (svg_str, canvas, options) .then (() => i ++) .then (render)
				}
			})
		};

		i = reps - 1;
		render () .then (function () {
			i = 0;
			var start = performance .now ();
			render () .then (function () {
				var done = performance .now ();
				alert ((done - start) / reps);
			})
		});
	})
})