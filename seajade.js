var seajade = function () {
	var create_url = function (url) {
		return (window .URL || window .webkitURL || window) .createObjectURL (url);
	};
	var font_name_ = function (text) {
		return text .style .fontFamily || text .getAttribute ('font-family')
	};
	var all_fonts = function () {
	    var o = {},
	        sheet = document .styleSheets,
	        rule = null,
	        i = sheet .length, j;
	    while ( 0 <= -- i ) {
	        rule = sheet [i] .rules || sheet [i] .cssRules || [];
	        j = rule .length;
	        while ( 0 <= -- j ) {
	            if ( rule [j] .constructor .name === 'CSSFontFaceRule' ) { // rule[j].slice(0, 10).toLowerCase() === '@font-face'
	                o [ rule [j] .style .fontFamily ] = rule [j] .style .src;
	            };
	        }
	    }
	    return o;
	};
	var resource_ = function (url) {
		return fetch (url) .then (function (response) {
			return response .blob ();
		}) .then (create_url);
	};
	var native_list = function (x) {
		return [] .slice .call (x);
	};
	var imagify = function (svg_str) {
		return new Promise (function (resolve) {
			var img = new Image ();
			var svg = new Blob ([svg_str], {type: 'image/svg+xml'});
			var url = create_url (svg);
	
			img .onload = function () {
				resolve (img);
			}
	
			img .src = url;
		})		
	}; 
	return function (svg) {
		var load;
		var svg_str;
		if (typeof svg === 'string') {
			load = Promise .resolve ();
			svg_str = svg;
		}
		else {
			/*if (! svg .cached) {
				if (true/*svg .inlinable* /) {
					//load fonts
				}
				else {
					//var inlined_svg = svg .cloneNode (true);
					//throw new Error ('uninl');
				}
			}*/
			load = [svg .querySelectorAll ('image')]
				.map (native_list)
				.map (R .map (function (image) {
					if (! image .blob_loaded) {
						var href = image .getAttributeNS ('http://www.w3.org/1999/xlink', 'href');
						if (href && ! href .startsWith ('blob:')) {
							image .blob_loaded = resource_ (href) .then (function (blob) {
								image .setAttributeNS ('http://www.w3.org/1999/xlink', 'href', blob)
							});
						}
						else {
							image .blob_loaded = Promise .resolve ();
						}
					}
					return image .blob_loaded;
				}))
				.map (function (_) {
					return Promise .all (_) .then (R .tap (function () {
						svg_str = svg .outerHTML
					}))
				})
			[0];
		};
		
		var as_image = load .then (function () {
			return imagify (svg_str);
		});
		return function (canvas) {
			var ctx = canvas .getContext ('2d');
			var img;
			return [as_image .then (function (x) {
				img = x;
			}), function () {
				ctx .clearRect (0, 0, canvas .width, canvas .height);
				ctx .drawImage (img, 0, 0);
			}]
		}
	};
} ();