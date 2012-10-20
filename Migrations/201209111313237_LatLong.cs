namespace AddCon_TravellingSalesman.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class LatLong : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.SalesmanModels", "Latitude", c => c.Decimal(nullable: true, precision: 18, scale: 2));
            AddColumn("dbo.SalesmanModels", "Longitude", c => c.Decimal(nullable: true, precision: 18, scale: 2));
        }
        
        public override void Down()
        {
            DropColumn("dbo.SalesmanModels", "Longitude");
            DropColumn("dbo.SalesmanModels", "Latitude");
        }
    }
}
