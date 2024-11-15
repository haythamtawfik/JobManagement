using JobManagement.Application.Interfaces;
using JobManagement.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace JobManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JobsController : ControllerBase
    {
        private readonly IJobService _jobService;

        public JobsController(IJobService jobService)
        {
            _jobService = jobService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Job>> GetJobs()
        {
            return Ok(_jobService.GetJobs());
        }

        [HttpPost]
        public ActionResult AddJob([FromBody] Job job)
        {
            if (job == null)
            {
                return BadRequest("Job cannot be null.");
            }
            _jobService.AddJob(job);
            return CreatedAtAction(nameof(GetJobs), new { id = job.Id }, job);
        }
    }
}
