( function( ) {
	var instructions = document.getElementById( 'instructions' );
	var links = document.querySelectorAll( 'a' );
	var hotkeys = [ ];
	var i;

	// Add keyboard hotkeys to hyperlinks
	for( i = 0; i < links.length; ++i )
	{
		var link = links[i];
		var hotkey = links[i].textContent[0].toUpperCase( ); // Use first character
		link.setAttribute( 'data-hotkey', hotkey );
		hotkeys.push( hotkey );
	}

	document.onkeypress = function( e )
	{
		e = e || window.event;
		var i = hotkeys.indexOf( String.fromCharCode( e.charCode ).toUpperCase( ) );
		var colors = ['black', 'red', 'green', 'blue'];
		if( i !== -1 )
		{
			links[i].click( );
		}
		else if( String.fromCharCode( e.charCode ).toUpperCase( ) === ' ' )
		{
			var index = colors.indexOf( document.body.className );
			index += 1;
			if( index >= colors.length )
			{
				index = 0;
			}
			document.body.className = colors[ index ];
			document.getElementsByTagName( 'h1' )[0].className = colors[ index ];
		}
	};

	// Display appropriate instructions
	var platforms = [
		{ property: 'userAgent', regex: /Android/i },
		{ property: 'userAgent', regex: /Blackberry/i },
		{ property: 'userAgent', regex: /iPad/i },
		{ property: 'platform',  regex: /iPhone/i },
		{ property: 'platform',  regex: /iPod/i },
		{ property: 'platform',  regex: /Linux/i },
		{ property: 'platform',  regex: /Mac/i },
		{ property: 'platform',  regex: /Win/i }
	];

	for( i = 0, l = platforms.length, platform; i < l; i++ )
	{
		var platform = platforms[ i ];
		var identity = navigator[ platform.property ].match( platform.regex );
		if( identity )
		{
			instructions.classList.add( identity );
		}
	}
} )( );