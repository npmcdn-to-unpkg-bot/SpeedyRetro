namespace SpeedyRetro.Models
{
    public class CommentModel
    {
        public int Id { get; set; }

        public string Text { get; set; }

        public LaneModel Lane { get; set; }
    }
}