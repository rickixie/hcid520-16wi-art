// Define any global variables here
// (BUT don't call any p5 methods here;
//  call them in the functions below!)

var SOCKET_URL = 'wss://fierce-plains-17880.herokuapp.com/';
var TEAM_NAME  = '';
var socket; 

function setup() {
  createCanvas(windowWidth, windowHeight); // Use the full browser window
  socket = io(SOCKET_URL + TEAM_NAME); // Open a socket connection to the server.
  // Additional setup goes here. E.g., registering socket.on handlers. 
}

function draw() {
  // Put your drawing code here
}

// Define any additional helper functions here
