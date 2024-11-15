namespace JobManagement.Domain.Entities
{
    public class Job
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public List<SubItem> SubItems { get; set; }
    }
}
