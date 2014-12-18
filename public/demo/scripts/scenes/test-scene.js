function TestScene( ) {
	Scene.call( this );
	
	//this.testLayer = new Layer( );
	//this.addLayer( 'Test', this.testLayer );
	
	//this.background = new Background( 'Background-Title' );
	//this.testLayer.addComponent( 'Background', this.background );
	
	/*
	// Screen Title
	this.text = new Text( Resources['Localization']['Testing...1. 2. 3?'] );
	this.text.fontFamily = 'MK Mythologies';
	this.text.fontSize = viewport.height * 0.044;
	this.text.position.y = viewport.height * 0.23;
	this.testLayer.addComponent( 'Text', this.text );
	*/
	
	// Objects
//	this.ball = new Ball( );
//	this.paddle = new BluePaddle( );
//	this.background = new Layer();
//	this.background.addComponent( 'BG',new Background('1') );
//	this.foreground = new Layer();
	//this.background = new DefaultBackgroundLayer(this);
	//this.foreground = new DefaultForegroundLayer(this);
//	this.tester = new Layer( );
	
//	this.addLayer( 'Background', this.background );
//	this.addLayer( 'Test', this.tester );
//	this.addLayer( 'Foreground', this.foreground );
	
	//this.tester.addComponent( 'Ball', this.ball );
//	this.tester.addComponent( 'Paddle', this.paddle );
	
	//this.tester = new SoccerBall( );
	//this.tester.scale = 1;
	//this.testLayer.addComponent( 'Tester', this.tester );
	
	this.layer = new Layer( );
	this.addLayer( 'Layer', this.layer );
	
	this.paddle = new Component( );
	this.layer.addComponent( 'Component', this.paddle );
}

TestScene.prototype = new Scene;
TestScene.prototype.constructor = TestScene;

TestScene.prototype.update = function( deltaTime ) {
	Scene.prototype.update.call( this, deltaTime );
	
	// Handle Input
	if( InputManager.isButtonDown( Buttons.LEFT ) ) {
		this.paddle.rotation -= 360 * deltaTime;
	}
	if( InputManager.isButtonDown( Buttons.RIGHT ) ) {
		this.paddle.rotation += 360 * deltaTime;
	}
	if( InputManager.isButtonDown( Buttons.UP ) ) {
		this.paddle.velocity.x += Math.cos( this.paddle.rotation * Math.TO_RADIANS ) * viewport.width * 0.02;
		this.paddle.velocity.y += Math.sin( this.paddle.rotation * Math.TO_RADIANS ) * viewport.width * 0.02;
	}
	if( InputManager.isButtonDown( Buttons.DOWN ) ) {
		this.paddle.velocity.x -= Math.cos( this.paddle.rotation * Math.TO_RADIANS ) * viewport.width * 0.02;
		this.paddle.velocity.y -= Math.sin( this.paddle.rotation * Math.TO_RADIANS ) * viewport.width * 0.02;
	}
	if( InputManager.checkButtonPress( Buttons.ACTION ) && this.paddle.canShootProjectile() ) {
		this.paddle.shootProjectile();
	}



	/*
	if( !this.layers['Menu'] && InputManager.checkButtonPress( Buttons.BACK ) )
	{
		this.addLayer( 'Menu', new TestMenu( this ) );
	}
	
	Scene.prototype.update.call( this, deltaTime );
	
	// Paddle Input
	if( InputManager.isButtonDown( Buttons.LEFT ) ) {
		this.paddle.rotation -= 1;
	}
	if( InputManager.isButtonDown( Buttons.RIGHT ) ) {
		this.paddle.rotation += 1;
	}
	if( InputManager.isButtonDown( Buttons.UP ) ) {
		this.paddle.velocity.x += Math.cos( this.paddle.rotation * Math.TO_RADIANS ) * viewport.width * 0.02;
		this.paddle.velocity.y += Math.sin( this.paddle.rotation * Math.TO_RADIANS ) * viewport.width * 0.02;
	}
	if( InputManager.isButtonDown( Buttons.DOWN ) ) {
		this.paddle.velocity.x -= Math.cos( this.paddle.rotation * Math.TO_RADIANS ) * viewport.width * 0.02;
		this.paddle.velocity.y -= Math.sin( this.paddle.rotation * Math.TO_RADIANS ) * viewport.width * 0.02;
	}
	if( InputManager.checkButtonPress( Buttons.ACTION ) && this.paddle.canShootProjectile() ) {
		this.paddle.shootProjectile();
	}
	
	// Paddle Screen Logic
	if( this.paddle.boundingBox.left > viewport.width ) {
		this.paddle.position.x = this.paddle.position.x - (viewport.width + this.paddle.width );
	}else if( this.paddle.boundingBox.right < 0 ) {
		this.paddle.position.x = this.paddle.position.x + (viewport.width + this.paddle.width );
	}
	
	if( this.paddle.boundingBox.top > viewport.height ) {
		this.paddle.position.y = this.paddle.position.y - (viewport.height + this.paddle.width );
	}else if( this.paddle.boundingBox.bottom < 0 ) {
		this.paddle.position.y = this.paddle.position.y + (viewport.height + this.paddle.width );
	}
	*/
	
	
	/*
	if( InputManager.isButtonDown( Buttons.LEFT ) ) {
		//this.tester.rotation -= 1;
		//this.tester.changedRotation();
		//
		//this.tester.velocity.x -= viewport.width * 0.11 * deltaTime;
	}
	if( InputManager.isButtonDown( Buttons.RIGHT ) ) {
		//this.tester.rotation += 1;
		//this.tester.changedRotation();
		//
		//this.tester.velocity.x += viewport.width * 0.11 * deltaTime;
	}
	if( InputManager.isButtonDown( Buttons.UP ) ) {
		//this.tester.velocity.x += Math.cos( this.tester.rotation * Math.TO_RADIANS );
		//this.tester.velocity.y += Math.sin( this.tester.rotation * Math.TO_RADIANS );
		//this.tester.changedRotation();
		//
		//this.tester.rotation -= 1;
		//this.tester.changedRotation();
		//this.tester.velocity.y -= viewport.height * 0.11 * deltaTime;
	}
	if( InputManager.isButtonDown( Buttons.DOWN ) ) {
		//this.tester.velocity.x -= Math.cos( this.tester.rotation * Math.TO_RADIANS );
		//this.tester.velocity.y -= Math.sin( this.tester.rotation * Math.TO_RADIANS );
		//this.tester.changedRotation();
		//
		//this.tester.rotation += 1;
		//this.tester.changedRotation();
		//this.tester.velocity.y += viewport.height * 0.11 * deltaTime;
	}
	if( InputManager.isButtonDown( Buttons.ACTION ) ) {
		//this.tester.velocity.x += Math.cos( this.tester.rotation * Math.TO_RADIANS );
		//this.tester.velocity.y += Math.sin( this.tester.rotation * Math.TO_RADIANS );
		//this.tester.changedRotation();
	}
	
	if( this.tester.boundingBox.left < 0 || this.tester.boundingBox.right > viewport.width ) {
		//this.tester.velocity.x *= -1;
		//this.tester.changedRotation();
	}
	
	if( this.tester.boundingBox.top < 0 || this.tester.boundingBox.bottom > viewport.height ) {
		//this.tester.velocity.y *= -1;
		//this.tester.changedRotation();
	}
	*/
};