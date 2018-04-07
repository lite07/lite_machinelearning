/*
Javascript file where the core functions called by the button is declared.
Zaky Yudha Rabbani
Physics Department, Institut Teknologi Bandung, Indonesia
07-04-18
Reference:
-http://chem-eng.utoronto.ca/~datamining/Presentations/SOM.pdf
-https://www.youtube.com/watch?v=H9H6s-x-0YE
*/

//Declaring some global variables
var dataPoints = initializeData(50);
var weightPoints = initializeWeights(2);
var t = 0;

//A function to clear the canvas
function clearCanvas()
{
	var canvas = document.getElementById("cvs");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0,0,canvas.width,canvas.height);
}

//This function is called when the 'Start Self-Organizing' button is clicked. It called the singleEpochFunction multiple times
//until the iteration (t) is >999
function buttonClick()
{
	var timer = setInterval(function somIteration(){
		var counter = document.getElementById("epochCounter");
		clearCanvas();
		singleEpochFunction(dataPoints, weightPoints);
		counter.innerHTML = "Number of epoch/training: " + t;
		for(var i = 0; i<dataPoints.length; i++)
		{
			drawPoints(dataPoints[i]);
			if(i<weightPoints.length)
			{
				drawPoints(weightPoints[i]);
			}
		}
		if(t>999)
		{
			clearInterval(timer);
		}
	},0.1)
}

//This function is called when the 'Classify Data' button is clicked. It divides the data based on their distance to each weight nodes
function dataClassification() 
{
	for(var i = 0; i<dataPoints.length; i++)
	{
		DI = Point.distance(dataPoints[i],weightPoints[0]);
		dataPoints[i].pointType = "#afa";
		for(var j = 1; j<weightPoints.length; j++)
		{		
			if(Point.distance(dataPoints[i],weightPoints[j])<DI)
			{
				DI = Point.distance(dataPoints[i],weightPoints[j]);
				dataPoints[i].pointType = "#aaa";
			}
		}
	}
	
	clearCanvas();
	for(var i = 0; i<dataPoints.length; i++)
	{
		drawPoints(dataPoints[i]);
		if(i<weightPoints.length)
		{
			drawPoints(weightPoints[i]);
		}
	}
}