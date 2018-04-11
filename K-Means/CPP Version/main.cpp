/*
K-Means Algorithm Program (Created: 10-04-18)
Made as an example for the Computational Physics Course on K-Means Algorithm

Zaky Yudha Rabbani
20217322
Physics Department, Institut Teknologi Bandung, Indonesia
Last Modified: 11-04-18
*/

#include <iostream>
#include <vector>
#include "points.h"
#include "kmeans.h"
int main()
{
	std::vector<Points> dataPoints = createPoints(50);
	std::vector<Points> weightPoints = createPoints(2);

	kMeansRoutine(dataPoints,weightPoints);
	outputDataCluster(dataPoints, weightPoints);
	return 0;
}
