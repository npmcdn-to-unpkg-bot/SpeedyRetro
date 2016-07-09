using System.Collections.Generic;

namespace SpeedyRetro.Data.Entities
{
    public class Pool
    {
        public int Id { get; set; }

        public int? BoardId { get; set; }

        public string Name { get; set; }

        public virtual Board Board { get; set; }

        public ICollection<Lane> Lanes { get; set; }
    }
}