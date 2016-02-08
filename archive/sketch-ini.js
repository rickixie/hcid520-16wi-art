// Define any global variables here
// (BUT don't call any p5 methods here;
//  call them in the functions below!)
var a = 0;


var angle = 0;
var offset = 150;//the position difference from the axis (y0)
var scalar = 40;
var speed = 0.05;

function setup() {
 	createCanvas(windowWidth, windowHeight); // Use the full browser window
 //	Additional setup goes here
 	// background('#231811');
 	// noFill();   // no fill color
 	fill(0);
 	// noStroke(); // no stroke color
	// noLoop();   // no animation
	strokeWeight(20);
}

function draw() {
  // Put your drawing code here
  background(255);
  // crossPattern();
  // circlePattern();
  // centerlight();
  // marksPattern();
  //clear();
 
  // sinEasing();
  lineRotation();

}

// Define any additional helper functions here

function lineRotation(){
	var l0 = map(mouseX, 0, width, 10, 300);
	var l1 = map(mouseY, 0, height, 10, 300);

	translate(width/2, height/2);
	rotate(angle);
	line(0, 0, 0, l0);

	translate(0, l0);
	rotate(angle);
	line(0, 0, 0, l1);

	translate(0, l1);
	rotate(angle);
	line(0, 0, 0, 50);

	angle += speed;

}



function sinEasing(){
	var y1 = offset + sin(angle)* scalar;//multiply by scalar to manify the effect (amplitude = how far up and down off the offset)
	var y2 = offset + sin(angle + 0.4)* scalar;
	var y3 = offset + sin(angle + 0.8)* scalar;
	//draw three circles
	ellipse(50, y1, 100, 100);
	ellipse(150, y2, 100, 100);
	ellipse(250, y3, 100, 100);

	angle += speed;
}

function easingLineFollow(){
	 line(a, 0, a, height);
 	 var easing = 0.05;
 	 var diff = mouseX - a;
 	 a += diff*easing //line moving with mouse plus some easing
  // a = mouseX;//line moving following the mouse x position in a constant speed
}


function marksPattern(){
	for(var x=50; x<width-50; x+=50){
		for(var y=50; y<height-50; y+=50){
			for(var i=0; i<16; i+=4){
				line(x+i, y, x+i, y+12);
			}
			line(x,y, x+12, y+12);
		}
	}	
}

/**
  * 
  */
function circlePattern(){
	//create circle pattern
	stroke('red');
	var count =0;
	for(var i=50; i<width-50; i+=50){
		for (var j=50; j<height-50; j+=50){
			strokeWeight(count*0.02);
			ellipse(i,j, 20, 20);
			count++;
		}
	}
}

function crossPattern(){
	//create cross pattern
	var count=0;
	
	for(var i=50; i<width-50; i+=50){
		for (var j=50; j<height-50; j+=50){
			stroke(count);

			line(i-5, j-5, i+5, j+5);
			line(i+5, j-5, i-5,j+5);
			count++;
		}
	}
}

function centerlight(){
	stroke('blue');
	//create cross pattern
	for(var i=50; i<width-50; i+=50){
		for (var j=50; j<height-50; j+=50){
			line(i, j, width/2, height/2);
		}
	}
}

function drawCustomShape(){
	beginShape();
	vertex(0, 0);
	vertex(0, 120);
	vertex(140, 140);
	vertex(160,50);
	vertex(500,70);
	vertex(500,0);
	endShape();
}