function MainStoryScene( ) {
	Scene.call( this );
	
	var storyLayer = this.addLayer( 'Story', new Layer( ) );
	
	storyLayer.addComponent( 'Background', new Background( 'Background-MainStory' ) );
	
	var attention = new Text( Resources['Localization']['Attention!'] );
	attention.color = 'black';
	attention.fontFamily = 'Arial Black';
	attention.fontSize = viewport.height * 0.04;
	attention.position.x = viewport.width * 0.19;
	attention.position.y = viewport.height * 0.15;
	attention.textAlign = 'left';
	storyLayer.addComponent( 'Attention', attention );
	
	var story = new Text( Resources['Localization']['Main Story'] );
	/*
	story.text = 'White Paddle bellows at your bloated filesize and lossy compression.\n'
	+ 'Do you have what it takes to ascend the ranks and defeat them?\n'
	+ 'Emerge victorious and you will be rewarded handsomely.\n'
	+ 'Should your objective fail, your fate will be sealed by White Paddle.\n'
	+ 'Regstration is at 3:30 on Thursday.';
	*/
	story.color = 'black';
	story.fontFamily = 'Arial';
	story.fontSize = viewport.height * 0.022;
	story.lineHeight = 1.5;
	story.position.x = viewport.width * 0.16;
	story.position.y = viewport.height * 0.19;
	story.textAlign = 'left';
	storyLayer.addComponent( 'Story', story );
}

MainStoryScene.prototype = new Scene;
MainStoryScene.prototype.constructor = MainStoryScene;

MainStoryScene.prototype.update = function( deltaTime ) {
	Scene.prototype.update.call( this, deltaTime );
	
	if( InputManager.checkButtonPress( Buttons.ACTION ) ||  this.timeElapsed >= 20 ) {
		SceneManager.changeScene( new TitleScene( ), Transitions.FADE );
	}
};