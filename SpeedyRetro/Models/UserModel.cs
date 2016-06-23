using System;
using System.Collections.Generic;

namespace SpeedyRetro.Models
{
    public class UserModel
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public ICollection<RetrospectiveViewModel> Retrospectives { get; set; }
    }
}
