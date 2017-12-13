document .addEventListener ('DOMContentLoaded', function () {
	var reps = 100;

	svg .then (function (svg_str) {
		var canvas = new fabric .Canvas ();
		canvas .setWidth (320);
		canvas .setHeight (568);
		
		document .body .insertBefore (canvas .getElement (), null);
		
		fabric .loadSVGFromString (svg_str, function (objects, options) {
			var obj = fabric .util .groupSVGElements (objects, options);  
			canvas .add (obj);
			
			canvas .renderAll ();
			
			var start = performance .now ();
			
			for (var i = 0; i < reps; i ++) {
				canvas .renderAll ();
			}
			
			var done = performance .now ();
			
			alert ((done - start) / reps);
		});
	})
})