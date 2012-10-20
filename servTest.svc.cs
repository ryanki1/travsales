using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace AddCon_TravellingSalesman
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "servTest" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select servTest.svc or servTest.svc.cs at the Solution Explorer and start debugging.
    public class servTest : IservTest
    {
        public void DoWork()
        {
            Console.WriteLine("DoWork called.");
        }
    }
}
