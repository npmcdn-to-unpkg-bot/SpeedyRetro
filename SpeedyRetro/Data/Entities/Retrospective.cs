using System;
using System.Collections.Generic;

namespace SpeedyRetro.Data.Entities
{
    public class Retrospective
    {
        public int Id { get; set; }

        public Guid Guid { get; set; }

        public string Name { get; set; }

        public int BoardId { get; set; }

        public virtual Board Board { get; set; }

        public ICollection<User> Users { get; set; }
    }
}