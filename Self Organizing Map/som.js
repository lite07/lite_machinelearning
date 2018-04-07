/*
Javascript file that contains all the calculation used in the SOM Algorithm.
Zaky Yudha Rabbani
Physics Department, Institut Teknologi Bandung, Indonesia
07-04-18
Reference:
-http://chem-eng.utoronto.ca/~datamining/Presentations/SOM.pdf
-https://www.youtube.com/watch?v=H9H6s-x-0YE
*/

function sigma(t) //Neighborhood size
{
	var sigma0 = 2.5;
	var lambda = 10;
	return sigma0*Math.exp(-t/lambda); 
}

function L(t) //Learning rate
{
	var L0 = 0.1;
	var lambda = 10;
	return L0*Math.exp(-t/lambda);
}

function theta(t,BMU,weight) //Influence rate
{
	var D = Point.distance(BMU,weight);
	return Math.exp(-D*D/(2*sigma(t)*sigma(t)));
}

function initializeWeights(numOfWeights) //Weights initialization
{
	var newWeights = new Array;
	for(var i = 0; i < numOfWeights; i++)
	{
		var x = 10*Math.random() - 5;
		var y = 10*Math.random() - 5;
		newWeights[i] = new Point(x,y,"#aaf");
	}
	return newWeights;
}

function initializeData(numOfData) //Data initialization
{
	var newData = new Array;
	for(var i = 0; i < numOfData; i++)
	{
		var x = 10*Math.random() - 5;
		var y = 10*Math.random() - 5;
		newData[i] = new Point(x,y,"#faa");
	}
	return newData;
}

function getBMU(data, weights)	//Determine the Best-Matching-Unit (BMU) for the current data
{
	var BMU = weights[0];
	var DBMU = Point.distance(weights[0],data);
	for(var i = 1; i<weights.length; i++)
	{
		if(Point.distance(data,weights[i])<DBMU)
		{
			BMU = weights[i];
			DBMU = Point.distance(weights[i],data);
		}
	}
	return BMU;
}

function updateWeights(data,weights) //Updating the weights for the current Data
{
	var BMU = getBMU(data,weights); 
	for(var i = 0; i<weights.length; i++)
	{
		var weight_dataVector = Point.vector(weights[i],data);
		weights[i].x = weights[i].x + theta(t,BMU,weights[i])*L(t)*weight_dataVector.x;
		weights[i].y = weights[i].y + theta(t,BMU,weights[i])*L(t)*weight_dataVector.y;
	}
}

function singleEpochFunction(data, weights)
{
	t++;
	for(var i = 0; i<data.length; i++)
	{
		updateWeights(data[i],weights);
	}
}

