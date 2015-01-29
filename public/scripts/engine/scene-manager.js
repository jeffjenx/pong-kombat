var Transitions =
{
	FADE : 1,
	NONE : 0
};

var SceneManager =
{
	currentScene : null,
	nextScene : null,
	transitioning : false,
	transitionContext : false,
	transitionLength : 1,
	transitionPercent : 0.0,
	transitionType : Transitions.NONE,
	
	changeScene : function( newScene, transitionType, transitionLength )
	{
		if( this.currentScene == null )
		{
			this.nextScene = newScene;
			this.transitionEnded( );
		}
		else
		{
			if( transitionLength === undefined )
			{
				transitionLength = 1; // 1s default
			}
			
			if( transitionType === undefined )
			{
				transitionType = Transitions.NONE;
			}
			
			this.transitioning = true;
			this.transitionLength = transitionLength;
			this.transitionPercent = 0.0;
			this.transitionType = transitionType;
			this.nextScene = newScene;
		}
		
		this.transitionContext = ( InputManager.context == Keyboard ) ? "Keyboard" : "Mouse";
		InputManager.context = false;
		
		// Default cursor
		document.body.style.cursor = "";
	},
	
	draw : function( context )
	{
		if( !( this.currentScene instanceof Object ) )
		{
			return;
		}
		
		if( !this.transitioning )
		{
			this.currentScene.draw( context );
		}
		else
		{
			switch( this.transitionType )
			{
				case Transitions.FADE :
					this.transitionFade( context );
				break;
				
				case Transitions.NONE :
				default :
					this.transitionNone( context );
				break;
			}
		}
	},
	
	transitionEnded : function( )
	{
		if( this.currentScene && this.currentScene.unload ) {
			this.currentScene.unload( );
		}
		this.currentScene = this.nextScene;
		this.nextScene = null;
		this.transitioning = false;
		this.currentScene.updateIn( 1 );
		InputManager.context = ( this.transitionContext == "Mouse" ) ? Mouse : Keyboard;
		while( InputManager.history.length )
		{
			InputManager.history.pop( );
		}
		InputManager.mouse.x = viewport.width / 2;
		InputManager.mouse.y = viewport.height / 2;
		this.transitionContext = false;
	},
	
	transitionFade : function( context )
	{
		this.currentScene.draw( context );
		context.save( );
		context.globalAlpha = this.transitionPercent;
		this.nextScene.draw( context );
		context.restore( );
		
		if( this.transitionPercent >= 1 )
		{
			this.transitionEnded( );
		}
	},
	
	transitionNone : function( context )
	{
		this.currentScene.draw( context );
		
		this.transitionEnded( );
	},
	
	update : function( deltaTime )
	{
		if( !(this.currentScene instanceof Object) )
		{
			return;
		}
		
		if( !this.transitioning )
		{
			this.currentScene.update( deltaTime );
		}
		else
		{
			this.transitionPercent += deltaTime / this.transitionLength;
			this.currentScene.updateOut( this.transitionPercent );
			this.nextScene.updateIn( this.transitionPercent );
		}
	}
};