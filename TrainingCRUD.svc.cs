//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Runtime.Serialization;
//using System.ServiceModel;
//using System.Text;
//using System.Xml.Serialization;

//namespace AddCon_TravellingSalesman
//{
//    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "TrainingCRUD" in code, svc and config file together.
//    // NOTE: In order to launch WCF Test Client for testing this service, please select TrainingCRUD.svc or TrainingCRUD.svc.cs at the Solution Explorer and start debugging.
//    public class TrainingCRUD : ITrainingCRUD
//    {
//        public void createEvent(Models.EventModel fbEvent)
//        {
//            throw new NotImplementedException();
//        }

//        public IQueryable  retrieveEvent()
//        {
//            var db = new Models.AddConTravellingSalesmanContext(); 
//            return db.EventModel.AsQueryable<Models.EventModel>();
//        }

//        public void updateEvent(Models.EventModel fbEvent)
//        {
//            throw new NotImplementedException();
//        }

//        public void deleteEvent(Models.EventModel fbEvent)
//        {
//            throw new NotImplementedException();
//        }
//    }
//}
