using JobManagement.Domain.Entities;

namespace JobManagement.Application.Interfaces
{
    public interface IJobService
    {
        IEnumerable<Job> GetJobs();
        void AddJob(Job job);
    }
}
