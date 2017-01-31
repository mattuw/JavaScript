var circles = [];
var initialCircles = 10;
var img;

function preload(){
    img = loadImage("earthFromLiveScience.jpg");
    img.loadPixels();
}

function setup(){
	createCanvas(img.width,img.height);
    for(var i = 0; i < initialCircles; i++){
        var x = random(width);
        var y = random(height);
        var col = img.get(x, y);
        var toAdd =  new circle(x, y, 2);
        toAdd.setColour(col);
        circles.push(toAdd);
    }
}

function draw(){
	background(1);
    
    for(var c = 0; c < circles.length; c++){
        for(var l = 0; l < circles.length; l++){
            if(circles[c] !=  circles[l]){
                var radiusDist = Math.pow(circles[c].getRadius() + circles[l].getRadius(),2);
                var dx = circles[c].getX() - circles[l].getX();
                var dy = circles[c].getY() - circles[l].getY();
                var lineDist = Math.pow(dx, 2)+ Math.pow(dy, 2);
                //console.log(radiusDist + " || " + lineDist)
                if(radiusDist >= lineDist){
                    circles[c].setGrowth(false);
                    circles[l].setGrowth(false);
                }
            }
        }
    }
    
    for(var c = 0; c < circles.length; c++){
        circles[c].growCircle();
        circles[c].render();
    }
    
    var attempts = 0;
    var placements = 0;
    var placing = true;
    while(attempts < 10){
        var tempX = random(width);
        var tempY = random(height);
        var tempR = random(2, 10);
        var circ = new circle(tempX, tempY, tempR);
        
        for(var i = 0; i < circles.length; i++){
                var radiusDist2 = Math.pow(tempR + circles[i].getRadius(),2);
                var dx2 = tempX - circles[i].getX();
                var dy2 = tempY - circles[i].getY();
                var lineDist2 = Math.pow(dx2, 2)+ Math.pow(dy2, 2);
                //console.log(radiusDist + " || " + lineDist)
                if(radiusDist2 <= lineDist2){
                  continue;
                } else{
                    placing = false;
                    break;
                }
        }
        
        if(placing){
            circ.setColour(img.get(circ.getX(), circ.getY()));
            circles.push(circ);
            placements++;
        }
        attempts ++;
    }
}

function circle(x,y,r){
    var pos = createVector(x,y);
    var radius = r;
    var grow = true;
    var colour = color(0,0,0); 
    
    this.getRadius = function(){
        return radius;
    }
    
    this.setGrowth = function(boo){
        grow = boo;    
    }
    
    this.setColour = function(coll){
        colour = coll;    
    }
    
    this.getX = function(){
        return pos.x;
    }
    this.getY = function(){
        return pos.y;
    }
    
    this.growCircle = function(){
        if(pos.x - radius <= 0 || pos.x + radius >= width || pos.y - radius <= 0 || pos.y + radius >= height){
            grow = false;
        }
        if(grow){
            radius ++;
        }
    }
    
    this.render = function(){
        fill(colour);
        ellipse(pos.x, pos.y, radius*2);
    }
}