using System.Data.Entity;

namespace SpeedyRetro.Models
{
    public class SpeedyRetroDbContext : DbContext
    {
        public SpeedyRetroDbContext() : base("SpeedyRetroConnection")
        {

        }

        public DbSet<RetrospectiveViewModel> Retrospectives { get; set; }
    }
}