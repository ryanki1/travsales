using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Http.Data;
using AddCon_TravellingSalesman.Models;
using AddCon_TravellingSalesman.Utilities;
using Moq;

namespace AddCon_TravellingSalesman.Controllers
{
    public class SalesmanModelsController : Controller
    {
        private AddConTravellingSalesmanContext context = new AddConTravellingSalesmanContext();

        //
        // GET: /SalesmanModels/

        public ViewResult Index()
        {
            //var orderedModel = context.SalesmanModels.ToList().OrderBy(salesman => salesman.LastName);
            //return View(orderedModel);
            return View(context.SalesmanModels.ToList().OrderBy(salesman => salesman.LastName));
        }

        //
        //GET: /SalesmanModels/SequenceSalesman
        public PartialViewResult SequenceSalesman(string lat, string lng)
        {
            var modelByDistance = context.SalesmanModels.ToList().OrderBy(salesman => calculateDistance(lat, lng, salesman.Latitude, salesman.Longitude));
            return PartialView("SalesmanListControl", modelByDistance);
        }

        //private IOrderedEnumerable<SalesmanModel>cogSequenceSalesman(string lat, string lng){


        //    double latStart, lngStart;

        //    if (!(double.TryParse(lat,out latStart)) || !(double.TryParse(lng, out lngStart))) return null;

        //    var cogDone = new List<SalesmanModel>();

        //    foreach (SalesmanModel salesman in context.SalesmanModels){
        //            var distance = calculateDistance(latStart, lngStart, (double)salesman.Latitude, (double)salesman.Longitude);
                    
        //        }
        //}

        private double calculateDistance(string lat1, string lng1, decimal lat2, decimal lng2){

            double latStart, lngStart;
            if (!(double.TryParse(lat1, out latStart)) || !(double.TryParse(lng1, out lngStart))) return 24000;
            if ((lat2 == 0) || (lng2 == 0)) return 24000;
            var latFinish = (double)lat2;
            var lngFinish = (double)lng2;

            var R = 6371; // km
            var dLat = (latFinish - latStart).toRadians();
            var dLon = (lngFinish - lngStart).toRadians();
            var a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
            Math.Cos(latStart.toRadians()) * Math.Cos(latFinish.toRadians()) *
            Math.Sin(dLon / 2) * Math.Sin(dLon / 2);
            var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
            var d = R * c;
            return d;         
        }
        //
        // GET: /SalesmanModels/Details/5

        public ViewResult Details(int id)
        {
            SalesmanModel salesmanmodel = context.SalesmanModels.Single(x => x.ID == id);
            return View(salesmanmodel);
        }

        //
        // GET: /SalesmanModels/Create

        public ActionResult Create()
        {
            return View();
        } 

        //
        // POST: /SalesmanModels/Create

        [HttpPost]
        public ActionResult Create(SalesmanModel salesmanmodel)
        {
            if (ModelState.IsValid)
            {
                context.SalesmanModels.Add(salesmanmodel);
                context.SaveChanges();
                return RedirectToAction("Index");  
            }

            return View(salesmanmodel);
        }
        
        //
        // GET: /SalesmanModels/Edit/5
 
        public ActionResult Edit(int id)
        {
            SalesmanModel salesmanmodel = context.SalesmanModels.Single(x => x.ID == id);
            return View(salesmanmodel);
        }

        //
        // POST: /SalesmanModels/Edit/5

        [HttpPost]
        public ActionResult Edit(SalesmanModel salesmanmodel)
        {
            if (ModelState.IsValid)
            {
                context.Entry(salesmanmodel).State = EntityState.Modified;
                context.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(salesmanmodel);
        }

        //
        // GET: /SalesmanModels/Delete/5
 
        public ActionResult Delete(int id)
        {
            SalesmanModel salesmanmodel = context.SalesmanModels.Single(x => x.ID == id);
            return View(salesmanmodel);
        }

        //
        // POST: /SalesmanModels/Delete/5

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            SalesmanModel salesmanmodel = context.SalesmanModels.Single(x => x.ID == id);
            context.SalesmanModels.Remove(salesmanmodel);
            context.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing) {
                context.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}