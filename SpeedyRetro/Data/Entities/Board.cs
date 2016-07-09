using System.Collections.Generic;

namespace SpeedyRetro.Data.Entities
{
    public class Board
    {
        public int Id { get; set; }

        public int? RetrospectiveId { get; set; }

        public int PoolId { get; set; }

        public string Name { get; set; }

        public virtual Retrospective Retrospective { get; set; }

        public virtual Pool Pool { get; set; }

        public ICollection<Comment> Comments { get; set; }
    }
}