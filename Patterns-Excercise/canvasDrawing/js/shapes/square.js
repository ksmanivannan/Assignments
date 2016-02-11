define(function(){
	function Square() { };
	Square.prototype.x = 300;
	Square.prototype.y = 300;
	Square.prototype.size = 50;
	Square.prototype.fillStyle = "red";
	Square.prototype.draw = function(context) {
		context.beginPath();
		context.rect(this.x, this.y, this.size, this.size);
		context.fillStyle = this.fillStyle;
		context.fill();
		context.lineWidth = 1;
		context.stroke();
	};
	Square.prototype.isHits = function(x,y) {
		if(x>=this.x-1 && x<=this.x+this.size+1)
			if(y>=this.y-1 && y<=this.y+this.size+1)
				return true;
		return false;
	}
	return Square;
});