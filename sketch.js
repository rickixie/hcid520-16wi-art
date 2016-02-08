var ballArray = [];//create a array to store the ball
var newHue = 100;//preset the hue to a fix value to avoid null exception
var pitch1 = [];//create a array to store the sound file for pitch 1
//initiate sound files 
var do1;
var re1;
var mi1;
var fa1;
var sol1;
var la1;
var til1;
var pitch = 0;
var backgroundColor = 220;
var counter = 0;
var bgcolor = [];
// var midnight = color('hsl(255,19%, 25%)');
//   var plum = color('hsl(349, 24%, 35%');
//   var grey = color('hsl(219, 0%, 19%');
//   var forest = color('hsl(108, 34%, 37%');
//   var lightgrey = color('hsl(113, 0%, 73%');
//   var peach = color ('hsl(22, 100%, 70%');
// var lilac = color('hsl(256,37%, 77%');
var midnight;
var plum;
var grey;
  var forest;
  var lightgrey;
  var peach;
var lilac; 






// var soundKey = 0; causes one tone to be played 

/* preload the sound to use before the program run, 
* it is cused to handle asynchronous loading of external files. 
* If a preload function is defined, setup() will wait until 
* any load calls within have finished. 
**/
function preload(){
  do1 = loadSound('music/01do.mov');
  pitch1.push(do1);
  re1 = loadSound('music/01re.mov');
  pitch1.push(re1);
   mi1 = loadSound('music/01mi.mov');
  pitch1.push(mi1);
   fa1 = loadSound('music/01fa.mov');
  pitch1.push(fa1);
   sol1 = loadSound('music/01sol.mov');
  pitch1.push(sol1);
  la1 = loadSound('music/01la.mov');
  pitch1.push(la1);
   ti1 = loadSound('music/01ti.mov');
  pitch1.push(ti1);
  midnight = color('hsl(255,19%, 25%)');
  plum = color('hsl(349, 24%, 35%)');
  grey = color('hsl(219, 0%, 19%)');
  forest = color('hsl(108, 34%, 37%)');
  lightgrey = color('hsl(113, 0%, 73%)');
  peach = color ('hsl(22, 100%, 70%)');
  lilac = color('hsl(256,37%, 77%)');
  
  bgcolor.push(midnight);
  console.log(midnight);
  bgcolor.push(plum);
  bgcolor.push(grey);
  bgcolor.push(forest);
  bgcolor.push(lightgrey);
  bgcolor.push(peach);
  bgcolor.push(lilac);  
  
}

/*
* The setup() function is called once when the program starts. 
* It's used to define initial environment properties such as 
* screen size and background color and to load media such as 
* images and fonts as the program starts. 
* http://p5js.org/reference/#/p5/setup
*
*/
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
 
  //default backgroundColor NEW!!!
  // backgroundColor = color(255, 255, 255);
  
  //1. Create ball object
  createBall();
  

  frameRate(30);
}

