/*
Javascript file for the K-Means Calculation
Zaky Yudha Rabbani
Physics Department, Institut Teknologi Bandung, Indonesia
08-04-18
Reference:
http://user.engineering.uiowa.edu/~ie_155/lecture/K-means.pdf
*/
function singleEpochKMeans(data,weights)
{
	//Creating temporary group
	var tempCluster = new Array;
	for(var i = 0; i<weights.length; i++)
	{
		tempCluster[i] = new Array;
	}
	
	//Determining which weights is the closest to the data
	for(var i = 0; i<data.length; i++)
	{
		var minIndex = 0;
		var distance = Points.distance(data[i],weights[0]);
		for(j = 1; j<weights.length; j++)
		{
			if(distance>Points.distance(data[i],weights[j]))
			{
				distance = Points.distance(data[i],weights[j]);
				minIndex = j;
			}
		}
		//Assigning the data to the closest weight
		data[i].group = weights[minIndex].group;
		tempCluster[minIndex].push(data[i]);
	}
	
	//Determining the centroid/center of mass of the group and move the weights accordingly
	for(var i = 0; i<weights.length; i++)
	{
		var sumX = 0;
		var sumY = 0;
		var N = tempCluster[i].length;
		for(var j = 0; j<N; j++)
		{
			sumX = sumX + tempCluster[i][j].x;
			sumY = sumY + tempCluster[i][j].y;
		}
		sumX = sumX/N;
		sumY = sumY/N;
		weights[i].x = sumX;
		weights[i].y = sumY;
	}
}