(function( $ ){
  var settings = {
  		'prefix': 'prev_',
		'types': ['image/gif', 'image/png', 'image/jpeg']
	};

  var methods = {
     init : function( options ) {
		settings = $.extend(settings, options);
		
		return this.each(function(){
			$(this).bind('change', methods.change);
			$('#'+settings['prefix']+this.id).html('').addClass(settings['prefix']+'container');
		});
     },
     destroy : function( ) {
		return this.each(function(){
			$(this).unbind('change');
		})
     },
     change : function(event) { 
     	var id = this.id
     	
     	$('#'+settings['prefix']+id).html('');
     	
     	for(i=0; i<this.files.length; i++){
     		if(!$.inArray(this.files[i].type, settings['types'])){
     			window.alert("File of not allowed type");	
     			return false
     		}
     	}
     	
     	for(i=0; i<this.files.length; i++){
     		var reader = new FileReader();
			reader.onload = function (e) {
				$('<img />').attr({'src': e.target.result, 'alt': 'Image preview' }).addClass(settings['prefix']+'thumb').appendTo($('#'+settings['prefix']+id));
			};
			reader.readAsDataURL(this.files[i]);
     	}
     }
  };

  $.fn.preimage = function( method ) {
    if ( methods[method] ) {
		return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
		return methods.init.apply( this, arguments );
    } else {
		$.error( 'Method ' +  method + ' does not exist on jQuery.preimage' );
    }    
  
  };

})( jQuery );

