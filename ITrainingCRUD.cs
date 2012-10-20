using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace AddCon_TravellingSalesman
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "ITrainingCRUD" in both code and config file together.
    [ServiceContract]
    public interface ITrainingCRUD
    {
        [OperationContract]
        void createEvent(Models.EventModel fbEvent);
        [OperationContract]
        [WebGet(UriTemplate = "/events", ResponseFormat = WebMessageFormat.Xml)]
        IQueryable retrieveEvent();
        [OperationContract]
        void updateEvent(Models.EventModel fbEvent);
        [OperationContract]
        void deleteEvent(Models.EventModel fbEvent);
    }
}
