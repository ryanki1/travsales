namespace AddCon_TravellingSalesman.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class EventModelII : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.EventModels",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        What = c.String(nullable: false),
                        Where = c.String(nullable: false),
                        When = c.DateTime(nullable: false),
                        Who = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.EventModels");
        }
    }
}
