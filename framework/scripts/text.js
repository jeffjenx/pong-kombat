function Text( text ) {
	Component.call( this );
	
	this.color = "white";
	this.fontFamily = "Arial";
	this.fontSize = viewport.height / 10;
	this.fontStyle = "";
	this.letterSpacing = 0;
	this.text = text;
	this.textAlign = "center";
	this.textBaseline = "middle";
	this.textShadow = false;
	this.wordWrap = false;
	
	this.calculateSize( backBufferContext );
}

Text.prototype = new Component;
Text.prototype.constructor = Text;

Text.prototype.applySpacing = function( context, text, positionX, positionY ) {
	var currentX = positionX;
	var characters = text.split( "" );
	
	for( var i = 0, len = characters.length; i < len; ++i )
	{
		var metrics = context.measureText( characters[i] );
		
		context.fillText( characters[i], currentX, positionY );
		currentX += metrics.width + this.letterSpacing;
	}
};

Text.prototype.calculateSize = function( context ) {
	context.save( );
	context.font = this.fontStyle + " " + ( this.fontSize * this.scale ) + "px " + this.fontFamily;
	this.size = new Vector( [ backBufferContext.measureText( this.text ).width, this.fontSize ] );
	context.restore( );
};

Text.prototype.draw = function( context ) {
	context.save( );
	context.fillStyle = this.color;
	context.font = this.fontStyle + " " + ( this.fontSize * this.scale ) + "px " + this.fontFamily;
	context.textAlign = this.textAlign;
	context.textBaseline = this.textBaseline;
	context.globalAlpha = this.opacity;
	
	if( this.textShadow )
	{
		context.shadowColor = this.textShadow.color;
		context.shadowBlur = this.textShadow.blur;
		context.shadowOffsetX = this.textShadow.x;
		context.shadowOffsetY = this.textShadow.y;
	}
	
	if( !this.wordWrap )
	{
		var lines = this.text.toString( ).split( "\n" );
		
		context.translate( this.position.x, this.position.y );
		context.rotate( this.rotation * Math.TO_RADIANS );
		
		for( var i = 0; i < lines.length; i++ )
		{
			if( this.letterSpacing == 0 )
			{
				context.fillText( lines[i], 0, i * this.fontSize * this.scale );
			}
			else
			{
				this.applySpacing( context, lines[i], 0, i * this.fontSize * this.scale );
			}
		}
	}
	else
	{
		var lines = this.text.toString( ).split( "\n" );
		var yPosition = 0;
		
		context.translate( this.wordWrap.position.x, this.wordWrap.position.y );
		context.rotate( this.rotation * Math.TO_RADIANS );
		
		for( var i = 0; i < lines.length; i++ )
		{
			var words = lines[ i ].split( " " );
			var line = "";
			var lineHeight = ( this.wordWrap.lineHeight ) ? this.wordWrap.lineHeight : 1;
			var maxWidth = ( this.wordWrap.size.x > 0 ) ? this.wordWrap.size.x : viewport.width;
			
			for( var j = 0; j < words.length; j++ )
			{
				var testLine = line + words[ j ] + " ";
				var metrics = context.measureText( testLine );
				
				if( metrics.width > maxWidth )
				{
					if( this.letterSpacing == 0 )
					{
						context.fillText( line, 0, yPosition );
					}
					else
					{
						this.applySpacing( context, line, 0, yPosition );
					}
					line = words[ j ] + " ";
					yPosition += parseInt( this.fontSize * lineHeight );
				}
				else
				{
					line = testLine;
				}
			}
			
			if( this.letterSpacing == 0 )
			{
				context.fillText( line, 0, yPosition );
			}
			else
			{
				this.applySpacing( context, line, 0, yPosition );
			}
			yPosition += parseInt( this.fontSize * lineHeight );
		}
	}
	
	context.restore( );
};