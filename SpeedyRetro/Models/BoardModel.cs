using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SpeedyRetro.Models
{
    public class BoardModel
    {
        [Key]
        public int Id { get; set; }

        public int RetrospectiveId { get; set; }

        //public int PoolId { get; set; }

        public string Name { get; set; }

        //[ForeignKey("RetrospectiveId")]
        public virtual RetrospectiveModel Retrospective { get; set; }

        //[ForeignKey("Id")]
        public virtual PoolModel Pool { get; set; }

        public ICollection<CommentModel> Comments { get; set; }
    }
}