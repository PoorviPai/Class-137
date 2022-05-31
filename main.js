status = "";
video = "";
object = [];

function preload(){
    video = createVideo('video.mp4');
}

function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
    console.log("Model loaded");
    video.loop();
    video.speed(1);
    video.volume(0);
}

function draw(){
    image(video,0,0,480,380);
    if (status !=""){
        objectDetector.detect(video,gotResult);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status: Object Detected";
            document.getElementById("number_of_objects").innerHTML="Number of Objects detected are " + objects.length;

            fill("white");
            percent = floor(object[i].confidence * 100);
            text(objects[i].label +" " + percent + "%", objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("white");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}