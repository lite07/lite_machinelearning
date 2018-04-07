/*
Javascript file for declaring a point class and a function to draw it on the canvas.
Zaky Yudha Rabbani
Physics Department, Institut Teknologi Bandung, Indonesia
07-04-18
Reference:
-http://chem-eng.utoronto.ca/~datamining/Presentations/SOM.pdf
-https://www.youtube.com/watch?v=H9H6s-x-0YE
*/
class Point{
	constructor(x,y,ptype){
		this.x = x;
		this.y = y;
		this.pointType = ptype;
	}
	
	static distance(a,b){
		var dx = (a.x - b.x)*(a.x - b.x);
		var dy = (a.y - b.y)*(a.y - b.y);	
		return Math.sqrt(dx+dy);
	}
	
	static vector(a,b){
		var vx = b.x - a.x;
		var vy = b.y - a.y;
		var vecAB = new Point(vx,vy);
		return vecAB;
	}
}

function drawPoints(a)
{
	function transX(x)
	{
		return (x+6)*(500-0)/(6+6);
	}
	
	function transY(y)
	{
		return 500+(y+6)*(0-500)/(6+6);
	}
	
	var canvas = document.getElementById("cvs");
	var ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.strokeStyle = a.pointType;
	ctx.fillStyle = a.pointType;
	ctx.arc(transX(a.x),transY(a.y),3,0,2*Math.PI);
	ctx.fill();
	ctx.closePath();
	ctx.stroke();
}