function draw() {
  //setup background color
  // background('black');
  background(backgroundColor);

  // var count = 0;
  for (var i=0; i<ballArray.length; i++){
    ballArray[i].bounce3();
    // ballArray[i].move();
    ballArray[i].display();
    // count++;
  
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  ballArray.forEach(function(element, index, array) {
    if (element.x > width - element.diameter) {
      element.x = width - element.diameter;
    } else if (element.x < element.diameter) {
      element.x = element.diameter;
    }
    
    if (element.y > height - element.diameter) {
      element.y = height - element.diameter
    } else if (element.y < element.diameter) {
      element.y = element.diameter;
    }
  }); 
}

//Create a number of ball based on the keypress value received from keyPressed().
function createBall(numBall){
  for (var i=0; i<numBall; i++){
    var newBall = new Ball(mouseX, mouseY, numBall-1);//create a new ball
    ballArray.push(newBall);//put into the array
  }
  
  if (ballArray.length > 15) {
    var diff = ballArray.length - 15;
    for (var i=0; i<diff; i++){
      ballArray.shift();
    }
  }
}

function mouseClicked(){


    if(counter === bgcolor.length-1){
      counter = 0;
      // i = 0;
    }
    // console.log(backgroundColor);
    backgroundColor = bgcolor[counter];
    counter++;
 
    // console.log(backgroundColor);
  
  
  
  // backgroundColor = color(random(255), random(255), random(255));
}

//Handle keyPressEvent
function keyPressed(){
  //https://css-tricks.com/snippets/javascript/javascript-keycodes/
  switch(keyCode){
    case 49:{//Number:1
      createBall(1);
      // soundKey = 1;
      // setTimeout(playSound(0), 2000);
      break;
    }
    case 50: {//Number:2
       createBall(2);
        // soundKey = 2;
        // playSound(1);
       break;
     }
     case 51: {//Number:3
       createBall(3);
      // playSound(2);
        // soundKey = 3;
       break;
     }
     case 52: {//Number: 4
       createBall(4);
        // playSound(3);
          // soundKey = 4;
       break;
     }
     case 53: {//Number: 5
       createBall(5);
        // playSound(4);
          // soundKey = 5;
       break;
     }
     case 54: {//Number: 6
       createBall(6);
        // playSound(5);
          soundKey = 6;
       break;
     }
     case 55: {//Number: 7
       createBall(7);
        // playSound(6);
          // soundKey = 7;
       break;
     }
    // case 56: {//Number: 8
    //   createBall(8);
    //     // playSound(0);
    //     // soundKey = 8;
       
    //   break;
    // }
    // case 57: {//Number: 9
    //   createBall(9);
    //   // playSound(1);
    //   break;
    // }
    //   case 32: {//Number: space
    //   //change color    
    //   // getHue();old
    //   backgroundColor = color(random(255), random(255), random(255));
    //   break;
    // }
     
      case 27: {//Number: escape
        //clear the ball array content one by one
        while(ballArray.length){
        ballArray.pop();
      }
      getHue();//change the color
      //TODO: stop the music
      break;
     }
  }
}

//A Helper function to play sound
function playSound(num){
  pitch1[num].setVolume(0.1);
  pitch1[num].play();//http://p5js.org/reference/#/p5.SoundFile/play
}

//A Helper function to get a hue value to create mono color 
function getHue(){
  newHue = floor(random(360));
}

//A Helper function to create a color with the same hue value
function changeAllColor(){
    var h = newHue;//get the hue value
    //http://hslpicker.com/#25742e
    var s = random(100);  
    var l = random(40, 90);//avoid the high saturation
    var a = random(0.5,1); 

    var c = color('hsla('+h+','+s+'%,'+l+'%,'+a+')');
    return c;
}
//A Helper function to create a color with the same hue value
function changeAllColor(keyColor){
    var h;
    var s = 90;
  switch(keyColor){
    case 1: {//key pressed 1;
       h = 8; //red
     
      break;
     }case 2: {//key pressed 1;
       h = 23; //orange

       break;
     }case 3: {//key pressed 1;
       h = 48; //yellow

       break;
     }case 4: {//key pressed 1;
       h = 81; //green
       break;
     }case 5: {//key pressed 1;
       h = 164; //cyan
       break;
     }case 6: {//key pressed 1;
       h = 196; //blue
       break;
     }case 7: {//key pressed 1;
       h = 227;//dark-blue
       break;
     }
    
  }
  
  
    // var h = newHue;//get the hue value
    //http://hslpicker.com/#25742e
   
    var l = random(40, 90);//avoid the high saturation
    var a = random(0.5,1); 

    var c = color('hsla('+h+','+s+'%,'+l+'%,'+a+')');
    return c;
}

//The Ball Constructor
//Bounce ball with gravity: http://www.openprocessing.org/sketch/47766
//Bounce ball and change color when hits the edges: http://www.openprocessing.org/sketch/110555
function Ball(x, y, pitch) {
  //set random starting point
  // var diameter = random(50, 100);
  this.diameter = random(10,100);
  if (x > width - this.diameter || x < this.diameter) {
    x = random(this.diameter, width - this.diameter);
  }
  this.x = x;
  if (y > height - this.diameter || y < this.diameter) {
    y = random(this.diameter, height - this.diameter);
  }
  this.y = y;
  var pitch = pitch
  
  //set a random diameter size
  var radius = this.diameter/2;
  var vx = random(5,20);
  var vy = random(5,20);
  
  //define the color for the ball
  this.color = changeAllColor(pitch+1);

  this.speed = 0.7;

  this.move = function() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  };
    
  this.display = function() {
    fill(this.color);//only fill the color when you create the ball
    noStroke();
    ellipse(this.x, this.y, this.diameter, this.diameter);
   
  };

  //distance
  var xdistance = this.diameter/2;
  var ydistance = this.diameter/2;
  //speed
  var speedY = 20;
  var speedX = 20;
  //direction
  var ydirection = 1;
  var xdirection = 1;
  
  this.bounce3 = function(){//http://www.openprocessing.org/sketch/218262
    if (((this.x + vx) > width - radius) || ((this.x) < radius)) {
      vx = -vx;
      playSound(pitch);
    }
    
    if (((this.y + vy) > height - this.diameter/2) || ((this.y + vy) < radius)) { 
      vy = -vy;
      playSound(pitch);
    }
   
    // update ball position
    this.x = this.x + vx;
    this.y = this.y + vy;
  }
  //TODO: Collision
  //http://p5play.molleindustria.org/examples/index.html?fileName=collisions4.js
  
  this.bounce = function(){
    if ((this.x+speedX) > width-(this.diameter)/2 || (this.x+speedX) < this.diameter/2) {
      speedX = -speedX;
    }
  
    if ((this.y+speedY) > height-(this.diameter)/2 ||(this.y+speedY)<(this.diameter)/2) {
      speedY= -speedY;
    }
     
    this.x = this.x + speedX;
    this.y = this.y + speedY;
  }
}