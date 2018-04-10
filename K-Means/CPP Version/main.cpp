#include <iostream>
#include <vector>
#include "points.h"
#include "kmeans.h"
int main()
{
	std::vector<Points> dataPoints = createPoints(50);
	std::vector<Points> weightPoints = createPoints(2);

	kMeansRoutine(dataPoints,weightPoints);

	return 0;
}
