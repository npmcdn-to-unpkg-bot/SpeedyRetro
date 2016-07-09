namespace SpeedyRetro.Data.Entities
{
    public class Comment
    {
        public int Id { get; set; }

        public int LaneId { get; set; }

        public int UserId { get; set; }

        public int BoardId { get; set; }

        public string Message { get; set; }

        public virtual Lane Lane { get; set; }

        public virtual User User { get; set; }

        public virtual Board Board { get; set; }
    }
}