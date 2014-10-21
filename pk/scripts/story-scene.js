function StoryScene( ) {
	Scene.call( this );
	
	this.paddle;
	
	this.storyText = new Text( '' );
	this.storyText.color = "#FFE8B8";
	this.storyText.fontFamily = "'Apple Garamond'";
	this.storyText.fontSize = viewport.height * 0.06;
	this.storyText.fontStyle = "200";
	this.storyText.position.x = viewport.width * 0.5;
	this.storyText.position.y = viewport.height * 0.5;
	this.storyText.textAlign = "center";
	
	var storyLayer = this.addLayer( 'Story', new Layer( ) );
	storyLayer.addComponent( 'StoryText', this.storyText );
}

StoryScene.prototype = new Scene;
StoryScene.prototype.constructor = StoryScene;

StoryScene.prototype.setPaddle = function( paddle ) {
	this.paddle = paddle;
};

StoryScene.prototype.setStory = function( story ) {
	var storyText = this.layers['Story'].components['StoryText'];
	if( story === 'end' ) {
		storyText.text = this.paddle.endStory;
	} else {
		storyText.text = this.paddle.story;
	}
};

StoryScene.prototype.update = function( deltaTime ) {
	Scene.prototype.update.call( this, deltaTime );
	
	if( InputManager.checkButtonPress( Buttons.ACTION ) )
	{
		SceneManager.changeScene( new TitleScene( ), Transitions.NONE );
	}
};