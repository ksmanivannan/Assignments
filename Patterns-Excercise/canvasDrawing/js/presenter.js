define(["view", "shapeModel", "shapes/shapeFactory"], function(View, model, shapeFactory) {
	var view,
	
	presenter = {
		movingShape: -1,
		canvasClick: function(x,y) {
			if(typeof doAction == 'function')
				doAction(x,y);
		},
		setAction: function(action) {
			var x = {
				circle: this.createCircle,
				square: this.createSquare
			};
			doAction = typeof x[action] == "function"? x[action] : null;
		},

		createCircle: function(x,y) {
			var circle = shapeFactory.createCircle(x,y,30);
			view.draw(circle);
			model.shapes.push(circle);
		},
		createSquare: function(x,y) {
			var square = shapeFactory.createSquare(x,y,60);
			view.draw(square);
			model.shapes.push(square);
		},
		selectMoveElement: function(x,y) {
			for(var i=model.shapes.length-1; i>=0; i--)
				if(model.shapes[i].isHits(x,y))
					break;
			this.movingShape = i;
			this.moveElement(x,y);
		},
		moveElement: function(x,y) {
			if(this.movingShape>=0) {
				model.shapes[this.movingShape].x = x;
				model.shapes[this.movingShape].y = y;
				view.repaint(model.shapes);
			}
		},
		init: function() {
			view = new View(this);
		}
	},
	doAction = null;
	return presenter;
});