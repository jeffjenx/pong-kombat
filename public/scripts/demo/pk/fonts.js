window.addEventListener( 'load', function() {
	var fonts = ['Apple Garamond', 'MK Mythologies'];
	
	for( var i = 0; i < fonts.length; i++ ) {
		var preload = document.createElement( 'div' );
		preload.textContent = '&nbsp;';
		preload.style.fontFamily = fonts[i];
		document.body.appendChild( preload );
	}
} );