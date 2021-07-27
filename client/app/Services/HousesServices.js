import { ProxyState } from '../AppState.js'
import House from '../Models/House.js'
import { api } from './AxiosService.js'

class HousesService {
  constructor() {
    this.getAllHouses()
  }

  async createHouse(rawHouse) {
    console.log(rawHouse)
    console.log('creating house step 2')
    const res = await api.post('houses', rawHouse)
    console.log('your new house', res.data)
    console.log('creating house step 3')
    ProxyState.houses = [...ProxyState.houses, new House(rawHouse)]
  }

  async getAllHouses() {
    try {
      const res = await api.get('houses')
      console.log('get all houses', res.data)
      ProxyState.houses = res.data.map(h => new House(h))
    } catch (error) {
      console.error('houses', error)
    }
  }

  async bidHouse(houseId) {
    try {
      const foundHouse = ProxyState.houses.find(c => c.id == houseId)
      foundHouse.price += 100
      const res = await api.put('houses/' + houseId, foundHouse)
      console.log('updated house', res.data)

      ProxyState.houses = ProxyState.houses
    } catch (error) {
      console.error(error)
    }
  }

  async deleteHouse(houseId) {
    try {
      const res = await api.delete('houses/' + houseId)
      console.log('house delete', res.data)
      ProxyState.houses = ProxyState.houses.filter(c => c.id != houseId)
    } catch (error) {
      console.error('Delete house', error)
    }
  }
}

export const housesService = new HousesService()
