var Collision = {
	PointRect : function( point, rect ) {
		return !( point.x < rect.left || point.x > rect.right || point.y < rect.top || point.y > rect.bottom );
	},
	
	RectRect : function( collider, collidee ) {
		return !(collidee.left > collider.right || collidee.right < collider.left || collidee.top > collider.bottom || collidee.bottom < collider.top );
	}
};
