namespace SpeedyRetro.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddUserMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.UserModels",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Name = c.String(),
                        Retrospective_Id = c.Guid(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.RetrospectiveViewModels", t => t.Retrospective_Id)
                .Index(t => t.Retrospective_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.UserModels", "Retrospective_Id", "dbo.RetrospectiveViewModels");
            DropIndex("dbo.UserModels", new[] { "Retrospective_Id" });
            DropTable("dbo.UserModels");
        }
    }
}
