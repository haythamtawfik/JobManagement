using JobManagement.Application.Interfaces;
using JobManagement.Domain.Entities;
using JobManagement.Infrastructure.Data;

namespace JobManagement.Application.Services
{
    public class JobService : IJobService
    {
        private readonly List<Job> _jobs;

        public JobService()
        {
            _jobs = DataSeed.GetJobs();
        }

        public IEnumerable<Job> GetJobs() => _jobs;

        public void AddJob(Job job)
        {
            if (job == null || string.IsNullOrWhiteSpace(job.Id)) throw new ArgumentException("Invalid job data");
            _jobs.Add(job);
        }
    }
}
