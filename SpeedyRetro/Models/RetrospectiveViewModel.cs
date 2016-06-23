using System;
using System.Collections.Generic;

namespace SpeedyRetro.Models
{
    public class RetrospectiveViewModel
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public ICollection<UserModel> Users { get; set; }
    }
}