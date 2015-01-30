function TestMenu( scene ) {
	Menu.call( this, scene );
	
	this.currentCategory = 0;
	this.categories = [
		Resources['Localization']['Balls'],
		Resources['Localization']['Paddles']
	];
	
	this.scenes = [
		Resources['Localization']['Test Scene'],
		Resources['Localization']['Title Scene']
	];
	
	this.addItem( Resources['Localization']['Ball:'] + ' ' + Resources['Localization']['Balls'], this.selectBall );
	this.addItem( Resources['Localization']['Paddle:'] + ' ' + Resources['Localization']['Yellow Paddle'], this.selectPaddle );
	this.addItem( Resources['Localization']['Level:'] + ' ' + Resources['Localization']['Default Level'], this.selectLevel );
	this.addItem( Resources['Localization']['Close Menu'], this.selectClose );
	this.addItem( Resources['Localization']['Return to Main Menu'], this.selectReturn );
}

TestMenu.prototype = new Menu;
TestMenu.prototype.constructor = TitleMenu;

TestMenu.prototype.selectClose = function() {
	this.closeMenu();
};

TestMenu.prototype.selectCategory = function() {
	this.increaseCategory();
};

TestMenu.prototype.decreaseCategory = function() {
	this.currentCategory -= 1;
	if( this.currentCategory < 0 ) {
		this.currentCategory = this.categories.length - 1;
	}
	this.items[this.currentIndex].component.text = Resources['Localization']['Category:'] + ' ' + this.categories[this.currentCategory];
};

TestMenu.prototype.increaseCategory = function() {
	this.currentCategory += 1;
	if( this.currentCategory >= this.categories.length ) {
		this.currentCategory = 0;
	}
	this.items[this.currentIndex].component.text = Resources['Localization']['Category:'] + ' ' + this.categories[this.currentCategory];
};


TestMenu.prototype.selectScene = function( ) {
	this.closeMenu();
	//SceneManager.changeScene( new TitleScene( ), Transitions.FADE );
};

TestMenu.prototype.update = function(deltaTime) {
	Menu.prototype.update.call(this, deltaTime);
	
	if( InputManager.checkButtonPress( Buttons.LEFT ) ) {
		if( this.items[this.currentIndex].title.lastIndexOf(Resources['Localization']['Category:'], 0) === 0) {
			this.decreaseCategory();
		}
	}
	
	if( InputManager.checkButtonPress( Buttons.RIGHT ) ) {
		if( this.items[this.currentIndex].title.lastIndexOf(Resources['Localization']['Category:'], 0) === 0) {
			this.increaseCategory();
		}
	}
};