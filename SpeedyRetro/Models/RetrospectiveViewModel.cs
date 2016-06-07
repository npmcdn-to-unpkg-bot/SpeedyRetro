using System;

namespace SpeedyRetro.Models
{
    public class RetrospectiveViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; internal set; }
    }
}