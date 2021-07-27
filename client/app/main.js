import CarsController from './Controllers/CarsController.js'
import HousesController from './Controllers/HousesController.js'
import JobsController from './Controllers/JobsController.js'

class App {
  housesController = new HousesController()
  jobsController = new JobsController()
  carsController = new CarsController()
}

window.app = new App()
