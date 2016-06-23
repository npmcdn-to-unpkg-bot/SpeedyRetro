using System.Data.Entity;

namespace SpeedyRetro.Models
{
    public class SpeedyRetroDbContext : DbContext
    {
        public SpeedyRetroDbContext() : base("SpeedyRetroConnection")
        {

        }

        public DbSet<RetrospectiveViewModel> Retrospectives { get; set; }

        public DbSet<UserModel> Users { get; set; }

        //protected override void OnModelCreating(DbModelBuilder modelBuilder)
        //{

        //    modelBuilder.Entity<UserModel>()
        //                .HasMany<RetrospectiveViewModel>(user => user.Retrospectives)
        //                .WithMany(retro => retro.Users)
        //                .Map(cs =>
        //                {
        //                    cs.MapLeftKey("StudentRefId");
        //                    cs.MapRightKey("CourseRefId");
        //                    cs.ToTable("StudentCourse");
        //                });

        //}

    }
}