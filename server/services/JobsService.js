import { dbContext } from '../db/DbContext'
import Car from '../models/Car'
import { BadRequest } from '../utils/Errors'

class JobsService {
  async getAll(query = {}) {
    const jobs = await dbContext.Job.find(query)
    return jobs
  }

  async getById(id) {
    const job = await dbContext.Job.findById(id)
    if (!job) {
      throw new BadRequest('Invalid Id')
    }
    return job
  }

  async create(body) {
    const job = await dbContext.Job.create(body)
    return job
  }

  async edit(body) {
    const job = await dbContext.Job.findByIdAndUpdate(body.id, body, { new: true, runValidators: true })
    if (!job) {
      throw new BadRequest('Invalid Id')
    }
    return job
  }

  async bid(body) {
    let job = await this.getById(body.id)
    if (job.price < body.price) {
      throw new BadRequest('Jobs can only be bid down')
    }
    job = await dbContext.Job.findByIdAndUpdate(body.id, body, { new: true, runValidators: true })
    return job
  }

  async destroy(id) {
    const job = await dbContext.Job.findByIdAndDelete(id)
    if (!job) {
      throw new BadRequest('Invalid Id')
    }
    return job
  }
}
export const jobsService = new JobsService()
