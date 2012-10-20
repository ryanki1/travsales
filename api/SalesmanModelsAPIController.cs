using AddCon_TravellingSalesman.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AddCon_TravellingSalesman.api
{
    public class SalesmanModelsAPIController : ApiController
    {

        AddConTravellingSalesmanContext db = new AddConTravellingSalesmanContext();

        // GET api/SalesmanModelsAPI
        public IQueryable<SalesmanModel> Get()
        {
            return db.SalesmanModels;
        }

        // GET api/SalesmanModelsAPI/1
        public SalesmanModel Get(int id)
        {
            var salesmanQuery = from person in db.SalesmanModels
                                where id == person.ID
                                select person;
            return salesmanQuery.Single<SalesmanModel>();
        }

        private bool getID(SalesmanModel model) {
            return (1 == 1);
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}