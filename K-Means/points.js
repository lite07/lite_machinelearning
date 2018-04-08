/*
Javascript file for declaring a point class, a function to draw points on the canvas, and a color library for each group.
Zaky Yudha Rabbani
Physics Department, Institut Teknologi Bandung, Indonesia
08-04-18
Reference:
http://user.engineering.uiowa.edu/~ie_155/lecture/K-means.pdf
*/

//Points class
class Points{
	constructor(x,y)
	{
		this.x = x;
		this.y = y;
		this.group = 0;
	}
	
	static distance(a,b)
	{
		return Math.sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y));
	}
}

//Create some points
function createPoints(numberOfPoints)
{
	var points = new Array;
	for(var i = 0; i<numberOfPoints; i++)
	{
		var x = 10*Math.random()-5;
		var y = 10*Math.random()-5;
		points[i] = new Points(x,y);
	}
	
	return points;
}

//Drawing points onto canvas
function drawPoints(a)
{
	var canvas = document.getElementById("cvs");
	var ctx = canvas.getContext("2d");
	var colorCode = getColor(a.group);
	
	function transX(x)
	{
		return (x+6)*(canvas.width-0)/(6+6);
	}
	
	function transY(y)
	{
		return canvas.height+(y+6)*(0-canvas.height)/(6+6);
	}
	ctx.beginPath();
	ctx.strokeStyle = colorCode;
	ctx.fillStyle = colorCode;
	ctx.arc(transX(a.x),transY(a.y),2,0,2*Math.PI);
	ctx.fill();
	ctx.closePath();
	ctx.stroke();
}

//Color library for each type of group (with a maximum of 11 groups)
function getColor(pointType)
{
	switch(pointType)
	{
		case 0:
			return "#000";
			break;
		case 1:
			return "#ff1a1a";
			break;
		case 2:
			return "#00ff00";
			break;
		case 3:
			return "#0066ff";
			break;
		case 4:
			return "#003300";
			break;
		case 5:
			return "#b300b3";
			break;
		case 6:
			return "#0000cc";
			break;
		case 7:
			return "#33ccff";
			break;
		case 8:
			return "#ff00ff";
			break;
		case 9:
			return "#000080";
			break;
		case 10:
			return "#ff9900";
			break;
		default:
			return "#fff";
	}
}