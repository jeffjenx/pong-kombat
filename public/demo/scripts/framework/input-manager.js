var Buttons = {
	ACTION : 0,
	DOWN : 1,
	LEFT : 2,
	RIGHT : 3,
	UP : 4,
	PAUSE : 5,
	MUTE : 6,
	BACK : 7
};

var Keyboard = {
	32 : Buttons.ACTION,   // <spacebar>
	16 : Buttons.ACTION,   // <shift>
	40 : Buttons.DOWN,     // <down_arrow>
	83 : Buttons.DOWN,     // S
	37 : Buttons.LEFT,     // <left_arrow>
	65 : Buttons.LEFT,     // A
	39 : Buttons.RIGHT,    // <right_arrow>
	68 : Buttons.RIGHT,    // D
	38 : Buttons.UP,       // <up_arrow>
	87 : Buttons.UP,       // W
	13 : Buttons.PAUSE,    // <enter>
	80 : Buttons.PAUSE,    // P
	77 : Buttons.MUTE,     // M
	 8 : Buttons.BACK,     // <backspace>
	27 : Buttons.BACK      // ESCAPE
};

var Mouse = {
	1 : Buttons.ACTION     // <left_button>
};

var InputManager = {
	currentState : { },
	previousState : { },
	
	history : [ ],
	
	context : Keyboard,
	mouse : { x : 0, y : 0 },
	
	lastXY : { },
	pointerEvent : { },
	
	checkButtonPress : function( button ) {
		if( button == undefined )
		{
			for( var i in Buttons )
			{
				if( this.wasButtonDown( Buttons[i] ) && this.isButtonUp( Buttons[i] ) )
				{
					return true;
				}
			}
			
			return false;
		}
		
		return ( this.wasButtonDown( button ) && this.isButtonUp( button ) ) ? true : false;
	},
	
	checkSequence : function( buttonSequence ) {
		var sequence = buttonSequence.join( );
		var history = InputManager.history.join( );
		if( sequence !== history.substring( history.length - sequence.length ) ) {
			return false;
		}
		
		return true;
	},
	
	handlePointers : function( event ) {
		var controls = document.getElementById( 'controls' );
		
		if( event.preventManipulation )
		{
			event.preventManipulation( );
		}
		
		if( event.preventDefault )
		{
			event.preventDefault( );
		}
		
		var touchPoint = event;
		var touchPointId = (typeof touchPoint.pointerId != 'undefined') ? touchPoint.pointerId : 1;
		
		if( controls.style.display == "none" )
		{
			
			if( event.type.match( /(down|start)$/i ) )
			{
				InputManager.lastXY[touchPointId] = { x : touchPoint.pageX, y : touchPoint.pageY };
				InputManager.context = Keyboard;
				InputManager.mouse.x = touchPoint.pageX - viewport.offsetLeft;
				InputManager.mouse.y = touchPoint.pageY - viewport.offsetTop;
				InputManager.currentState[Mouse['1']] = Date.now( );
			}
			else if( event.type.match( /move$/i ) )
			{
				if( InputManager.lastXY[touchPointId] && InputManager.context == Mouse )
				{
					InputManager.lastXY[touchPointId] = { x : touchPoint.pageX, y : touchPoint.pageY };
					InputManager.mouse.x = touchPoint.pageX - viewport.offsetLeft;
					InputManager.mouse.y = touchPoint.pageY - viewport.offsetTop;
				}
			}
			else if( event.type.match( /(up|end)$/i ) )
			{
				delete InputManager.lastXY[touchPointId];
				delete InputManager.currentState[Mouse[1]];
			}
		}
		else
		{
			if( event.type.match( /(down|start|move)$/i ) )
			{
				InputManager.lastXY[touchPointId] = { x : touchPoint.pageX, y : touchPoint.pageY };
				var buttons = controls.getElementsByTagName( 'button' );
				
				for( var j = 0; j < buttons.length; j++ )
				{
					var touchCoordinates = {
						x : touchPoint.clientX - viewport.offsetLeft,
						y : touchPoint.clientY - viewport.offsetTop
					};
					
					var buttonBox = {
						bottom : buttons[j].offsetTop + buttons[j].offsetHeight,
						left : buttons[j].offsetLeft,
						right : buttons[j].offsetLeft + buttons[j].offsetWidth,
						top : buttons[j].offsetTop
					};
					
					if( Collision.PointRect( touchCoordinates, buttonBox ) )
					{
						InputManager.currentState[ Buttons[ buttons[j].id.toUpperCase( ) ] ] = Date.now( );
						InputManager.pointerEvent[ touchPointId ] = buttons[j].id.toUpperCase( );
					}
				}
			}
			else if( event.type.match( /(up|end)$/i ) )
			{
				delete InputManager.lastXY[touchPointId];
				delete InputManager.currentState[ Buttons[ InputManager.pointerEvent[ touchPointId ] ] ];// = false;
				delete InputManager.pointerEvent[ touchPointId ];
			}
		}
	},
	
	handleTouch : function( event ) {
		var controls = document.getElementById( 'controls' );
		
		if( controls.style.display == "none" )
		{
			// Simulate Mouse Event
			var touches = event.changedTouches;
			var touch = touches[0];
			var type = "";
			
			switch( event.type )
			{
				case "touchstart": type = "mousedown"; break;
				case "touchmove":  type = "mousemove"; break;
				case "touchend":   type = "mouseup"; break;
				default: return;
			}
			
			for( var i = 0; i < touches.length; i++ )
			{
				var simulatedEvent = document.createEvent( "MouseEvent" );
				simulatedEvent.initMouseEvent( type, true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null );
				touch.target.dispatchEvent( simulatedEvent );
			}
		}
		else
		{
			// Handle On-Screen Controls
			var buttons = controls.getElementsByTagName( 'button' );
			
			for( var i = 0; i < event.touches.length; i++ )
			{
				var touch = event.touches[i];
				
				switch( event.type )
				{
					case "touchstart" :
					case "touchmove" :
						for( var j = 0; j < buttons.length; j++ )
						{
							var touchPoint = {
								x : touch.clientX,
								y : touch.clientY
							};
							
							var buttonBox = {
								bottom : buttons[j].offsetTop + buttons[j].offsetHeight,
								left : buttons[j].offsetLeft,
								right : buttons[j].offsetLeft + buttons[j].offsetWidth,
								top : buttons[j].offsetTop
							};
							
							if( Collision.PointRect( touchPoint, buttonBox ) )
							{
								InputManager.currentState[ Buttons[ buttons[j].id ] ] = Date.now( );
							}
						}
					break;
					
					case "touchend" :
						delete InputManager.currentState[ Buttons[ buttons[j].id ] ];
					break;
				}
			}
		}
		
		event.preventDefault( );
	},
	
	isButtonDown : function( button ) {
		return button in this.currentState;
	},
	
	isButtonUp : function( button ) {
		return !this.isButtonDown( button );
	},
	
	wasButtonDown : function( button ) {
		return button in this.previousState;
	},
	
	wasButtonUp : function( button ) {
		return !this.wasButtonDown( button );
	}
};