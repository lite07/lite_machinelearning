/*
K-Means Subprogram (Created: 10-04-18)
Contains the procedure used in the K-Means Algorithm
Function List:
-createPoints
-clusterAssignment
-centroidCalculation
-kMeansRoutine
-ouputDataCluster

Zaky Yudha Rabbani
20217322
Physics Department, Institut Teknologi Bandung, Indonesia
Last Modified: 11-04-18
*/
#ifndef _KMEANSH_
#define _KMEANSH_

#include "points.h"
#include <vector> 	
#include <stdlib.h> 
#include <time.h> 	
#include <stdio.h> 	
#include <fstream>

//Create N-random points between -5 and 5
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

//Assign a data points to the nearest weight point
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

//Calculate the new weight points coordinates based on the number of data points that are in the same group
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
			}
			new_x = new_x/clusterGroup[i].size();
			new_y = new_y/clusterGroup[i].size();
		}
		weightPoints[i].x = new_x;
		weightPoints[i].y = new_y;
	}
	
}


//The main K-Means Algorithm procedure
void kMeansRoutine(std::vector<Points> &dataPoints, std::vector<Points> &weightPoints)
{
	double numberOfCluster = weightPoints.size();
	double numberOfData = dataPoints.size();
	int epoch = 0;
	while(epoch<10)
	{
		epoch++;
		for(int i = 0; i<numberOfData; i++)
		{
			clusterAssignment(dataPoints[i], weightPoints);
		}
		centroidCalculation(dataPoints,weightPoints);
		for(int i = 0; i<numberOfCluster; i++)
		{
			weightPoints[i].group = i;
		}
	}
	
	for(int i = 0; i<numberOfData; i++)
	{
		clusterAssignment(dataPoints[i], weightPoints);
	}
}

//Outputs the grouped data into a txt file
void outputDataCluster(std::vector<Points> dataPoints, std::vector<Points> weightPoints)
{
	double numberOfCluster = weightPoints.size();
	double numberOfData = dataPoints.size();
	
	std::ofstream ofile;
	ofile.open("clusteredData.txt");	
	
	for(int i = 0; i<numberOfCluster; i++)
	{
		ofile << "Cluster-" << i+1 << ":\n";
		for(int j=0; j<numberOfData; j++)
		{
			if(dataPoints[j].group==weightPoints[i].group)
			{
				ofile << dataPoints[j].x << "\t\t" << dataPoints[j].y << "\n";
			}
		}
	}
	ofile.close();
}

#endif
