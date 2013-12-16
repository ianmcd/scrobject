(function($) {
  $.fn.visible = function(partial) {
      var $t            = $(this),
          $w            = $(window),
          viewTop       = $w.scrollTop(),
          viewBottom    = viewTop + $w.height(),
          _top          = $t.offset().top,
          _bottom       = _top + $t.height(),
          compareTop    = partial === true ? _bottom : _top,
          compareBottom = partial === true ? _top : _bottom;
    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
  };
})(jQuery);



(function($) {
	$.fn.scrobject = function(args){
		
		var settings = $.extend({
			reset: "1" // 1 animation visible once, 2 only reset when scrolling down, 3 always reset
		}, args);
		
		var win = $(window);
		
		var scrobjs = this;
		
		scrobjs.each(function(i, obj) {
			var obj = $(obj);
			if(obj.visible(true)) {
				obj.addClass("scro-visible");
			}
		});
		
		$(window).one('scroll', function() {
		    var winBottom = win.scrollTop() + win.height();
		    scrobjs.each(function(i, obj) {
				var obj = $(obj);
				var objTop = obj.offset().top;
				if(objTop < winBottom) {
					obj.addClass("scro-animate");
				}
			});
		});
		
		var position = win.scrollTop();
		
		win.scroll(function(event) {
			var scroll = win.scrollTop();
			var winBottom = win.scrollTop() + win.height();
			
			scrobjs.each(function(i, obj) {
				var obj = $(obj);
				switch(settings.reset) {
					case "1":
						if(obj.visible(true) && scroll > position) {
							obj.addClass("scro-animate");
						}
						break;
					
					case "2":
						if(obj.visible(true) && scroll > position) {
							obj.addClass("scro-animate");
						} else {
							if(scroll < position){
								var objTop = obj.offset().top;
								if(objTop > winBottom) {
									obj.removeClass("scro-animate");
								}
							}
						}
						break;
						
					case "3":
						if(obj.visible(true)) {
							obj.addClass("scro-animate");
						} else {
							obj.removeClass("scro-animate");
						}
						break;
				}
				
			});
			
			position = scroll;
		});
		
		
		
		
	
		return this;
	}
})(jQuery); 