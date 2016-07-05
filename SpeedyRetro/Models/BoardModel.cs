using System.Collections.Generic;

namespace SpeedyRetro.Models
{
    public class BoardModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public PoolModel Pool { get; set; }

        public ICollection<CommentModel> Comments { get; set; }
    }
}