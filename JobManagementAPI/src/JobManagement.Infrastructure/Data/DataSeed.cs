using JobManagement.Domain.Entities;
using JobManagement.Domain.Enums;

namespace JobManagement.Infrastructure.Data
{
    public static class DataSeed
    {
        public static List<Job> GetJobs()
        {
            return new List<Job>
            {
                new Job
                {
                    Id = "1",
                    Title = "Job 1",
                    Description = "Alspec Product",
                    SubItems = new List<SubItem>
                    {
                        new SubItem { ItemId = "1", Title = "Easy task", Description = "A Really easy task", Status = Status.Pending },
                        new SubItem { ItemId = "2", Title = "Another easy Task", Description = "Another easy Task description", Status = Status.InProgress }
                    }
                },
                new Job
                {
                    Id = "2",
                    Title = "Job 2",
                    Description = "Another Job Description",
                    SubItems = new List<SubItem>
                    {
                        new SubItem { ItemId = "3", Title = "Different task", Description = "A different sub-item", Status = Status.Completed }
                    }
                }
            };
        }
    }
}
