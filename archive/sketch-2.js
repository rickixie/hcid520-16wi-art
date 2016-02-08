var b1;
var b2;


function setup(){
	createCanvas(windowWidth, windowHeight);
	b1 = new Ball(400, 0);
	b2 = new Ball (100,500);
	
}

function draw(){
	background(255);

	b1.draw();
	b2.draw();

	console.log()
}


function randomColor(){
	//generate random color
	var r = floor(random(255));
    var g = floor(random(255));  
    var b = floor(random(255));
    // stroke('rgba('+r+','+g+','+b+',0.5)');
    // strokeWeight(random(5,50));
    return [r, g, b];
}


function Ball(startX, startY){
	//define start position
	this.x = startX;
	this.y = startY;
	var r = floor(random(255));
    var g = floor(random(255));  
    var b = floor(random(255));
    this.stroke('rgba('+r+','+g+','+b+',0.5)');
	// this.stroke = ()
	// push();
	this.draw = function(){

    ellipse(this.x, this.y, 50, 50);	
	}
	// pop();

	this.bounce = function(){

		this.x = startX+1;
		this.y = startY+1;

	}
// 	pop();


}