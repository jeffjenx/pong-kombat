function KombatScene( ) {	Scene.call( this );
		this.addLayer( 'Background', new BackgroundLayer( this ) );	this.addLayer( 'Kombat', new KombatLayer( this ) );	this.addLayer( 'HUD', new HUDLayer( this ) );}KombatScene.prototype = new Scene;KombatScene.prototype.constructor = KombatScene;