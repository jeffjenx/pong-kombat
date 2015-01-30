var Collision = {
	PointRect : function( point, rect ) {
		return !( point.x < rect.left || point.x > rect.right || point.y < rect.top || point.y > rect.bottom );
	},
	
	RectRect : function( collider, collidee ) {
		return !(collidee.left > collider.right || collidee.right < collider.left || collidee.top > collider.bottom || collidee.bottom < collider.top );
	},

	CircleRect : function( circle, rect ) {
		var closestPoint = new Vector( [0,0] );

		if( circle.center.x <= rect.left ) {
			closestPoint.x = rect.left;
		} else if( circle.center.x >= rect.right ) {
			closestPoint.x = rect.right;
		} else {
			closestPoint.x = circle.center.x;
		}

		if( circle.center.y <= rect.top ) {
			closestPoint.y = rect.top;
		} else if( circle.center.y >= rect.bottom ) {
			closestPoint.y = rect.bottom;
		} else {
			closestPoint.y = circle.center.y;
		}

		if( circle.center.distance( closestPoint ) <= circle.radius ) {
			return true;
		}

		return false;
	}
};
