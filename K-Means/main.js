/*
Javascript file where the core functions called by the button is declared.
Zaky Yudha Rabbani
Physics Department, Institut Teknologi Bandung, Indonesia
08-04-18
Reference:
http://user.engineering.uiowa.edu/~ie_155/lecture/K-means.pdf
*/

//Declaring some global variable
var dataPoints = createPoints(100);
var weightPoints = createPoints(5);
var numberOfEpoch = 0;

//Assigning different color to the weightPoints
for(var i = 0; i<5; i++)
{
	weightPoints[i].group = i;
}

//Function to draw all the points on the canvas
function drawSystemOnCanvas()
{
	var canvas = document.getElementById("cvs");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0,0,canvas.width,canvas.height);
	for(var i = 0; i<dataPoints.length; i++)
	{
		drawPoints(dataPoints[i]);
		if(i<weightPoints.length)
		{
			drawPoints(weightPoints[i]);
		}
	}
}

//Function that call a single iteration of k-means calculation on click of a button.
function buttonClick()
{
	numberOfEpoch++;
	var counter = document.getElementById("epochCounter");
	counter.innerHTML = "Number of epoch: " + numberOfEpoch;
	singleEpochKMeans(dataPoints,weightPoints);
	drawSystemOnCanvas();
}