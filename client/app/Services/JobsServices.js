import { ProxyState } from '../AppState.js'
import Job from '../Models/Job.js'
import { api } from './AxiosService.js'

class JobsService {
  constructor() {
    this.getAllJobs()
  }

  async createJob(rawJob) {
    console.log(rawJob)
    console.log('creating job step 2')
    const res = await api.post('jobs', rawJob)
    console.log('your new job', res.data)
    console.log('creating job step 3')
    ProxyState.jobs = [...ProxyState.jobs, new Job(rawJob)]
  }

  async getAllJobs() {
    try {
      const res = await api.get('jobs')
      console.log('get all jobs', res.data)
      ProxyState.jobs = res.data.map(h => new Job(h))
    } catch (error) {
      console.error('jobs', error)
    }
  }

  async deleteJob(jobId) {
    try {
      const res = await api.delete('jobs/' + jobId)
      console.log('job delete', res.data)
      ProxyState.jobs = ProxyState.jobs.filter(c => c.id != jobId)
    } catch (error) {
      console.error('Delete job', error)
    }
  }
}

export const jobsService = new JobsService()
