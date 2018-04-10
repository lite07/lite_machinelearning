#ifndef _POINTSH_
#define _POINTSH_
#include <cmath> //sqrt()

class Points
{
	public:
		double x;
		double y;
		double group;
		
	Points(double ix, double iy)
	{
		x = ix;
		y = iy;
		group = 0;
	}
	
	static double pointsDistance(Points A, Points B)
	{
		return sqrt((A.x-B.x)*(A.x-B.x)+(A.y-B.y)*(A.y-B.y));
	}
};

#endif
