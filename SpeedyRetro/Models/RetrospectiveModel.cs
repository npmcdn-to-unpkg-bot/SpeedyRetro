using System;
using System.Collections.Generic;

namespace SpeedyRetro.Models
{
    public class RetrospectiveModel
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public int BoardId { get; set; }

        //[ForeignKey("BoardId")]
        public virtual BoardModel Board { get; set; }

        public ICollection<UserModel> Users { get; set; }
    }
}