using JobManagement.Application.Services;
using JobManagement.Domain.Entities;
using JobManagement.Infrastructure.Data;

namespace JobManagement.Tests.Application.Services
{
    public class JobServiceTests
    {
        private readonly JobService _jobService;

        public JobServiceTests()
        {
            _jobService = new JobService();
        }

        [Fact]
        public void GetJobs_ShouldReturnSeededJobs()
        {
            // Act
            var jobs = _jobService.GetJobs();

            // Assert
            Assert.NotNull(jobs);
            Assert.NotEmpty(jobs);
            Assert.Equal(DataSeed.GetJobs().Count, jobs.Count());
        }

        [Fact]
        public void AddJob_ShouldAddJobToList()
        {
            // Arrange
            var newJob = new Job
            {
                Id = "3",
                Title = "New Job",
                Description = "A new job description",
                SubItems = new List<SubItem>
                {
                    new SubItem { ItemId = "1", Title = "Sub-item 1", Description = "Sub-item description", Status = Domain.Enums.Status.Pending }
                }
            };

            // Act
            _jobService.AddJob(newJob);

            // Assert
            var jobs = _jobService.GetJobs();
            Assert.Contains(jobs, j => j.Id == "3");
        }

        [Fact]
        public void AddJob_ShouldThrowExceptionForInvalidJob()
        {
            // Act & Assert
            Assert.Throws<ArgumentException>(() => _jobService.AddJob(null));
        }
    }
}
