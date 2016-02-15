// Define any global variables here
// (BUT don't call any p5 methods here;
//  call them in the functions below!)
// 
// var SOCKET_URL = 'wss://fierce-plains-17880.herokuapp.com/';
// var TEAM_NAME  = '';
// var socket; 
// 
// function setup() {
//   createCanvas(windowWidth, windowHeight); // Use the full browser window
//   socket = io(SOCKET_URL + TEAM_NAME); // Open a socket connection to the server.
//   Additional setup goes here. E.g., registering socket.on handlers. 
// }
// 
// function draw() {
//   Put your drawing code here
// }
// 
// Define any additional helper functions here


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
var pitchSet = 0;
// var backgroundColor = 220;
var counter = 0;
// var bgcolor = [];
// var midnight;
// var plum;
// var grey;
// var forest;
// var lightgrey;
// var peach;
// var lilac; 
var SOCKET_URL = 'wss://fierce-plains-17880.herokuapp.com/';
var TEAM_NAME  = 'dreamcatcher';
var socket; 

// var soundKey = 0; causes one tone to be played 

/* preload the sound to use before the program run, 
* it is cused to handle asynchronous loading of external files. 
* If a preload function is defined, setup() will wait until 
* any load calls within have finished. 
**/

function preload() {
  var pitchset = [];
  pitch1.push(pitchset);
  //Sound 
  do1 = loadSound('music/01do.mov');
  pitchset.push(do1);
  re1 = loadSound('music/01re.mov');
  pitchset.push(re1);
   mi1 = loadSound('music/01mi.mov');
  pitchset.push(mi1);
   fa1 = loadSound('music/01fa.mov');
  pitchset.push(fa1);
   sol1 = loadSound('music/01sol.mov');
  pitchset.push(sol1);
  la1 = loadSound('music/01la.mov');
  pitchset.push(la1);
   ti1 = loadSound('music/01ti.mov');
  pitchset.push(ti1);
  
  //pitchset = [];
  // pitch1.push(pitchset);
  // pitchset.push(loadSound('music/'));
  
  //Background Color
  // midnight = color('hsl(255,19%, 25%)');
  // plum = color('hsl(349, 24%, 35%)');
  // grey = color('hsl(219, 0%, 19%)');
  // forest = color('hsl(108, 34%, 37%)');
  // lightgrey = color('hsl(113, 0%, 73%)');
  // peach = color ('hsl(22, 100%, 70%)');
  // lilac = color('hsl(256,37%, 77%)');

  // console.log(midnight); //first color presented
  // bgcolor.push(plum);
  // bgcolor.push(grey);
  // bgcolor.push(forest);
  // bgcolor.push(lightgrey);
  // bgcolor.push(peach);
  // bgcolor.push(lilac);  
}

/*
* The setup() function is called once when the program starts. 
* It's used to define initial environment properties such as 
* screen size and background color and to load media such as 
* images and fonts as the program starts. 
* http://p5js.org/reference/#/p5/setup
*/

function setup(){
  canvas = createCanvas(windowWidth, windowHeight);
  frameRate(30);
  socket = io(SOCKET_URL + TEAM_NAME); // Open a socket connection to the server.
  // Additional setup goes here. E.g., registering socket.on handlers.  
  socket.on('ball', createBallLocal);
  // socket.on('keypressed',keypressed);
}

function draw(){
  // background(backgroundColor);
  background('hsl(0,0%, 18%)');

  for (var i=0; i<ballArray.length; i++){
    ballArray[i].bounce3();
    ballArray[i].display();
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
function createBall(pitch){ //used to be (numball)
  createBallLocal(pitch);
  createBallRemote(pitch);
}

function createBallLocal(pitch) {
  // for (var i=0; i<numBall; i++){
    var newBall = new Ball(mouseX, mouseY, pitch+1, pitch1[pitchSet][pitch]);//create a new ball
    ballArray.push(newBall);//put into the array
  // }
  
  if (ballArray.length > 30) {
    var diff = ballArray.length - 30;
    for (var i=0; i<diff; i++){
      ballArray.shift();
    }
  }
}

function createBallRemote(pitch) {
  socket.emit('ball', pitch);
}

// function mouseClicked(){
//     if(counter === bgcolor.length-1){
//       counter = 0;
//     }
//     backgroundColor = bgcolor[counter];
//     counter++;
// }

//Handle keyPressEvent
function keyPressed(){
  //https://css-tricks.com/snippets/javascript/javascript-keycodes/
  switch(keyCode){
    case 49:{//Number:1
      createBall(0);
      // soundKey = 1;
      // setTimeout(playSound(0), 2000);
      break;
    }
    case 50: {//Number:2
       createBall(1);
        // soundKey = 2;
        // playSound(1);
       break;
     }
     case 51: {//Number:3
       createBall(2);
      // playSound(2);
        // soundKey = 3;
       break;
     }
     case 52: {//Number: 4
       createBall(3);
        // playSound(3);
          // soundKey = 4;
       break;
     }
     case 53: {//Number: 5
       createBall(4);
        // playSound(4);
          // soundKey = 5;
       break;
     }
     case 54: {//Number: 6
       createBall(5);
        // playSound(5);
          soundKey = 6;
       break;
     }
     case 55: {//Number: 7
       createBall(6);
        // playSound(6);
          // soundKey = 7;
       break;
     }
     case 27: {//Number: escape
        //clear the ball array content one by one
        while(ballArray.length){
          ballArray.pop();
        }
      
        getHue();//change the color
        //TODO: stop the music
        break;
     }
    case 32: {
      pitchSet++;
      if (pitchSet == pitch1.length) {
        pitchSet = 0;
      }
      break;
    }
  }
}

//A Helper function to play sound
function playSound(pitch){
  pitch.setVolume(0.1);
  pitch.play();//http://p5js.org/reference/#/p5.SoundFile/play
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
       h = 190;
      break;
     }case 2: {//key pressed 2;
       h = 200; 
       break;
     }case 3: {//key pressed 3;
       h = 210; 
       break;
     }case 4: {//key pressed 4;
       h = 220; 
       break;
     }case 5: {//key pressed 5;
       h = 230; 
       break;
     }case 6: {//key pressed 6;
       h = 240; 
       break;
     }case 7: {//key pressed 7;
       h = 250;
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
function Ball(x, y, number, pitch) {
  //set random starting point
  // var diameter = random(50, 100);
  playSound(pitch); //new plays sound on ball creation 
  this.diameter = 10;
  // this.diameter = random(1,10); //old 10, 100
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
  var vx = 10;
  var vy = 10;
  // var vx = random(5,10);
  // var vy = random(5,10);
  
  //define the color for the ball
  this.color = changeAllColor(number);

    
  this.display = function() {
    fill(this.color);//only fill the color when you create the ball
    noStroke();
    ellipse(this.x, this.y, this.diameter, this.diameter);
   
  };

  
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
  

}