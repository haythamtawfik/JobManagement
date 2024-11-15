using JobManagement.Domain.Enums;

namespace JobManagement.Domain.Entities
{
    public class SubItem
    {
        public string ItemId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Status Status { get; set; }
    }
}
