var mapGrid = [];
var mapSize = 16;
var tileD = 32;
var john;
var objectList = [];
var counter = 0;

function preload(){
    //Location to load images
    john = new player();
    objectList.push(john);
    
    for(var x = 0; x < mapSize; x++){
        for(var y = 0; y < mapSize; y++){
            var t = new tile();
            t.setPosition(x, y);
            mapGrid.push(t);
            objectList.push(t);
        }
    }
}

function setup(){
    createCanvas(mapSize *tileD +1, mapSize*tileD+1);
}

function draw(){
    console.log(objectList.length);
	for(var toRend = objectList.length - 1; toRend >= 0; toRend --){
        objectList[toRend].render();
    }
    counter++;
}

function player(){
    
    var pos = createVector(50,50);
    
    
    this.render = function(){
        fill(255);
        ellipse(pos.x + counter, pos.y, tileD, tileD*2);
        if(pos.x + counter - tileD/2 >= width){
            counter=-100;
        }
    }
}

function tile(){
    var collideable = false;
    var colour = color(30, 30, 200);
    var pos = createVector(0,0);
    
    this.setPosition = function(dx, dy){
        pos.x = dx;
        pos.y = dy;
    }
    
    this.render = function(){
        fill(colour);
        noStroke();
        rect(pos.x * tileD, pos.y * tileD, tileD, tileD);
    }
}