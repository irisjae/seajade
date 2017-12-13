document .addEventListener ('DOMContentLoaded', function () {
	var reps = 100;
	
	svg .then (function (svg_str) {
		var __ = document .createElement ('div');
		__ .innerHTML = svg_str;
		var _svg = __ .children [0];
		_svg .setAttribute ('style', 'position: absolute; width: 320px; height: 568px; left: 0px; top: 0px; touch-action: none; user-select: none;');
		
		document .body .insertBefore (_svg .cloneNode (true), null);
		document .body .children [0] .getBoundingClientRect ();
		
		var start = performance .now ();
		
		for (var i = 0; i < reps; i ++) {
		  if (document .body .children [0]) {
			  document .body .removeChild (document .body .children [0]);
		  }
		  document .body .insertBefore (_svg .cloneNode (true), null);
		  document .body .children [0] .getBoundingClientRect ();
		}
		
		var done = performance .now ();
		
		alert ((done - start) / reps);
	})
})