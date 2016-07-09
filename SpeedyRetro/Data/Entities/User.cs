using System;
using System.Collections.Generic;

namespace SpeedyRetro.Data.Entities
{
    public class User
    {
        public int Id { get; set; }

        public Guid Guid { get; set; }

        public string Name { get; set; }

        public ICollection<Retrospective> Retrospectives { get; set; }

        public ICollection<Comment> Comments { get; set; }
    }
}
