  var ballArray = [];//create a array to store the ball
  var clouds = [];//create a array for cloud
  var lts = [];//create a array for lightning
  var newHue = 100;//preset the hue to a fix value to avoid null exception
  var pitch1 = [];//create a array to store the sound file for pitch 1

  var backgroundColor;
  var counter = 0;
  var bgcolor = []; //from ex5

  var SOCKET_URL = 'wss://fierce-plains-17880.herokuapp.com/';
  var TEAM_NAME  = 'dreamcatcher';
  var socket;
  
  var currentCloudSound = 7;
  var currentLightningSound = 12; //FOR LIGHTNING SOUND

  var userId =[];
  var mobileIds = [];
  var id;
  var mobiletones = [];
  var currentmobiletones = 0;

  /* preload the sound to use before the program run, 
  * it is cused to handle asynchronous loading of external files. 
  * If a preload function is defined, setup() will wait until 
  * any load calls within have finished. 
  **/

  function preload() {
    //Sound 
    pitch1.push(loadSound('music/01do.mov')); // 0; ball sounds
    pitch1.push(loadSound('music/01re.mov'));
    pitch1.push(loadSound('music/01mi.mov'));
    pitch1.push(loadSound('music/01fa.mov'));
    pitch1.push(loadSound('music/01sol.mov'));
    pitch1.push(loadSound('music/01la.mov'));
    pitch1.push(loadSound('music/01ti.mov'));
    pitch1.push(loadSound('music/C1.mov')); // 7; cloud sounds
    pitch1.push(loadSound('music/C2.mov'));
    pitch1.push(loadSound('music/C3.mov'));
    pitch1.push(loadSound('music/C4.mov'));
    pitch1.push(loadSound('music/C5.mov'));
    pitch1.push(loadSound('music/L1.mov')); // 12; lightning sounds
    pitch1.push(loadSound('music/L2.mov'));
    pitch1.push(loadSound('music/L3.mov'));



    var midnight = color('hsl(255,19%, 25%)');
    var plum = color('hsl(349, 24%, 35%)');
    var grey = color('hsl(219, 0%, 19%)');
    var forest = color('hsl(108, 34%, 37%)');
    var lightgrey = color('hsl(113, 0%, 73%)');
    var peach = color ('hsl(22, 100%, 70%)');
    var lilac = color('hsl(256,37%, 77%)');
  
    bgcolor.push(midnight);
    bgcolor.push(plum);
    bgcolor.push(grey);
    bgcolor.push(forest);
    bgcolor.push(lightgrey);
    bgcolor.push(peach);
    bgcolor.push(lilac); 

    backgroundColor = midnight; 

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
    socket.on('createBall', createBallLocal);
    // socket.on('createCloud', createCloudLocal);
    // socket.on('lightning', function(sound){
    //     currentLightningSound = sound;//
    // });
    
  //MOBILE EVENT
   socket.emit('sense', {
    deviceShaken: true,
    deviceMoved: true
   });
  socket.on('deviceShaken', deviceShaken);
  socket.on('deviceMoved', deviceMoved);
    
    
  //when someone open a new chat, assignment a ID and store in an array
   // id = socket.id;
   // console.log(id);
  // userId.push(id);
  // socket.emit('sketchIDConnected',id);
  //do something when someone close their connection (e.g: hit escape or space bar)
  //e.g: remove their ID
  
    
    // socket.on('connection', function (socket){
    //   userId.push(socket);
    //   // socket.emit('connection', socket);
    //   socket.on('disconnet', function(){
        
    //     console.log('Disconnect client!');
    //     var index = userId.indexOf(socket);
    //     if(index >-1){
    //       userId.splice(index, 1);
    //       // socket.emit('disconnect', socket);
    //     }
    //     else{
    //       // socket.emit('sketchIDDisconnected', "You already left the game. Please refresh to rejoin.")
    //     }
    //   });
    // });
    
  }


  function draw(){
    background(backgroundColor);
    // background('hsl(0,0%, 18%)');

    for (var i=0; i<ballArray.length; i++){
      ballArray[i].bounce3();
      ballArray[i].display();
    }
    
    // if(keyIsDown(ALT)){//only flash the lightning when alt key is holding down
    //     for(var i = 0; i<clouds.length; i++){
    //       clouds[i].flash();
    //     }
    //     if(currentLightningSound==14){
    //       currentLightningSound=12;
    //     }
    //     else
    //       currentLightningSound++;
    //     // socket.emit("lightning", currentLightningSound);
    // } 
    // else{
    //   for (var i =0; i <clouds.length; i ++){      
    //   clouds[i].display(); 
    //   }

    // }
    
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


function deviceShaken() {
  // ants = [];
  // ballArray = [];//clear the ball

  //BELOW ARE THE SAME CODE WITH "ESCAPE" KEYPRESSED;
  //stop all played sound (from ex6)
  pitch1.forEach(function(element) {
    element.stop();
  });
  //clear the ball array content one by one
  while(ballArray.length){
    ballArray.pop();
  }
}

function deviceMoved(data) {
  //if device orientation is portrait, create new balls

  //check if this is a new mobile;
  // var currentone;
  var index = mobileIds.indexOf(data.mobileID);
  if(index == -1){//if this is a new mobile     
    mobileIds.push(data.mobileID);
    console.log("a new mobile with ID" + data.mobileID);
   mobiletones.push(currentmobiletones);//store the tone in another array
  console.log("change mobile tone: "+currentmobiletones); 
    if(currentmobiletones == 6){
      currentmobiletones = 0;
    } 
    else{
      currentmobiletones++;
    }    
  }
  //create balls when device is landscape
 if(data.deviceOrientation =="landscape" && data.acceleration.x >=3){
  // var pitch = floor(random(0,7)); //assignment a random number between 0 - 6
  console.log("current tone: "+mobiletones[index]);
  createBall(mobiletones[index]);
 }

}
  //Create a number of ball based on the keypress value received from keyPressed().
  function createBall(pitch){ //used to be (numball)
    createBallLocal(pitch);
    createBallRemote(pitch);
  }

  function createBallLocal(pitch) {
  
      //2.20 CHANGE: change the ball's int X and Y from (mouseX, mouseY) to random 
      var newBall = new Ball(floor(random(0,width)), floor(random(0,height)), pitch+1, pitch1[pitch]);//create a new ball

      ballArray.push(newBall);//put into the array

    
    if (ballArray.length > 30) {//limited number of 30 balls
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
  function mouseClicked(){
    // createCloud(mouseX, mouseY);

    //change background color (from ex5)
    if(counter === bgcolor.length-1){
      counter = 0;
    }
    
    backgroundColor = bgcolor[counter];
    counter++;
  }

  // function createCloud(x, y){ 
  //   createCloudLocal(x,y);
  //   createCloudRemote(x,y);
  // }


  // function createCloudLocal(x, y){

  //   var newCloud = new cloud (x, y, pitch1[currentCloudSound]);
  //   currentCloudSound++;     
  //   if (currentCloudSound == 12) {
  //     currentCloudSound = 7;
  //   }
  //   // createLightning(x,y);
  //   // var newLightning = new lightning (x+35, y-15,pitch1[currentLightningSound]);
  //   // currentLightningSound++;
    
  //   // if (currentLightningSound == 15){
  //   //   currentLightningSound == 12;
  //   // }

  //   clouds.push(newCloud);
  //   // lts.push(newLightning);

  //   if (clouds.length > 5) {
  //     var diff = clouds.length - 5;
  //     for (var j=0; j<diff; j++){
  //       // clouds[0].sound.stop();//stop the cloud's sound when it is gone <--didn't work over 5;
  //       var cloudE = clouds.shift();
  //       // console.log(cloudE);
  //       // cloudE.sound.stop();
  //       // lts.shift();
  //     }
  //   }
  // }

  // function createCloudRemote(x, y){
  //   socket.emit('createCloud', x, y);
  // }


  //didn't use it
  // function createLightning(x,y){ //used to be (numball)
  //   createLightningLocal(x,y);
  //   createLightningRemote(x,y);
  // }

  //didn't use it
  // function createLightningLocal(x,y) {

  //   var newLightning = new lightning (x+35, y-15,pitch1[currentLightningSound]);
  //   currentLightningSound++;
  //   lts.push(newLightning);
    
  //   if (currentLightningSound == 15){
  //     currentLightningSound == 12;
  //   };
  //   return newLightning;
  // }

  //didn't use it
 //  function createLightningRemote(x,y) {
 //   // socket.emit('lightning', x,y);
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
      
          break;
        }
       case 51: {//Number:3
         createBall(2);
       
          break;
        }
       case 52: {//Number: 4
         createBall(3);
        
            break;
          }
       case 53: {//Number: 5
         createBall(4);
         
            break;
          }
       case 54: {//Number: 6
         createBall(5);
          

          break;
        }
       case 55: {//Number: 7
         createBall(6);
        
            break;
          }
       case 27: {//Number: escape
          //stop all played sound
          pitch1.forEach(function(element) {
            element.stop();
          });
          //clear the ball array content one by one
          while(ballArray.length){
            ballArray.pop();
          }
          //clear the clouds
          while(clouds.length){
            clouds.pop();
          }
          getHue();//change the color
         
          break;
      }
      // case 32: {//when someone leave, press "space"
      // //http://stackoverflow.com/questions/5767325/remove-a-particular-element-from-an-array-in-javascript
        
      //   var index = userId.indexOf(id);
      //   console.log(userId)
      //   console.log(index);
      //   if(index >-1){
      //     userId.splice(index, 1);
      //     socket.emit('sketchIDDisconnected', id);
      //   }
      //   else{
      //     socket.emit('sketchIDDisconnected', "You already left the game. Please refresh to rejoin.")
      //   }
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
    // this.diameter = 10;
    this.diameter = floor(random(10,30)); //old 10, 100
    if (x > width - this.diameter || x < this.diameter) {
      x = random(this.diameter, width - this.diameter);
    }
    this.x = x;
    if (y > height - this.diameter || y < this.diameter) {
      y = random(this.diameter, height - this.diameter);
    }
    this.y = y;
    var pitch = pitch;
    
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

  function cloud(x,y, pitch){

    this.x = x;
    this.y = y;
    this.sound = pitch;
    this.sound.setVolume(0.08);
    this.sound.loop();//loop the cloud sound 
    // playSound(pitch);

    this.display = function(){
    //simple cloud x, h is starting position
    fill(200, 200, 255);
    noStroke();
    ellipse(this.x + 50, this.y, 50, 50);
    ellipse(this.x + 20, this.y, 50, 50);
    ellipse(this.x + 70, -20 + this.y, 50, 50);
    ellipse(this.x + 35, -30 + this.y, 50, 50);
    ellipse(this.x, -20 + this.y, 50, 50);
    // this.sound.loop();
    //midpoint --> (this.x+35, this.y-15);
    };

    this.getX = function (){
      return this.x;
    }
    this.getY = function (){
      return this.y;
    }
    this.flash = function(){
      var newLightning = new lightning(this.x+35, this.y-15,pitch1[currentLightningSound]);
      // console.log(currentLightningSound);
      newLightning.display();
      this.display();
    }
  }


function lightning(x,y, pitch){

  this.x = x;
  this.y = y;
  this.sound = pitch;
  this.sound.setVolume(0.1);
  this.sound.play(0.001);



   var a = this.x + random(20,50);
   var b = this.y + random(60,125);
   var c = random(-50,-70);
   var d = random(40,80);
   var e = random(20,60);
   var f = random(20,60);
   var g = random(-20, -50);
   var h = random (20, 60);
   
     // noLoop();
  // this.flashsound = function(){
     
  // this.sound.play();
  // }
  
  this.display = function(){
     strokeWeight(4);
     stroke(255, 225 , 50);
     push();
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
