namespace AddCon_TravellingSalesman.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class IDTidyUp : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.SalesmanModels",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        FirstName = c.String(nullable: false),
                        LastName = c.String(nullable: false),
                        EMail = c.String(nullable: false),
                        Tel = c.String(),
                        Mob = c.String(),
                        Fax = c.String(),
                    })
                .PrimaryKey(t => t.ID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.SalesmanModels");
        }
    }
}
