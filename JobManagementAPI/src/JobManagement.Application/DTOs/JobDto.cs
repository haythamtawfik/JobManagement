namespace JobManagement.Application.DTOs
{
    public class JobDto
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public List<SubItemDto> SubItems { get; set; }
    }
}
