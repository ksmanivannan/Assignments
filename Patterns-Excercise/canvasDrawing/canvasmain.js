// Shape Interface
function Shape(x, y, w, h, fill) {
    this.x = x || 50;
    this.y = y || 50;
    this.w = w || 50;
    this.h = h || 50;
    this.fill = fill || '#AAAAAA';
}

// Draws shape to a given context
Shape.prototype.drawSquare = function(ctx) {
    //To draw Square
    ctx.fillStyle = this.fill;
    ctx.fillRect(this.x, this.y, this.w, this.h);

}

Shape.prototype.drawCircle = function(ctx) {
    //To draw arc/Circle
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.w,0,Math.PI*2,true);
    ctx.stroke();
}


// Determine if a point is inside the shape's bounds
Shape.prototype.exists = function(mx, my) {
    // Check for mouseclick in square/Rectangle,In (X + Width) and its Y and (Y + Height)
    return  (this.x <= mx) && (this.x + this.w >= mx) &&
        (this.y <= my) && (this.y + this.h >= my);
}

function CanvasState(canvas) {

    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = canvas.getContext('2d');

    var padLeft, padTop, borderLeft, borderTop;
    if (document.defaultView && document.defaultView.getComputedStyle) {
        this.padLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10)      || 0;
        this.padTop  = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10)       || 0;
        this.borderLeft  = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10)  || 0;
        this.borderTop   = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10)   || 0;
    }
    // To fix fixed-position bars
    var html = document.body.parentNode;
    this.htmlTop = html.offsetTop;
    this.htmlLeft = html.offsetLeft;

     this.valid = false; // the canvas will redraw everything
    this.shapes = [];  // the collection of things to be drawn
    this.dragging = false; // Keep track of when we are dragging

    this.selection = null;
    this.dragoffx = 0;
    this.dragoffy = 0;

    //"this" means the CanvasState.
    var canvasState = this;

    //fix problem when double clicking selecting text on the canvas
    canvas.addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false);
    
    canvas.addEventListener('mousedown', function(e) {
        var mouse = canvasState.getMouse(e);
        var mx = mouse.x;
        var my = mouse.y;
        var shapes = canvasState.shapes;
        var l = shapes.length;
        for (var i = l-1; i >= 0; i--) {
            if (shapes[i].exists(mx, my)) {
                var mySel = shapes[i];

                if (mySel instanceof Shape.prototype.drawSquare ) {
                    // Keep track the coordinates we clicked in the obj
                    canvasState.dragoffx = mx - mySel.x;
                    canvasState.dragoffy = my - mySel.y;
                    canvasState.dragging = true;
                    canvasState.selection = mySel;
                    canvasState.valid = false;
                    return;
                }
                else {
                    // Keep track the coordinates we clicked in the obj
                    canvasState.dragoffx = mx - mySel.x;
                    canvasState.dragoffy = my - mySel.y;
                    canvasState.dragging = true;
                    canvasState.selection = mySel;
                    canvasState.valid = false;
                    return;

                }
            }
        }
        // If there was an object selected, we deselect it
        if (canvasState.selection) {
            canvasState.selection = null;
            canvasState.valid = false; // Need to clear the old selection border
        }
    }, true);
    canvas.addEventListener('mousemove', function(e) {
        if (canvasState.dragging){
            var mouse = canvasState.getMouse(e);
            // Saved the offset and using it to move around
            canvasState.selection.x = mouse.x - canvasState.dragoffx;
            canvasState.selection.y = mouse.y - canvasState.dragoffy;
            canvasState.valid = false; // To redraw
        }
    }, true);
    canvas.addEventListener('mouseup', function(e) {
        canvasState.dragging = false;
    }, true);



    // double click for making new shapes
    canvas.addEventListener('dblclick', function(e) {

        var shapeSelected=document.getElementById("shapeInput").value;
            var mouse = canvasState.getMouse(e);
            canvasState.addShape(new Shape(mouse.x - 10, mouse.y - 10, 50, 50, 'blue'));
            this.selectionColor = 'red';
            this.selectionWidth = 2;
            this.interval = 30;
            setInterval(function() { canvasState.draw(shapeSelected); }, canvasState.interval);


        }, true);



}

CanvasState.prototype.addShape = function(shape) {
    this.shapes.push(shape);
    this.valid = false;
}

CanvasState.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
}

CanvasState.prototype.draw = function(shapeSelected) {
    // if state is invalid, redraw and validate
    if (!this.valid) {
        var ctx = this.ctx;
        var shapes = this.shapes;
        this.clear();

        // draw all shapes
        var l = shapes.length;
        for (var i = 0; i < l; i++) {
            var shape = shapes[i];
            if(shapeSelected=='square') {
                // To skip the element went out of canvas area
                if (shape.x > this.width || shape.y > this.height ||
                    shape.x + shape.w < 0 || shape.y + shape.h < 0) continue;
                shapes[i].drawSquare(ctx);
            }
            else
            {
                shapes[i].drawCircle(ctx);

            }
        }

        if (this.selection != null && this instanceof Shape.prototype.drawSquare ) {
            ctx.strokeStyle = this.selectionColor;
            ctx.lineWidth = this.selectionWidth;
            var mySel = this.selection;
            ctx.strokeRect(mySel.x,mySel.y,mySel.w,mySel.h);
        }
        else if (this.selection != null && this instanceof Shape.prototype.drawCircle){
            ctx.strokeStyle = this.selectionColor;
            ctx.lineWidth = this.selectionWidth;
            var mySel = this.selection;
            ctx.beginPath();
            ctx.arc(mySel.x,mySel.y,mySel.w,0,Math.PI*2,true);
            ctx.stroke();

        }
        }


        this.valid = true;
    }



// set to the mouse position relative to the state's canvas
CanvasState.prototype.getMouse = function(e) {
    var element = this.canvas, offsetX = 0, offsetY = 0, mx, my;

    // Compute the total offset
    if (element.offsetParent !== undefined) {
        do {
            offsetX += element.offsetLeft;
            offsetY += element.offsetTop;
        } while ((element = element.offsetParent));
    }

    // Add padding and border style widths to offset
    offsetX += this.padLeft + this.borderLeft + this.htmlLeft;
    offsetY += this.padTop + this.borderTop + this.htmlTop;

    mx = e.pageX - offsetX;
    my = e.pageY - offsetY;

    return {x: mx, y: my};
}

function init() {
    new CanvasState(document.getElementById('canvas'));

}
