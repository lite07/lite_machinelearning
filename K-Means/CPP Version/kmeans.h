#ifndef _KMEANSH_
#define _KMEANSH_

#include "points.h"
#include <vector> 	
#include <stdlib.h> 
#include <time.h> 	
#include <stdio.h> 	

std::vector<Points> createPoints(int numberOfPoints)
{
	srand(time(NULL));
	
	std::vector<Points> vectorOfPoints;
	for(int i = 0; i<numberOfPoints; i++)
	{
		double x = (rand()%1000)/double(100) - 5;
		double y = (rand()%1000)/double(100) - 5;
		Points inputPoints(x,y);
		vectorOfPoints.push_back(inputPoints);
	}
	
	return vectorOfPoints;
}

void clusterAssignment(Points &A, std::vector<Points> weightPoints)
{
	double p2wDistance = Points::pointsDistance(A,weightPoints[0]);
	A.group = weightPoints[0].group;
	
	for(int i = 1; i<weightPoints.size(); i++)
	{
		double distanceCheck = Points::pointsDistance(A,weightPoints[i]);
		if(distanceCheck<p2wDistance)
		{
			p2wDistance = distanceCheck;
			A.group = weightPoints[i].group;
		}
	}
}

void centroidCalculation(std::vector<Points> dataPoints, std::vector<Points> &weightPoints)
{
	double numberOfData = dataPoints.size();
	double numberOfCluster = weightPoints.size();
	std::vector<std::vector<Points>> clusterGroup;
	
	for(int i = 0; i<numberOfCluster; i++)
	{
		std::vector<Points> dataCluster;
		clusterGroup.push_back(dataCluster);
	}
	
	for(int i =0; i<numberOfData; i++)
	{
		for(int j = 0; j<numberOfCluster; j++)
		{
			if(dataPoints[i].group==j)
			{
				clusterGroup[j].push_back(dataPoints[i]);
				break;
			}
		}
	}
	
	for(int i =0; i<numberOfCluster; i++)
	{
		double new_x = 0;
		double new_y = 0;
		
		if(clusterGroup[i].size()!=0)
		{
			for(int j = 0; j<clusterGroup[i].size();j++)
			{
				new_x += clusterGroup[i][j].x;
				new_y += clusterGroup[i][j].y;	
				//std::cout << new_x << "\t" << new_y << "\n";	
			}
			new_x = new_x/clusterGroup[i].size();
			new_y = new_y/clusterGroup[i].size();
		}
		weightPoints[i].x = new_x;
		weightPoints[i].y = new_y;
	}
	
}

void kMeansRoutine(std::vector<Points> &dataPoints, std::vector<Points> &weightPoints)
{
	double numberOfData = dataPoints.size();
	double numberOfCluster = weightPoints.size();
	int epoch = 0;
	while(epoch<10)
	{
		epoch++;
		for(int i = 0; i<numberOfData; i++)
		{
			clusterAssignment(dataPoints[i], weightPoints);
		}
		centroidCalculation(dataPoints,weightPoints);
		for(int i = 0; i<2; i++)
		{
			weightPoints[i].group = i;
			std::cout << weightPoints[i].x << "\t" << weightPoints[i].y << "\n";
		}
	}
}

#endif
