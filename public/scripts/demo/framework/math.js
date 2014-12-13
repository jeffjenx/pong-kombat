Math.TO_DEGREES = 180 / Math.PI;
Math.TO_RADIANS = Math.PI / 180;

String.prototype.padLeft = function( length, padding )
{
    return Array( length - this.length + 1 ).join( padding || '0' ) + this;
};