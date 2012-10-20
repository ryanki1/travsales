using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AddCon_TravellingSalesman.Utilities
{
    public static class ExtensionMethods
    {
        public static double toRadians(this double degrees)
        {
            // From http://ezinearticles.com/?Radians-And-Degrees-In-C&id=1001744
            return (System.Math.PI * degrees) / 180.0;
        }
    }
}