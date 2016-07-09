namespace SpeedyRetro.Data.Entities
{
    public class Lane
    {
        public int Id { get; set; }

        public int PoolId { get; set; }

        public string Name { get; set; }

        public Pool Pool { get; set; }
    }
}