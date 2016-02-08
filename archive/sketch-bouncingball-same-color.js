var ballArray = [];//create a array for

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Create object
  
  //create 40 balls
  for (var i=0; i<40; i++){
    var newBall = new Ball();//create a new ball
    ballArray[i] = newBall;//put into the array
    // changeAllColor();
    // clear();
  }
  frameRate(20);

}

function draw() {
  background('black');

  
  for (var i=0; i<ballArray.length; i++){
    ballArray[i].bounce();
    ballArray[i].changeColor();
    ballArray[i].move();
    ballArray[i].display();
  }


}


function changeAllColor(){
    var r = floor(random(255));
    var g = floor(random(255));  
    var b = floor(random(255));

    fill('rgba('+r+','+g+','+b+',0.5)');
    noStroke();
}


// Ball class
function Ball() {
  this.x = random(width);
  this.y = random(height);
  this.diameter = random(50, 100);
  
  this.speed = 1;
 

  this.move = function() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);

  };
    
    this.display = function() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  };


  this.changeColor = function(){
    var r = floor(random(255));
    var g = floor(random(255));  
    var b = floor(random(255));
    fill('rgba('+r+','+g+','+b+',0.5)');
    noStroke();

  }

  var speedY = 20;
  var speedX = 20;

  this.bounce = function(){

  this.x = this.x + speedX;
  this.y = this.y + speedY;
 
  if (this.x > width) {
    speedX = speedX* (-1);
  }
 
  if (this.x < 0) {
    speedX = speedX* (-1);
  }
 
  if (this.y > height) {
    speedY= speedY* (-1);
  }
   
  if (this.y < 0) {
    speedY= speedY*(-1);
  } 
}
  
  
  
  
}