var ballArray = [];//create a array to store the ball
var clouds = [];//create a array for cloud
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

//shapes

var lt = [];



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
  
  
  var lt1= loadImage("img/lightning-02.svg");
  lt.push(lt1);
  var lt2= loadImage("img/lightning-03.svg");
  lt.push(lt2);
  var lt3= loadImage("img/lightning-04.svg");
  lt.push(lt3);
  
  // var lt1= loadImage("img/lightnight-02.svg");
  
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
  // console.log(lt);
  socket = io(SOCKET_URL + TEAM_NAME); // Open a socket connection to the server.
  // Additional setup goes here. E.g., registering socket.on handlers.  
  socket.on('createBall', createBallLocal);
  socket.on('createCloud', createCloudLocal);
  // socket.on('lightning', mouseClicked());
  
}

function draw(){
  // background(backgroundColor);
  background('hsl(0,0%, 18%)');

  for (var i=0; i<ballArray.length; i++){
    ballArray[i].bounce3();
    ballArray[i].display();
  }
  

  //draw clouds
  for (var j=0; j<clouds.length; j++){
    // clouds[j].flash();
      clouds[j].flash();
    }   
    clouds[j].display(); 
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

  clouds.forEach(function(element, index, array){
    //make the cloud shows up porportionlly to the window width;
    

  });
}

//Create a number of ball based on the keypress value received from keyPressed().
function createBall(pitch){ //used to be (numball)
  createBallLocal(pitch);
  createBallRemote(pitch);
}

function createBallLocal(pitch) {
  // for (var i=0; i<numBall; i++){
    var newBall = new Ball(mouseX, mouseY, pitch+1, pitch1[0][pitch]);//create a new ball
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
  socket.emit('createBall', pitch);
}


//Create cloud based on mouse click.
function createCloud(x, y){ 
  createCloudLocal(x,y);
  createCloudRemote(x,y);
}



function createCloudLocal(x, y){
  
  var newCloud = new cloud (x, y);
  clouds.push(newCloud);

   if (clouds.length > 4) {
    var diff = clouds.length - 4;
    for (var j=0; j<diff; j++){
      clouds.shift();
    }
  }
}

function createCloudRemote(x, y){
  socket.emit('createCloud', x, y);
}


function mouseClicked(){
  createCloud(mouseX, mouseY);
}




// function mouseClicked(){
//     // // if(counter === bgcolor.length-1){
//     // //   counter = 0;
//     // // }
//     // // backgroundColor = bgcolor[counter];
//     // // counter++;
    
//     if(counter === (lt.length)-1){
//       counter = 0;
//     }
//     image(lt[counter], 0, 0);
//     socket.emit("lightning", counter);
//     console.log(counter);
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
        //clear the clouds
        while(clouds.length){
          clouds.pop();
        }
      
        getHue();//change the color
        //TODO: stop the music
        break;
     }
    case 32: {//Space
      pitchSet++;
      if (pitchSet == pitch1.length) {
        pitchSet = 0;
      }
      break;
    }
    // case 18: {//Alt
    // for(var i=0; i<clouds.length; i++){
    //   clouds[i].flash();
    //   clouds[i].display();
    // } 

      // createCloud(mouseX, mouseY);
    //   break;
    // }
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

function cloud(x,y){
 
  this.x = x;
  this.y = y;
 
 
 this.display = function(){
  //simple cloud x, h is starting position
  fill(200, 200, 255);
  noStroke();
  ellipse(this.x + 50, this.y, 50, 50);
  ellipse(this.x + 20, this.y, 50, 50);
  ellipse(this.x + 70, -20 + this.y, 50, 50);
  ellipse(this.x + 35, -30 + this.y, 50, 50);
  ellipse(this.x, -20 + this.y, 50, 50);

  //midpoint --> (this.x+35, this.y-15);
 };

 this.flash = function (){
  var newLightning = new lightning(this.x+35, this.y-15);
  newLightning.display();
 }
}


function lightning(x,y){

  this.x = x;
  this.y = y;
 
 //  var startX;
 // var startY;
 // startX = width/2;
 // startY = height/2;
 var a = this.x + random(20,50);
 var b = this.y + random(60,125);
 var c = random(-50,-70);
 var d = random(40,80);
 var e = random(20,60);
 var f = random(20,60);
 var g = random(-20, -50);
 var h = random (20, 60);
 
   // noLoop();
   this.display = function(){
     strokeWeight(4);
     stroke(255, 225 , 50);
     // push()
     line(this.x, this.y, a, b);
     push();
     translate(a, b);
     line(0, 0, c, d);
     translate(c, d);
     line(0, 0, e, f);
     translate(e, f);
     line (0, 0, g, h);
     pop();
   }

   
}



