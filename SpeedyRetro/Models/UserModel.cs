using System;

namespace SpeedyRetro.Models
{
    public class UserModel
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public RetrospectiveViewModel Retrospective { get; set; }
    }
}
