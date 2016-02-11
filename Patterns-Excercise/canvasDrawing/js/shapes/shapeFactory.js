define(["shapes/circle", "shapes/square"], function(Circle, Square) {
	factory = {
		createCircle: function(x, y, radius) {
			var circle = new Circle;
			circle.x = x;
			circle.y = y;
			return circle;
		},
		createSquare: function(x,y, size) {
			var square = new Square;
			square.x = x;
			square.y = y;
			square.size = size;
			return square;
		}
	}
	return factory;
});