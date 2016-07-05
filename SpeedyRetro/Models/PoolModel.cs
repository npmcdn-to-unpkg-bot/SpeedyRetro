using System.Collections.Generic;

namespace SpeedyRetro.Models
{
    public class PoolModel
    {
        public int Id { get; set; }

        public BoardModel Board { get; set; }

        public ICollection<LaneModel> Lanes { get; set; }
    }
}