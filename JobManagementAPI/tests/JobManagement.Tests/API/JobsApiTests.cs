using JobManagement.API.Controllers;
using JobManagement.Application.Interfaces;
using JobManagement.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace JobManagement.Tests.API
{
    public class JobsControllerTests
    {
        private readonly JobsController _controller;
        private readonly Mock<IJobService> _jobServiceMock;

        public JobsControllerTests()
        {
            // Mock JobService
            _jobServiceMock = new Mock<IJobService>();
            _controller = new JobsController(_jobServiceMock.Object);
        }

        [Fact]
        public void GetJobs_ShouldReturnOkResultWithJobs()
        {
            // Arrange
            var jobs = new List<Job>
            {
                new Job { Id = "1", Title = "Test Job", Description = "Test Description", SubItems = new List<SubItem>() }
            };
            _jobServiceMock.Setup(s => s.GetJobs()).Returns(jobs);

            // Act
            var result = _controller.GetJobs();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnValue = Assert.IsType<List<Job>>(okResult.Value);
            Assert.Single(returnValue);
        }

        [Fact]
        public void AddJob_ShouldReturnCreatedAtActionResult()
        {
            // Arrange
            var newJob = new Job { Id = "2", Title = "New Job", Description = "New Job Description", SubItems = new List<SubItem>() };

            // Act
            var result = _controller.AddJob(newJob);

            // Assert
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result);
            Assert.Equal("GetJobs", createdAtActionResult.ActionName);
            var returnValue = Assert.IsType<Job>(createdAtActionResult.Value);
            Assert.Equal("2", returnValue.Id);
        }

        [Fact]
        public void AddJob_ShouldReturnBadRequestForInvalidJob()
        {
            // Act
            var result = _controller.AddJob(null);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }
    }
}
