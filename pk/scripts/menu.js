function Menu( scene ) {
	Layer.call( this, scene );
	this.items = new Array( );
	this.currentIndex = -1;
}

Menu.prototype = new Layer;
Menu.prototype.constructor = Menu;

Menu.prototype.addItem = function( title, action ) {
	var lineSpacing = viewport.height * 0.01;
	var fontSize = viewport.height * 0.05;
	var item = new Text( title );
	item.color = 'white';
	item.fontSize = fontSize;
	item.textAlign = 'center';
	item.textBaseline = 'top';
	item.position.x = viewport.width * 0.50;
	item.position.y = viewport.height * 0.50 + ( item.fontSize + lineSpacing ) * this.items.length;
	this.addComponent( 'Item' + this.items.length, item  );
	
	this.items.push( {
		'action' : action,
		'component' : this.components['Item' + this.items.length],
		'enabled' : true,
		'title' : title
	} );
	
	for( var i in this.items ) {
		this.items[i].component.position.y = viewport.height * 0.50 + ( fontSize + lineSpacing ) * i - this.items.length * ( fontSize + lineSpacing ) / 2;
	}
	
	if( this.currentIndex === -1 ) {
		this.selectNextItem( );
	}
};

Menu.prototype.selectCurrentItem = function( ) {
	this.items[this.currentIndex].action( );
};

Menu.prototype.selectNextItem = function( ) {
	if( this.items[this.currentIndex] ) {
		this.items[this.currentIndex].component.fontWeight = 200;
		this.items[this.currentIndex].component.color = 'white';
	}
	this.currentIndex += 1;
	if( this.currentIndex >= this.items.length ) {
		this.currentIndex = 0;
	}
	this.items[this.currentIndex].component.fontWeight = 600;
	this.items[this.currentIndex].component.color = 'yellow';
};

Menu.prototype.selectPreviousItem = function( ) {
	this.items[this.currentIndex].component.fontWeight = 200;
	this.items[this.currentIndex].component.color = 'white';
	this.currentIndex -= 1;
	if( this.currentIndex < 0 ) {
		this.currentIndex = this.items.length - 1;
	}
	this.items[this.currentIndex].component.fontWeight = 600;
	this.items[this.currentIndex].component.color = 'yellow';
};

Menu.prototype.update = function( deltaTime ) {
	if( InputManager.checkButtonPress( Buttons.DOWN ) ) {
		this.selectNextItem( );
	}
	if( InputManager.checkButtonPress( Buttons.UP ) ) {
		this.selectPreviousItem( );
	}
	
	if( InputManager.checkButtonPress( Buttons.ACTION ) ) {
		this.selectCurrentItem( );
	}
};