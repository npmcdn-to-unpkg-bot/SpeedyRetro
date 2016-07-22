using System.Collections.Generic;

namespace SpeedyRetro.Data.Entities
{
    public class Lane
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public ICollection<Pool> Pools { get; set; }
    }
}