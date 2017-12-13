document .addEventListener ('DOMContentLoaded', function () {
	var reps = 100;
	
	svg .then (function (svg_str) {
		var canvas = document .createElement ('canvas');
		canvas .setAttribute ('width', '320');
		canvas .setAttribute ('height', '568');
		canvas .setAttribute ('style', 'position: absolute; width: 320px; height: 568px; left: 0px; top: 0px; touch-action: none; user-select: none;');
		document .body .insertBefore (canvas, null);
      var ctx = canvas .getContext ('2d');
      var DOMURL = window .URL || window .webkitURL || window;
      
      var img = new Image ();
      var svg = new Blob ([svg_str], {type: 'image/svg+xml'});
      var url = DOMURL .createObjectURL (svg);
      
      img .onload = function () {
        ctx .drawImage (img, 0, 0);
        //DOMURL.revokeObjectURL(url);

    		var start = performance .now ();
    		
    		for (var i = 0; i < reps; i ++) {
          ctx .clearRect (0, 0, canvas .width, canvas .height);
          ctx .drawImage (img, 0, 0);
    		}
    		
    		var done = performance .now ();
    		
    		alert ((done - start) / reps);
      }
      
      img .src = url;
	})
});