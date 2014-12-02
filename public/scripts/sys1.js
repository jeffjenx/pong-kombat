jQuery(function( )
{
	var markdownConverter = new Markdown.Converter( );

	var $body = $( 'body' );
	var $head = $( 'head' );

	$body.wrapInner( '<div id="files" />' );
	$body.wrapInner( '<div id="desktop" />' );
	var $files = $( '#files' ).addClass( 'fake-window active' );
	var $desktop = $( '#desktop' );

	moment.locale( 'en-US' );

	// HTML formatting
	$( 'code', $files ).replaceWith( function( )
	{
		return this.innerHTML;
	} );

	// Load JS-required styles
	$head.append( '<link rel="stylesheet" href="/styles/sys1.css" />' );
	
	// Menu Bar
	var menuBar = {
		edit_copy : function( )
		{
			var selectedText = '';
			if( typeof window.getSelection != 'undefined' )
			{
				selectedText = window.getSelection( ).toString( );
			}
			else if( typeof document.selection != 'undefined' && document.selection.type == 'Text"' )
			{
				selectedText = document.selection.createRange( ).text;
			}

			// Not widely supported yet
			if( ClipboardEvent && selectedText.length > 0 )
			{
				var clip = new ClipboardEvent( 'copy' );
				clip.clipboardData.setData( 'text/plain', selectedText );
				clip.preventDefault( );
				e.target.dispatchEvent( clip );
			}
		},

		file_close : function( )
		{
			var $fakeWindow = $( '.fake-window.active' );
			$( '#menu' ).menu( 'collapseAll' );
			$fakeWindow.hide( );
			$( '#file_close, #window_close' ).addClass( 'ui-state-disabled' );

			if( Modernizr.localstorage )
			{
				localStorage['pongkombat.sys1.' + $fakeWindow.attr('id') + '.display'] = 'none';
			}
		},

		file_print : function( )
		{
			window.print( );
		},

		pac_about : function( )
		{
			$( '#readme' ).show( );
			$( '.fake-window' ).removeClass( 'active' );
			$( '#readme' ).addClass( 'active' );
			ga('send', 'event', window.location.pathname, 'readme');
		},

		pac_reload : function( )
		{
			window.location.reload( );
		},

		pac_shutdown : function( )
		{
			$body.hide( 'scale',
				{
					direction : 'vertical',
					duration : 666
				} )
				.hide( 'pulsate',
				{
					duration : 330
				} )
				.dequeue( );
			ga('send', 'event', window.location.pathname, 'shutdown');
		},

		window_close : function( )
		{
			menuBar.file_close( );
		},

		window_maximize : function( )
		{
			$('.fake-window.active').css( {
				left : 0,
				top  : 0,
				width : '100%',
				height : '100%'
			} );
		}
	};

	$.get( '/templates/directory/menu.html', function( result )
	{
		$( result ).menu(
		{
			position :
			{
				my : 'left top',
				at : 'left bottom'
			},
			select : function( event, menu )
			{
				menuBar[ menu.item.attr( 'id' ) ]( );
			},
			trigger : 'click'
		} ).appendTo( $body );
	} );

	// Application Windows
	var $readme = $( '<div id="readme" />' );
	var $calculator;

	$.when(
			// Readme
			$.get( '/languages/README.en.md', function( result )
			{
				var html = markdownConverter.makeHtml( result );
				$readme.appendTo( $desktop );
				$( html ).appendTo( $readme );
			} ),
			// Calculator
			$.get( '/templates/directory/calculator.html', function( result )
			{
				$calculator = $( result );
				$calculator.appendTo( $desktop );

				var $display = $( '#display', $calculator );
				
				var equation = '';
				var decimalAdded = false;
				$( 'button', $calculator ).on( 'click', function( )
				{
					var $this = $( this );
					switch( $this.attr( 'id' ) )
					{
						case 'clear' :
							$display.val( '' );
							equation = '';
							decimalAdded = false;
						break;
						case 'equate' : 
							equation = eval(equation);
							$display.val( equation );
							decimalAdded = false;
						break;
						case 'add' :
							$display.val( $display.val() + '+' );
							equation += '+';
							decimalAdded = false;
						break;
						case 'subtract' :
							$display.val( $display.val() + '-' );
							equation += '-';
							decimalAdded = false;
						break;
						case 'multiply' :
							$display.val( $display.val() + '\u00D7' );
							equation += '*';
							decimalAdded = false;
						break;
						case 'divide' :
							$display.val( $display.val() + '\u00F7' );
							equation += '/';
							decimalAdded = false;
						break;
						case 'decimal' :
							if( !decimalAdded )
							{
								$display.val( $display.val() + '.' );
								equation += '.';
							}
						break;
						case 'negate' :
							if( !isNaN( equation ) )
							{
								if( Number(equation) > 0 )
								{
									equation = '-' + equation;
								}
								else
								{
									equation = equation.substring( 1 );
								}
								$display.val( equation );
							}
						break;
						case 'percent' :
							if( !isNaN( equation ) )
							{
								equation = eval(equation + '/100');
								$display.val( equation );
							}
						break;
						default :
							if( !equation.length )
							{
								$display.val( '' );
							}
							$display.val( $display.val() + $this.text() );
							equation += $this.text();
					}
				} );
			} )
		)
		.then( function( )
		{
			var fixedHeaderTimeout = null;
			var $fakeWindows = $( '> div', $desktop );
			$fakeWindows.addClass( 'fake-window' )
				.draggable(
				{
					containment : $desktop,
					handle : '> h1:first-child',
					scroll : false,
					drag   : function( event, ui )
					{
						if( Modernizr.localstorage )
						{
							localStorage['pongkombat.sys1.' + ui.helper.attr('id') + '.left'] = ui.position.left;
							localStorage['pongkombat.sys1.' + ui.helper.attr('id') + '.top'] = ui.position.top;
						}
					}
				} )
				.resizable(
				{
					animate : true,
					handles : 'all',
					helper  : 'ui-resizable-helper',
					resize  : function( event, ui )
					{
						if( Modernizr.localstorage )
						{
							localStorage['pongkombat.sys1.' + ui.element.attr('id') + '.width'] = ui.size.width;
							localStorage['pongkombat.sys1.' + ui.element.attr('id') + '.height'] = ui.size.height;
						}
					}
				} )
				.on( 'scroll', function( )
				{
					// Manually position fixed header in fake-window
					// using scroll offsets
					var $this = $( this );
					
					$( '> h1:first-child', $this ).css(
					{
						left : $this.scrollLeft( ),
						top  : $this.scrollTop( )
					} );
					
					fixedHeaderTimeout = setTimeout( function( )
					{
						$( '> h1:first-child', $this ).css(
						{
							left : $this.scrollLeft( ),
							top  : $this.scrollTop( )
						} );
					}, 100 );
				} )
				.on( 'mousedown', function( )
				{
					// Unfocus other windows and set focus to "this" one
					$( '.fake-window' ).removeClass( 'active' );
					$( this ).addClass( 'active' );

					// Enable close window menu bar items
					$( '#file_close, #window_close' ).removeClass( 'ui-state-disabled' );
				} )
				.each( function( i )
				{
					var $this = $( this );
					$( '> :not( h1:first-child )', $this ).wrapAll( '<div class="overflow-wrapper" />' );
					
					// For blocking title bar stripes behind fake-window title name
					$( '> h1:first-child', $this ).wrapInner( '<span />' );
					
					// Close button in fake-window title bar
					$( '<button class="close"></button>' ).appendTo( $( '> h1:first-child', $this ) )
						.on( 'click', function( )
						{
							$this.hide( );
							$( '#file_close, #window_close' ).addClass( 'ui-state-disabled' );

							if( Modernizr.localstorage )
							{
								localStorage['pongkombat.sys1.' + $this.attr('id') + '.display'] = 'none';
							}
						} );

					$this.css(
					{
						position : 'absolute',
						left     : 'calc( 5% + 2em * ' + i + ' )',
						top      : 'calc( 5% + 2em * ' + i + ' )'
					} );

					// Restore position and size
					if( Modernizr.localstorage && localStorage['pongkombat.sys1.' + $this.attr('id') + '.display'] )
					{
						if( localStorage['pongkombat.sys1.' + $this.attr('id') + '.display'] )
						{
							$this.css( 'display', localStorage['pongkombat.sys1.' + $this.attr('id') + '.display'] );
						}

						if( localStorage['pongkombat.sys1.' + $this.attr('id') + '.left'] )
						{
							$this.css(
							{
								left     : localStorage['pongkombat.sys1.' + $this.attr('id') + '.left'],
								top      : localStorage['pongkombat.sys1.' + $this.attr('id') + '.top'],
							} );
						}
						if( localStorage['pongkombat.sys1.' + $this.attr('id') + '.width'] )
						{
							$this.css(
							{
								width    : localStorage['pongkombat.sys1.' + $this.attr('id') + '.width'],
								height   : localStorage['pongkombat.sys1.' + $this.attr('id') + '.height']
							} );
						}
						
					}
				} );

			$calculator.resizable( 'disable' );
		} );

	// Better File Types
	$.getJSON( '/scripts/sys1-filetypes.json', function( result ) {
		$( 'tbody [data-type="extension"]' ).each( function( cell ) {
			var $cell = $( this );
			var extension = $cell.data( 'sort' );
			if( result[ extension ] )
			{
				$cell.html( result[ extension ] );
			}
			else
			{
				$cell.html( extension + ' File' );
			}
		} );
	} );

	// Better Byte Sizes
	$( 'tbody [data-type="bytes"]' ).each( function( cell ) {
		var $cell = $( this );
		var bytes = $cell.data( 'sort' );

		if( $cell.prev( '[data-type="extension"]' ).data( 'sort' ).length === 0 )
		{
			// Directories
			bytes = '';
		}
		else if( bytes == 0 )
		{
			bytes = '0 Bytes';
		}
		else if( bytes == 1 )
		{
			bytes = '1 Byte';
		}
		else
		{
			var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
			var i = Math.floor( Math.log( bytes ) / Math.log( 1024 ) );
			bytes = ( bytes / Math.pow( 1024, i ) ).toPrecision( 3 ) + ' ' + sizes[ i ];
		}

		$cell.html( bytes );
	} );

	// Better Dates
	$( 'tbody [data-type="timestamp"]' ).each( function( cell ) {
		var $cell = $( this );
		var timestamp = '';

		if( $cell.data( 'sort' ) )
		{
			timestamp = moment( $cell.data( 'sort' ) ).format( 'll, LT' );
		}
		
		$cell.text( timestamp );
	} ); 

	// Sortable Directory Listing
	$( 'table thead a', $files ).click( function( e ) {
		e.preventDefault( );
	} );

	$( 'table hr', $files ).parents( 'tbody, tfoot' ).remove( );

	$( 'table', $files ).dataTable(
	{
		info : false,
		orderMulti : false,
		paging : false,
		searching : false
	} );

	// Desktop Icons
	$.get( '/templates/directory/icons.html', function( result )
	{
		$( result ).prependTo( $desktop );
		$( '> .icon', $desktop ).each( function( )
		{
			var $icon = $( this );

			var openIcon = function( )
			{
				// Analytics
				ga('send', 'event', window.location.pathname, $icon.data('window'));

				if( $icon.data( 'window' ) === 'pongkombat' )
				{
					window.location = 'http://www.pongkombat.com';
				}
				else
				{
					$( '.fake-window' ).removeClass( 'active' );
					$( '#' + $icon.data( 'window' ) ).addClass( 'active' ).show( );
					if( Modernizr.localstorage )
					{
						localStorage['pongkombat.sys1.' + $icon.data( 'window' ) + '.display'] = 'block';
					}
				}
			};

			$icon.draggable(
			{
				cancel : false,
				containment : $desktop,
				scroll : false,
				drag : function( event, ui )
				{
					if( Modernizr.localstorage )
					{
						localStorage['pongkombat.sys1.icon.' + $icon.data( 'window' ) + '.left'] = ui.position.left;
						localStorage['pongkombat.sys1.icon.' + $icon.data( 'window' ) + '.top'] = ui.position.top;
					}
				}
			} )
			.css(
			{
				position : 'absolute',
				bottom   : Math.round( 10 + Math.random( ) * 50 ) + '%',
				right    : Math.round( 10 + Math.random( ) * 80 ) + '%'
			} )
			.on( 'dblclick', openIcon );

			if( Modernizr.localstorage && localStorage['pongkombat.sys1.icon.' + $icon.data( 'window' ) + '.left'] )
			{
				// Use last position
				$icon.css(
				{
					left     : localStorage['pongkombat.sys1.icon.' + $icon.data( 'window' ) + '.left'],
					top      : localStorage['pongkombat.sys1.icon.' + $icon.data( 'window' ) + '.top'],
					right    : 'auto',
					bottom   : 'auto'
				} );
			}

			var hammertime = new Hammer($icon.get(0));
			hammertime.on('tap', openIcon );
		} );
	} );

	// Setup clock
	var $clock = $( '<time id="clock" />' ).appendTo( $body );
	var $date = $( '<time class="date" />').appendTo( $clock );
	var $time = $( '<time class="time" />').appendTo( $clock );
	var separator = ':';
	var updateClock = function( )
	{
		var currentTime = new Date( );
		var date = moment( currentTime ).format( 'ddd MMM D' );
		var time = moment( currentTime ).format( 'h' + separator + 'mm' );
		//date = date.substring( 0, date.lastIndexOf( ' ' ) );
		//time = time.substring( 0, time.indexOf( ' ' ) ).replace( /^0+/, '' );
		$date.text( date );
		$time.text( time );

		separator = ( separator === ':' ) ? ' ' : ':';
	};
	updateClock( );
	setInterval( updateClock, 1000 );
} );