
var SOCKET_URL = 'wss://fierce-plains-17880.herokuapp.com/';
var TEAM_NAME  = 'zeitgeist';
var socket;

var ants = [];
var antSize = 1;
var antLimit = 10;
var r, g, b;
var speech;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  r = random() < 0.5 ? 200 : 0;
  g = random() < 0.5 ? 200 : 0;
  b = random() < 0.5 ? 200 : 0;

  socket = io(SOCKET_URL + TEAM_NAME);
  socket.on('ant', addAnt);
  socket.on('size', function(size) {
    antSize = size;
  });
  //when someone open a new chat, assignment a ID and store in an array
  socket.emit('sketchIDConnected', random());
  //do something when someone close their connection (e.g: hit escape or space bar)
  //e.g: remove their ID
  socket.emit('sketchIDDisconnected', random());
  
  
  
  socket.emit('sense', {deviceShaken: true});
  socket.on('deviceShaken', deviceShaken);
  speech = new p5.SpeechRec();
  speech.continuous = true;
  speech.onResult = parseSpeech;
  speech.start();
}

function addAnt(x, y, r, g, b) {
  ants.push({
    x: x,
    y: y,
    c: 'rgb(' + r + ',' + g + ',' + b + ')'
  });
  if (antLimit > 0 && ants.length > antLimit) ants.shift();
}

function sizeAnt(size) {
  antSize = size;
}

function mouseMoved() {
  addAnt(mouseX, mouseY, r, g, b);
  socket.emit('ant', mouseX, mouseY, r, g, b);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    antSize = antSize + 1;
    socket.emit('size', antSize);
  } else if (keyCode === DOWN_ARROW) {
    antSize = antSize - 1;
    socket.emit('size', antSize);
  }

  return false;
}

function deviceShaken(data) {
  ants = [];
  console.log(data.mobileID);//access to the data collected from the deviceShaken
  //need a method to check if the number is already existed
}

function parseSpeech() {
  var words = speech.resultString.split(' ');
  if (words.length >= 4 && words[0] == 'set' && words[1] == 'color' && words[2] == 'to') {
    var colorName = words.splice(3).join(''),
        colorVal  = color(colorName);
    r = colorVal._getRed();
    g = colorVal._getGreen();
    b = colorVal._getBlue();
  }
}

function draw() {
  for (var i=0; i<ants.length; ++i) {
    fill(ants[i].c);
    rect(ants[i].x, ants[i].y, antSize, antSize);
    ants[i].x += antSize * random(-1, 1);
    ants[i].y += antSize * random(-1, 1);

    if (ants[i].x < 0) ants[i].x += windowWidth;
    if (ants[i].y < 0) ants[i].y += windowHeight;
    ants[i].x = ants[i].x % windowWidth;
    ants[i].y = ants[i].y % windowHeight;
  }
}
