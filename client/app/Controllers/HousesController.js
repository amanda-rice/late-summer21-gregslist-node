import { ProxyState } from "../AppState.js";
import { housesService } from "../Services/HousesServices.js"

function _draw() {
  let template = ''
  ProxyState.houses.forEach(house => {
    template += house.Template
  })
  document.getElementById('houses').innerHTML = template
}
export default class HousesController {
  constructor() {
    ProxyState.on('houses', _draw)
    ProxyState.on('houses', () => { console.log('new house') })
    _draw()
  }
  async createHouse() {
    try {
      event.preventDefault()
      console.log('creating car step 1')
      let form = event.target
      let rawHouse = {
        levels: form.levels.value,
        bathrooms: form.bathrooms.value,
        price: form.price.value,
        year: form.year.value,
        bedrooms: form.bedrooms.value,
        imgUrl: form.imgUrl.value,
      }
      await housesService.createHouse(rawHouse)
      form.reset()
    } catch (error) {
      console.error(error)
      window.alert(error.message)
    }
    console.log('houses', ProxyState.houses)
  }
  deleteHouse(houseId) {
    console.log('you are trying to delete a car by the id of', houseId)
    housesService.deleteHouse(houseId)
  }

  bidHouse(houseId) {
    console.log('your are bidding on the house with the id of', houseId)
    housesService.bidHouse(houseId)
  }
}
