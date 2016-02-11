define(["jquery"], function($) {
	var canvas = $("#canvas"),
	circleBtn = $("#circleBtn"),
	squareBtn = $("#squareBtn"),
	context,
	presenter,
	
	View = function(aPresenter) {
		presenter = aPresenter;
		context = canvas[0].getContext('2d');

		//mouse events
		var isDragging = false,
		isDown = false;
		canvas.mousedown(function(){
			isDown = true;
		})
		.mousemove(function(evt){
			if(isDown) {
				if(!isDragging)
					canvasStartDrag(evt);
				isDragging = true;
				canvasDrag(evt);
			}
		})
		.mouseup(function(evt) {
	        var wasDragging = isDragging;
	        isDragging = false;
	        presenter.movingShape=-1;
	        isDown = false;
	        if (!wasDragging)
	            canvasClick(evt);
	    });
		$("button[type=button]").data("pressed", false);
		$("button[type=button]").on("click", menuChange);
	};
	View.prototype.draw = function(shape) {
		shape.draw(context);
	};
	View.prototype.repaint = function(shapes) {
		context.clearRect(0, 0, canvas.width(), canvas.height());
		for(var i = 0; i<shapes.length; i++)
			shapes[i].draw(context);
	};

	// PRIVATE FUNCTIONS
	function menuChange(evt) {
		var $input = $( "#"+this.id );
		$("button[type=button]").each(function(){ // unselect the others
			if(this.id != $input.prop("id")) {
				$(this).attr("aria-pressed", false);
				$(this).attr("class", "btn btn-primary");
				$(this).data("pressed", false);
			}
		});
		$input.data("pressed", !$input.data("pressed"));
		if($input.data("pressed"))
			presenter.setAction($input.prop("value"));
		else
			presenter.setAction(null);
	};
	function canvasClick(evt) {
		var cPos = canvas.position(),
		relX = evt.pageX-cPos.left, 
		relY = evt.pageY-cPos.top; 
		presenter.canvasClick(relX, relY);
	};
	function canvasStartDrag(evt) {
		var cPos = canvas.position(),
		relX = evt.pageX-cPos.left,
		relY = evt.pageY-cPos.top, 
		colour = context.getImageData(relX,relY,1,1).data,
		colorSum = colour[0]+colour[1]+colour[3];
		if(colorSum > 0)  
			presenter.selectMoveElement(relX,relY);
	};
	function canvasDrag(evt) {
		var cPos = canvas.position(),
		relX = evt.pageX-cPos.left, 
		relY = evt.pageY-cPos.top;
		presenter.moveElement(relX,relY);
	}
	return View;
});