seajade .transition = function () {
	var _ = {};
	
	var add_css = function (x) {
		var css = document .createElement ("style");
		css .type = "text/css";
		css .innerHTML = x;
		document .body .appendChild (css);
	}
	var uuid = function () {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' .replace (/[xy]/g, function (c) {
			var r = Math .random () * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v .toString (16);
		});
	};
	var canvas_ = function (svg) {
		var width = svg .clientWidth;
		var height = svg .clientHeight;
		var canvas = document .createElement ('canvas');
		canvas .setAttribute ('width', width);
		canvas .setAttribute ('height', height);
		canvas .setAttribute ('style', 'position: absolute; width: ' + width + 'px; height: ' + height + 'px; left: 0px; top: 0px; pointer-events: none; touch-action: none; user-select: none;');
		return canvas;
	};
	var native_list = function (x) {
		return [] .slice .call (x);
	};

	_ .svg = function (svg) {
		if (! svg .getAttribute ('seajade-transition-svg')) {
			var id = uuid ();
			svg .setAttribute ('seajade-transition-svg', id);
	
			var _canvas = canvas_ (svg);
			svg .seajade_transition_canvas = _canvas;
			svg .parentNode .insertBefore (_canvas, svg);
				
			var trail = false;
			var rerender;
			var render = function () {
				if (! rerender) {
					var x = seajade (svg) (_canvas);
		    		var pre = x [0];
		    		var post = x [1];
					rerender = pre .then (function () {
						return new Promise (function (resolve) {
							requestAnimationFrame (resolve);
						})
					}) .then (post) .then (function () {
			    		rerender = undefined;
			    	}) .then (function () {
			    		if (trail) {
			    			trail = false;
			    			render ();
			    		}
			    	});					
				}
				else {
					trail = true;
				}
				return rerender;
			}
					
			render () .then (function () {
				add_css ('svg[seajade-transition-svg="' + id + '"] { opacity: 0 !important; }');
			});
			new MutationObserver (function () {
				render ();
			}) .observe (svg, { attributes: true, childList: true, subtree: true });
		}
	};
	_ .document = function () {
		var body = document .body;

		if (! body .seajade_transition_body) {
			body .seajade_transition_body = true;
	
			[document .querySelectorAll ('svg')]
				.map (native_list)
				.map (R .filter (
					R .compose (R .not, R .contains (R .__, native_list (document .querySelectorAll ('svg svg'))))))
		    	.forEach (R .forEach (_ .svg));
	
			new MutationObserver (function (mutations_list) {
			    [mutations_list]
			    	.map (R .filter (function (x) {
			    		return x .type === 'childList'
			    	}))
			    	.map (R .chain (function (x) {
			    		if (R .is (SVGElement) (x .target))
			    			return [];
			    		else {
			    			return [x .addedNodes]
			    				.map (native_list)
			    				.map (R .filter (R .is (SVGSVGElement)))
			    			[0]
			    		}
			    	}))
			    	.forEach (R .forEach (function (x) {
			    		if (! x .seajade_transition_canvas)
			    			_ .svg (x);
			    		else
			    			x .parentNode .insertBefore (x .seajade_transition_canvas, x);
			    	}));
			    [mutations_list]
			    	.map (R .filter (function (x) {
			    		return x .type === 'childList'
			    	}))
			    	.map (R .chain (function (x) {
			    		if (R .is (SVGElement) (x .target))
			    			return [];
			    		else {
			    			return [x .removedNodes]
			    				.map (native_list)
			    				.map (R .filter (R .is (SVGSVGElement)))
			    			[0]
			    		}
			    	}))
			    	.forEach (R .forEach (function (x) {
			    		if (x .seajade_transition_canvas) {
			    			if (x .seajade_transition_canvas .parentNode)
			    				x .seajade_transition_canvas .parentNode .removeChild (x .seajade_transition_canvas)
			    		}
			    	}));
			}) .observe (body, { childList: true, subtree: true });
		}
	};
	
	return _;
} ();