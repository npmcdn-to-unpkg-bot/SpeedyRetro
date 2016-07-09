using System.Data.Entity;

namespace SpeedyRetro.Models
{
    public class SpeedyRetroDbContext : DbContext
    {
        public SpeedyRetroDbContext() : base("SpeedyRetroConnection")
        { }

        public DbSet<BoardModel> Boards { get; set; }

        public DbSet<CommentModel> Comments { get; set; }

        public DbSet<LaneModel> Lanes { get; set; }

        public DbSet<PoolModel> Pools { get; set; }

        public DbSet<RetrospectiveModel> Retrospectives { get; set; }

        public DbSet<UserModel> Users { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BoardModel>()
                .HasRequired(b => b.Retrospective);

            modelBuilder.Entity<PoolModel>()
                .HasRequired(p => p.Board);
        }
    }
}