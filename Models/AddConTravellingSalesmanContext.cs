using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace AddCon_TravellingSalesman.Models
{
    public class AddConTravellingSalesmanContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, add the following
        // code to the Application_Start method in your Global.asax file.
        // Note: this will destroy and re-create your database with every model change.
        // 
        // System.Data.Entity.Database.SetInitializer(new System.Data.Entity.DropCreateDatabaseIfModelChanges<AddCon_TravellingSalesman.Models.AddConTravellingSalesmanContext>());

        public DbSet<AddCon_TravellingSalesman.Models.SalesmanModel> SalesmanModels { get; set; }
        public DbSet<AddCon_TravellingSalesman.Models.EventModel> EventModel { get; set; }
    }
    //public class fred : DropCreateDatabaseAlways<AddConTravellingSalesmanContext>
    //{
    //    protected override void Seed(AddConTravellingSalesmanContext context)
    //    {
    //        SalesmanModel salesman = new SalesmanModel { FirstName = "Fred", Mob = "1234" };
    //        context.SalesmanModels.Add(salesman);
    //    }
    //}
}