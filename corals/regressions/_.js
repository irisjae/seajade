var R = require ('ramda');
var path = require ('path');
var fs = require ('fs-extra');
var jsdom = require ('jsdom');

var file = function (path) {
	return fs .readFileSync (path) .toString ();
};
var time = function (name, what) {
	var start = new Date ();
	try {
		var x = what ();
		console .log (name, 'took', (new Date () - start) / 1000, 's');
	}
	catch (e) {
		if (! (e && e .reported)) {
			console .log (name, 'failed', (new Date () - start) / 1000, 's');
		}
		else {
			console .log (name, 'failed', (new Date () - start) / 1000, 's', e);
			if (e)
				e .reported = true;
		}
		throw e;
	}
	return x;
};
var files =	function (extension) {
	return	function (dir) {
				var results = [];
				var list = fs .readdirSync (dir);
				list .forEach (function (file) {
					file = path .join (dir, file);
					var stat = fs .statSync (file);
					if (stat && stat .isDirectory ())
						results = results .concat (files (extension) (file));
					else if (file .endsWith (extension))
						results .push (file);
				});
				return results;
			}
};
var window = (new jsdom .JSDOM ()) .window;

with (window) {
	var frag = function (html) {
		var container = document .createElement ('template');
		container .innerHTML = html;
		return container .content;
	}; 
}
var native_array = function (x) {
	return [] .slice .call (x);
};


[files ('.svg') (__dirname)]
    .map (R .reduce (R .useWith (R .mergeWith (R .concat), 
    	[R .identity, function (path) {
	        var string = file (path);
	        var dom = frag (string) .children [0];
	        
	        with (window) {
	            return [dom .querySelectorAll ('*')]
	                .map (native_array)
	                .map (R .map (function (_) {
	                    return R .objOf (_ .tagName .toLowerCase ()) (
	                        [_ .attributes]
	                            .map (native_array)
	                            .map (R .map (function (_) {
	                                return _ .nodeName
	                            }))
	                        [0]
	                    )
	                }))
	                .map (R .reduce (R .mergeWith (R .concat)) ({}))
	            [0]
	        }
	    }])) ({}))
    .map (R .map (R .uniq))
    .forEach (function (_) {
        console .log (JSON .stringify (_, null, 4));
    });