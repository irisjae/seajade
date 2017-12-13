document .addEventListener ('DOMContentLoaded', function () {
	var reps = 100;

	svg .then (function (svg_str) {
		var container = document .createElement ('div');
		container .setAttribute ('style', 'position: absolute; width: 320px; height: 568px; left: 0px; top: 0px; touch-action: none; user-select: none;');
		document .body .insertBefore (container, null);
		
		var frame = document .createElement ('div');
		frame .style .opacity = '0';
		document .body .insertBefore (frame, null);
		frame .innerHTML = svg_str;
		var stage = frame .children [0];
		
		var options = {
			width: 320,
			height: 568,
			async: true,
			foreignObjectRendering: false,
			allowTaint: true,
			taintTest: false,
			useCORS: true
		};
		
		
		var i = 0;
		var render = function () {
			return Promise .resolve () .then (function () {
				if (i < reps)
					return html2canvas (stage, options) .then (function (canvas) {
						if (container .children [0]) {
							container .removeChild (container .children [0]);
						}
						container .insertBefore (canvas, null);
					}) .then (() => i ++) .then (render)
			})
		};
		
		i = reps - 1;
		render () .then (function () {
			options .async = false;
			i = 0;
			var start = performance .now ();
			render () .then (function () {
				var done = performance .now ();
				alert ((done - start) / reps);
			})
		});
	})
})