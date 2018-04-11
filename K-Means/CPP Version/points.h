/*
Points Class Declaration (Created: 10-04-18)
Contains the Points class-object used in the K-Means Algorithm

Zaky Yudha Rabbani
20217322
Physics Department, Institut Teknologi Bandung, Indonesia
Last Modified: 11-04-18
*/

#ifndef _POINTSH_
#define _POINTSH_
#include <cmath>

class Points
{
	public:
		double x;
		double y;
		double group;
		
	//Constructor
	Points(double ix, double iy)
	{
		x = ix;
		y = iy;
		group = 0;
	}
	
	//Distance between 2 points
	static double pointsDistance(Points A, Points B)
	{
		return sqrt((A.x-B.x)*(A.x-B.x)+(A.y-B.y)*(A.y-B.y));
	}
};

#endif
