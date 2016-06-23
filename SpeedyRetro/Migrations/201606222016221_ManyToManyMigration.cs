namespace SpeedyRetro.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ManyToManyMigration : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.UserModels", "Retrospective_Id", "dbo.RetrospectiveViewModels");
            DropIndex("dbo.UserModels", new[] { "Retrospective_Id" });
            CreateTable(
                "dbo.UserModelRetrospectiveViewModels",
                c => new
                    {
                        UserModel_Id = c.Guid(nullable: false),
                        RetrospectiveViewModel_Id = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => new { t.UserModel_Id, t.RetrospectiveViewModel_Id })
                .ForeignKey("dbo.UserModels", t => t.UserModel_Id, cascadeDelete: true)
                .ForeignKey("dbo.RetrospectiveViewModels", t => t.RetrospectiveViewModel_Id, cascadeDelete: true)
                .Index(t => t.UserModel_Id)
                .Index(t => t.RetrospectiveViewModel_Id);
            
            DropColumn("dbo.UserModels", "Retrospective_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.UserModels", "Retrospective_Id", c => c.Guid());
            DropForeignKey("dbo.UserModelRetrospectiveViewModels", "RetrospectiveViewModel_Id", "dbo.RetrospectiveViewModels");
            DropForeignKey("dbo.UserModelRetrospectiveViewModels", "UserModel_Id", "dbo.UserModels");
            DropIndex("dbo.UserModelRetrospectiveViewModels", new[] { "RetrospectiveViewModel_Id" });
            DropIndex("dbo.UserModelRetrospectiveViewModels", new[] { "UserModel_Id" });
            DropTable("dbo.UserModelRetrospectiveViewModels");
            CreateIndex("dbo.UserModels", "Retrospective_Id");
            AddForeignKey("dbo.UserModels", "Retrospective_Id", "dbo.RetrospectiveViewModels", "Id");
        }
    }
}
