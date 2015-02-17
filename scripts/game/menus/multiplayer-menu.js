function MultiplayerMenu( scene ) {
	Menu.call( this, scene );
	
	this.addItem( 'Play Anybody', this.selectAnyone );
	this.addItem( 'Challenge Somebody', this.selectChallenge );
	this.addItem( 'Send An Invite', this.selectInvite );
	this.addItem( 'End Session', this.selectEnd );
}

MultiplayerMenu.prototype = new Menu;
MultiplayerMenu.prototype.constructor = MultiplayerMenu;

MultiplayerMenu.prototype.selectAnyone = function( ) {
	app.p2p.emit('client:playAnyone');
	app.p2p.on('server:roomReady',function(room){
		app.p2p.room = room.name;
		app.p2p.host = (app.p2p.id === room.host.id) ? true : false;
		SceneManager.changeScene( new PickPaddleScene(), Transitions.FADE, 0.5 );
	});
	/*
	app.p2p.on('server:ready',function(id){
		console.log('Players connected');
		app.p2p.room = id;
		SceneManager.changeScene( new PickPaddleScene(), Transitions.FADE, 0.5 );
	});
	*/
	this.scene.addLayer( 'Menu', new WaitMenu( this ) );
};

MultiplayerMenu.prototype.selectInvite = function( ) {
	console.log( 'Invite' );
};

MultiplayerMenu.prototype.selectChallenge = function( ) {
	//console.log( 'Random' );
	var id = window.prompt('Enter User ID');
	//app.peer = {'id':id};
	app.p2p.emit('client:join',id);
	//app.p2p.join(id);
	//app.p2p.broadcast.to(id).emit('user:join', app.p2p.id);
	SceneManager.changeScene(new PickPaddleScene(), Transitions.FADE, 0.5);
};

MultiplayerMenu.prototype.selectEnd = function( ) {
	SceneManager.changeScene( new TitleScene( ), Transitions.FADE, 0.5 );
};