function TitleScene( ) {
	Scene.call( this );
	
	if( Resources['Localization'].UseRTL == "true" )
	{
		document.body.style.direction = "rtl";
	}
	
	/*
	this.background = new Sprite( "BackgroundPaper" );
	this.background.size.x = viewport.width;
	this.background.size.y = viewport.height;
	*/
	
	this.titleText = new Text( Resources['Localization'].Title );
	this.titleText.color = "#FFE8B8";
	this.titleText.fontFamily = "'Apple Garamond'";
	this.titleText.fontSize = viewport.height * 0.11;
	this.titleText.fontStyle = "200";
	this.titleText.position.x = viewport.width * 0.5;
	this.titleText.position.y = viewport.height * 0.5;
	this.titleText.textAlign = "center";
}

TitleScene.prototype = new Scene;
TitleScene.prototype.constructor = TitleScene;

TitleScene.prototype.draw = function( context ) {
	/*
	this.background.draw( context );
	*/
	this.titleText.draw( context );
};

TitleScene.prototype.update = function( deltaTime ) {
	Scene.prototype.update.call( this, deltaTime );
	
	if( InputManager.checkButtonPress( Buttons.ACTION ) )
	{
		SceneManager.changeScene( new ChoosePaddleScene( ), Transitions.NONE );
	}
};