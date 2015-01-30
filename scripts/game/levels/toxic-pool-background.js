function ToxicPoolBackgroundLayer( scene ) {
	Layer.call( this, scene );

	this.acids = [ ];
	for( var i = 1; i < 6; i++ ) {
		var acid = new Sprite( 'Paddle-Green' );
		//acid.opacity = 0.33;
		acid.i = i;
		acid.size.y = viewport.height;
		acid.size.x = viewport.width;
		acid.draw = function( context ) {
			if( this.i === 1 ) {
				Sprite.prototype.draw.call( this, context );
			} else {
				context.save();
				context.globalCompositeOperation = 'difference';
				Sprite.prototype.draw.call( this, context );
				context.globalAlpha = this.opacity;
				if( this.i % 5 === 0 ) {
					context.drawImage( this.image, this.position.x - this.size.x * this.registration.x * this.scale, this.position.y - this.size.y * this.registration.y * this.scale + this.size.y * this.scale, this.size.x * this.scale, this.size.y * this.scale );
				} else if( this.i % 4 === 0 ) {
					context.drawImage( this.image, this.position.x - this.size.x * this.registration.x * this.scale, this.position.y - this.size.y * this.registration.y * this.scale - this.size.y * this.scale, this.size.x * this.scale, this.size.y * this.scale );
				} else if( this.i % 3 === 0 ) {
					context.drawImage( this.image, this.position.x - this.size.x * this.registration.x * this.scale + this.size.x * this.scale, this.position.y - this.size.y * this.registration.y * this.scale, this.size.x * this.scale, this.size.y * this.scale );
				} else if( this.i % 2 === 0 ) {
					context.drawImage( this.image, this.position.x - this.size.x * this.registration.x * this.scale - this.size.x * this.scale, this.position.y - this.size.y * this.registration.y * this.scale, this.size.x * this.scale, this.size.y * this.scale );
				}
				context.restore();
			}
		};

		if( i === 1 ) {
			acid.rotation = 180;
			acid.velocity.x = 0;
		} else if( i % 5 === 0 ) {
			acid.velocity.y = -viewport.width * 0.11 * (i / 5);
		} else if( i % 4 === 0 ) {
			acid.velocity.y = viewport.width * 0.11 * (i / 4);
		} else if( i % 3 === 0 ) {
			acid.velocity.x = -viewport.width * 0.11 * (i / 3);
		} else if( i % 2 === 0 ) {
			acid.velocity.x = viewport.width * 0.11 * (i / 2);
		}

		this.addComponent( 'Acid' + i, acid );
		this.acids.push( acid );
	}

	this.background = new Background( 'Background-Toxic-Pool' );
	this.addComponent( 'Background', this.background );
}

ToxicPoolBackgroundLayer.prototype = new Layer;
ToxicPoolBackgroundLayer.prototype.constructor = ToxicPoolBackgroundLayer;

ToxicPoolBackgroundLayer.prototype.update = function( deltaTime ) {
	Layer.prototype.update.call( this, deltaTime );

	this.acids[0].scale = 1.5 + Math.sin( app.gameTime / 1000 ) / 2;

	for( var i = 0; i < this.acids.length; i++ )
	{
		if( this.acids[i].boundingBox.left > viewport.width ) {
			this.acids[i].position.x -= viewport.width;
		} else if( this.acids[i].boundingBox.right < 0 ) {
			this.acids[i].position.x += viewport.width;
		} else if( this.acids[i].boundingBox.top > viewport.height ) {
			this.acids[i].position.y -= viewport.height;
		} else if( this.acids[i].boundingBox.bottom < 0 ) {
			this.acids[i].position.y += viewport.height;
		}
	}
};