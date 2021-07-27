import { ProxyState } from "../AppState.js";
import { jobsService } from "../Services/JobsServices.js"

function _draw() {
  let template = ''
  ProxyState.jobs.forEach(job => {
    template += job.Template
  })
  document.getElementById('jobs').innerHTML = template
}
export default class JobsController {
  constructor() {
    ProxyState.on('jobs', _draw)
    ProxyState.on('jobs', () => { console.log('new job') })
    _draw()
  }
  async createJob() {
    try {
      event.preventDefault()
      console.log('creating job step 1')
      let form = event.target
      let rawJob = {
        company: form.company.value,
        jobTitle: form.jobTitle.value,
        hours: form.hours.value,
        rate: form.rate.value,
        description: form.description.value,
      }
      await jobsService.createJob(rawJob)
      form.reset()
    } catch (error) {
      console.error(error)
      window.alert(error.message)
    }
    console.log('jobs', ProxyState.jobs)
  }
  deleteJob(jobId) {
    console.log('you are trying to delete a car by the id of', jobId)
    jobsService.deleteJob(jobId)
  }

  bidJob(jobId) {
    console.log('your are bidding on the job with the id of', jobId)
    jobsService.bidJob(jobId)
  }
}
