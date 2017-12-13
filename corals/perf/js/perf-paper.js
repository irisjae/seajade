document .addEventListener ('DOMContentLoaded', function () {
	var reps = 100;
	
	svg .then (function (svg_str) {
		var canvas = document .createElement ('canvas');
		canvas .setAttribute ('width', '320');
		canvas .setAttribute ('height', '568');
		canvas .setAttribute ('style', 'position: absolute; width: 320px; height: 568px; left: 0px; top: 0px; touch-action: none; user-select: none;');
		document .body .insertBefore (canvas, null);
		
		paper .setup (canvas);
		paper .view .viewSize .set (320, 568);
		
		paper .project .importSVG(svg_str);
		
		var start = performance .now ();
		
		for (var i = 0; i < reps; i ++) {
			paper.view.draw();
		}
		
		var done = performance .now ();
		
		alert ((done - start) / reps);
	})
})