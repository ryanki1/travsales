using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Http.Data.EntityFramework;
using AddCon_TravellingSalesman.Models;

namespace AddCon_TravellingSalesman.Controllers
{   
    public class SalesmanServiceController : DbDataController<AddConTravellingSalesmanContext>
    {       
        //
        // GET: api/SalesmanService/

        public IQueryable<SalesmanModel> GetSalesman()
        {
            return DbContext.SalesmanModels.OrderBy(salesman => salesman.FirstName);
        }
        public void InsertDelivery(SalesmanModel salesman)
        { InsertEntity(salesman); }
        public void UpdateDelivery(SalesmanModel salesman)
        { UpdateEntity(salesman); }
        public void DeleteDelivery(SalesmanModel salesman)
        { DeleteEntity(salesman); }
    }
}