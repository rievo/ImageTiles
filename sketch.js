
var img;

var rects = [];

var minSize = 10;


function preload(){
	img = loadImage('stars.jpg');
}


function setup() {
	createCanvas(745, 596);

	
	pixelDensity(1);

	loadPixels();

	var rect = new Rectangle(0,0,img.width,img.height);
	rects.push(rect);


	//rect.divide();
}

function draw() {
	background(51);
	img.loadPixels();
	image(img, 0,0);


	for(var i = 0; i< rects.length; i++){
		var r = rects[i];
		r.display();
	}
}


var myVar = setInterval(myTimer, 50);

function myTimer() {

	var count =  Math.floor( Math.random() * ( 5 - 1 ) ) + 1;
    

    for(var a = 0; a < count; a++){
    	var index = Math.floor( Math.random() * ( rects.length - 0 ) ) + 0;
	    var r = rects[index];

	    if(r.width >minSize && r.height > minSize){
	    	r.divide();
		}
	}
}

/*
function mouseMoved(){

	for(var i = 0; i< rects.length; i++){
		var r = rects[i];
		
		if(r.width >minSize && r.height > minSize){

			if(r.mouseIn()){
					r.divide();
				return;
			}
		}
	}
}*/



/*
function mousePressed(){

	for(var i = 0; i< rects.length; i++){
		var r = rects[i];

		if(r.width >minSize && r.height > minSize){

			if(r.mouseIn()){
				
					r.divide();
				return;
			}
		}
	}
}
*/


function getIndexOfObjectInArray(object, array){
	for(var i = 0; i< array.length; i++){
		var o = array[i];

		if(o === object){
			return i;
		}
	}

	return -1;
}


function readColorOfXYInTheImage(x,y){
	loadPixels();
	img.loadPixels();

	var pixloc = (y * img.width + x)*4;

	var r = img.pixels[pixloc];
	var g = img.pixels[pixloc +1];
	var b = img.pixels[pixloc +2];


	var col = new Color(r,g,b);

	return col;
}

//--------------------------
function Rectangle(x,y,w,h){
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;


	//TODO: This color should be read from img
	//this.color = new Color(200, 20, 50); 
	this.color = readColorOfXYInTheImage(this.x +  Math.floor(this.width/2), this.y +   Math.floor(this.height/2));
}


Rectangle.prototype.display = function(){
	fill(this.color.r, this.color.g, this.color.b);
	noStroke();
	rect(this.x, this.y, this.width, this.height);
}


Rectangle.prototype.divide = function(){
	var halfWidth =  Math.floor(this.width / 2);
	var halfHeight =  Math.floor(this.height / 2);

	var ne = new Rectangle(this.x + halfWidth, this.y 			  ,halfWidth, halfHeight);
	var se = new Rectangle(this.x + halfWidth, this.y + halfHeight, halfWidth, halfHeight);
	var sw = new Rectangle(this.x,			   this.y + halfHeight, halfWidth, halfHeight);
	var nw = new Rectangle(this.x , 		   this.y 			  , halfWidth, halfHeight);

	//Remove this from the array

	var myIndex = getIndexOfObjectInArray(this, rects);
	rects.splice(myIndex,1);

	rects.push(ne);
	rects.push(se);
	rects.push(sw);
	rects.push(nw);
}

Rectangle.prototype.mouseIn = function(){

	if(mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height){
		return true;
	}else{
		return false;
	}
}