define(function(){
	function Circle() { };

	Circle.prototype.radius = 25;
	Circle.prototype.fillStyle = "blue";
	Circle.prototype.draw = function(context) {
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		context.fillStyle = this.fillStyle;
		context.fill();
		context.lineWidth = 2;
		context.stroke();
	};
	Circle.prototype.isHits = function(x,y) {
		var distance = Math.sqrt(Math.pow(Math.abs(x-this.x),2)+Math.pow(Math.abs(y-this.y),2));
		return distance <= this.radius+2;
	}
	return Circle;
});