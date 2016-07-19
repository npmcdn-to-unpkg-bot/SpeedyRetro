using System.Data.Entity;

namespace SpeedyRetro.Data.Entities
{
    public class SpeedyRetroDbContext : DbContext
    {
        public SpeedyRetroDbContext() : base("SpeedyRetroConnection")
        {
            Database.SetInitializer(new SpeedyRetroDbInitialiser());
        }

        public DbSet<Board> Boards { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public DbSet<Lane> Lanes { get; set; }

        public DbSet<Pool> Pools { get; set; }

        public DbSet<Retrospective> Retrospectives { get; set; }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Retrospective>()
                .HasRequired(r => r.Board);

            modelBuilder.Entity<Board>()
                .HasRequired(b => b.Pool);
        }
    }
}