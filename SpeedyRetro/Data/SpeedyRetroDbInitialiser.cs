using SpeedyRetro.Data.Entities;
using System.Collections.Generic;
using System.Data.Entity;

namespace SpeedyRetro.Data
{
    public class SpeedyRetroDbInitialiser : DropCreateDatabaseAlways<SpeedyRetroDbContext>
    {
        protected override void Seed(SpeedyRetroDbContext context)
        {
            var lanes = new List<Lane>();

            lanes.Add(new Lane { Id = 1, Name = "Start" });

            lanes.Add(new Lane { Id = 2, Name = "Good" });

            lanes.Add(new Lane { Id = 3, Name = "Bad" });

            lanes.Add(new Lane { Id = 4, Name = "Action Point" });

            var pool = new Pool { Id = 1, Name = "Default Pool", Lanes = lanes };

            context.Pools.Add(pool);

            base.Seed(context);
        }
    }
}