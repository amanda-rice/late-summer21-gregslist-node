export default class Job {
  constructor({ rate, jobTitle, hours, description, company, id }) {
    this.rate = rate
    this.jobTitle = jobTitle
    this.hours = hours
    this.description = description
    this.company = company
    this.id = id
  }

  get Template() {
    return `
    <div class="card">
      <div class="card-body">
          <div class="p-3">
              <div class="text-center">
                  <p><b>${this.jobTitle}</b></p>
              </div>
              <p>${this.hours} hours per week</p>
              <p>Description: ${this.description}</p>
              <p>${this.company}</p>
              <p><em>$${this.rate}/hour</em></p>
              <button class="btn btn-warning btn-block shadow-sm" onclick="app.jobsController.deleteJob('${this.id}')"> delete </button>
          </div>
      </div>
    </div>
  `
  }
}