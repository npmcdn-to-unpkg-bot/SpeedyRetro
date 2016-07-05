namespace SpeedyRetro.Models
{
    public class LaneModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public PoolModel Pool { get; set; }
    }
}