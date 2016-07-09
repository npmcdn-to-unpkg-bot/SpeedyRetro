namespace SpeedyRetro.Migrations
{
    using System.Data.Entity.Migrations;

    public partial class BoardEntityMigration : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.UserModelRetrospectiveViewModels", newName: "RetrospectiveModelUserModels");
            RenameColumn(table: "dbo.RetrospectiveModelUserModels", name: "RetrospectiveViewModel_Id", newName: "RetrospectiveModel_Id");
            RenameIndex(table: "dbo.RetrospectiveModelUserModels", name: "IX_RetrospectiveViewModel_Id", newName: "IX_RetrospectiveModel_Id");
            DropPrimaryKey("dbo.RetrospectiveModelUserModels");
            CreateTable(
                "dbo.BoardModels",
                c => new
                {
                    Id = c.Int(nullable: false, identity: true),
                    Name = c.String(),
                    Retrospective_Id = c.Guid(nullable: false),
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.RetrospectiveModels", t => t.Retrospective_Id)
                .Index(t => t.Retrospective_Id);

            CreateTable(
                "dbo.CommentModels",
                c => new
                {
                    Id = c.Int(nullable: false, identity: true),
                    Text = c.String(),
                    Board_Id = c.Int(),
                    Lane_Id = c.Int(),
                    User_Id = c.Guid(),
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.BoardModels", t => t.Board_Id)
                .ForeignKey("dbo.LaneModels", t => t.Lane_Id)
                .ForeignKey("dbo.UserModels", t => t.User_Id)
                .Index(t => t.Board_Id)
                .Index(t => t.Lane_Id)
                .Index(t => t.User_Id);

            CreateTable(
                "dbo.LaneModels",
                c => new
                {
                    Id = c.Int(nullable: false, identity: true),
                    Name = c.String(),
                    Pool_Id = c.Int(),
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.PoolModels", t => t.Pool_Id)
                .Index(t => t.Pool_Id);

            CreateTable(
                "dbo.PoolModels",
                c => new
                {
                    Id = c.Int(nullable: false),
                    Name = c.String(),
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.BoardModels", t => t.Id)
                .Index(t => t.Id);

            CreateTable(
                "dbo.RetrospectiveModels",
                c => new
                {
                    Id = c.Guid(nullable: false),
                    Name = c.String(),
                    BoardId = c.Int(nullable: false),
                })
                .PrimaryKey(t => t.Id);

            AddPrimaryKey("dbo.RetrospectiveModelUserModels", new[] { "RetrospectiveModel_Id", "UserModel_Id" });
            DropForeignKey("dbo.UserModelRetrospectiveViewModels", "RetrospectiveViewModel_Id");
            DropTable("dbo.RetrospectiveViewModels");
        }

        public override void Down()
        {
            CreateTable(
                "dbo.RetrospectiveViewModels",
                c => new
                {
                    Id = c.Guid(nullable: false),
                    Name = c.String(),
                })
                .PrimaryKey(t => t.Id);

            DropForeignKey("dbo.BoardModels", "Retrospective_Id", "dbo.RetrospectiveModels");
            DropForeignKey("dbo.CommentModels", "User_Id", "dbo.UserModels");
            DropForeignKey("dbo.CommentModels", "Lane_Id", "dbo.LaneModels");
            DropForeignKey("dbo.LaneModels", "Pool_Id", "dbo.PoolModels");
            DropForeignKey("dbo.PoolModels", "Id", "dbo.BoardModels");
            DropForeignKey("dbo.CommentModels", "Board_Id", "dbo.BoardModels");
            DropIndex("dbo.PoolModels", new[] { "Id" });
            DropIndex("dbo.LaneModels", new[] { "Pool_Id" });
            DropIndex("dbo.CommentModels", new[] { "User_Id" });
            DropIndex("dbo.CommentModels", new[] { "Lane_Id" });
            DropIndex("dbo.CommentModels", new[] { "Board_Id" });
            DropIndex("dbo.BoardModels", new[] { "Retrospective_Id" });
            DropPrimaryKey("dbo.RetrospectiveModelUserModels");
            DropTable("dbo.RetrospectiveModels");
            DropTable("dbo.PoolModels");
            DropTable("dbo.LaneModels");
            DropTable("dbo.CommentModels");
            DropTable("dbo.BoardModels");
            AddPrimaryKey("dbo.RetrospectiveModelUserModels", new[] { "UserModel_Id", "RetrospectiveViewModel_Id" });
            RenameIndex(table: "dbo.RetrospectiveModelUserModels", name: "IX_RetrospectiveModel_Id", newName: "IX_RetrospectiveViewModel_Id");
            RenameColumn(table: "dbo.RetrospectiveModelUserModels", name: "RetrospectiveModel_Id", newName: "RetrospectiveViewModel_Id");
            RenameTable(name: "dbo.RetrospectiveModelUserModels", newName: "UserModelRetrospectiveViewModels");
        }
    }
}
