using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SpeedyRetro.Models
{
    public class PoolModel
    {
        [Key]
        public int Id { get; set; }

        //public int BoardId { get; set; }

        public string Name { get; set; }

        //[ForeignKey("Id")]
        public virtual BoardModel Board { get; set; }

        public ICollection<LaneModel> Lanes { get; set; }
    }
}