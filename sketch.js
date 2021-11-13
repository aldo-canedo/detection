/*

let facemesh;
let video;
let predictions = [];

let tamano=0.0001;

let offX = 0;
let offY = 0;

function setup() {
  createCanvas(1920, 1080);
  video = createCapture(VIDEO);
  video.size(640,480);

  facemesh = ml5.facemesh(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new predictions are made
  facemesh.on("predict", results => {
    predictions = results;
   // print(results);
  });

  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {

  fill(255);
  rect(0,0,1920,1080);

  offX = sin( frameCount / 20) * 100;
  offY = cos( frameCount / 25) * 150;
  
  tint(100,100,100);
  image(video, 0, 0, 640/2, 480/2);
 //image(video, 0, 0, 1920, 1080);
  
  tamano=tamano+0.5;
  
  if (tamano>=100){
    tamano=1;
  }

  // We can call both functions to draw all keypoints
  drawKeypoints();

}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const keypoints = predictions[i].scaledMesh;

    // Draw facial keypoints.
    for (let j = 0; j < keypoints.length; j += 1) {
      const [x, y] = keypoints[j];

      stroke(0,100);
      noFill();
      ellipse(x-100, y+100, 1, 1);
     // 
     stroke(100,100,100,40);
     beginShape();
      vertex(x+400, y);
     // vertex(offX, offY);
      vertex(mouseX+offX, mouseY+offY);
      //vertex(mouseY-mouseY/2, mouseX-mouseX/2);
      endShape(CLOSE);
      
      
          }
  }
}



/*-------------------------------- video camera ---------------------------------------*/



// Copyright (c) 2020 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Object Detection using COCOSSD
This example uses a callback pattern to create the classifier
=== */

let video;
let detector;
let detections = [];

/*
function preload() {
  video = createVideo(['assets/BMW640.mov']);
  detector = ml5.objectDetector('cocossd', modelReady);
}

*/

function setup() {
  video = createCapture(VIDEO,videoReady);
//  video = createVideo(['assets/fingers.mov']);
  createCanvas(displayWidth, displayHeight);
  video.size(640, 480);
  video.hide();
  
 // video.play();
}


function videoReady() {
  // Models available are 'cocossd', 'yolo'
  detector = ml5.objectDetector('cocossd', modelReady);
}

function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }
  detections = results;
  detector.detect(video, gotDetections);
}

function modelReady() {
  detector.detect(video, gotDetections);
}

function draw() {


  translate(650, 150);

  background(0);
  image(video, 0, 0);
  filter(GRAY);
  
  for (let i = 0; i < detections.length; i += 1) {
    const object = detections[i];
    stroke(0, 0, 255);
    strokeWeight(4);
    noFill();
    rect(object.x, object.y, object.width, object.height);
    noStroke();
    fill(255);
    textSize(24);
    text(object.label, object.x + 10, object.y + 24);

    console.log(object);
  }
}


/*---------------------------------------image----------------------------*/



/*


let objectDetector;
let img;

function preload() {
  img = loadImage('images/cat.jpg');
  // Models available are 'cocossd', 'yolo'
  objectDetector = ml5.objectDetector('cocossd');
}

function setup() {
  createCanvas(640, 420);
  image(img, 0, 0);
  objectDetector.detect(img, gotResult);
}

// A function to run when we get any errors and the results
function gotResult(err, results) {
  if (err) {
    console.log(err);
  }

  for (let i = 0; i < results.length; i += 1) {
    noStroke();
    fill(0, 255, 0);
    text(
      `${results[i].label} ${nfc(results[i].confidence * 100.0, 2)}%`,
      results[i].x + 5,
      results[i].y + 15,
    );
    noFill();
    strokeWeight(4);
    stroke(0, 255, 0);
    rect(results[i].x, results[i].y, results[i].width, results[i].height);
  }
}


*/