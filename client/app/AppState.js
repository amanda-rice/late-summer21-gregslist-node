import House from './Models/House.js'
import Job from './Models/Job.js'
import { EventEmitter } from './Utils/EventEmitter.js'
import { isValidProp } from './Utils/isValidProp.js'
import Car from './Models/Car.js'

class AppState extends EventEmitter {
  /** @type {Value[]} */
  cars = [
    new Car({
      make: 'Ford',
      model: 'Pinto',
      year: 1987,
      price: 1200,
      description: 'This Car is HOT!',
      imgUrl: 'https://blog.automedicsafrica.com/wp-content/uploads/2015/08/Impala-vs-Pinto-750x547.jpg'
    }),
    new Car({
      make: 'VW',
      model: 'Gremlin',
      year: 1988,
      price: 3400,
      description: 'Lime Green! You gonna love it',
      imgUrl: 'https://static1.hotcarsimages.com/wordpress/wp-content/uploads/2020/07/Gremlin-X.jpg'
    })
  ]

  houses = [
    new House({
      price: 500000,
      street: '2123 W Boise Ave',
      squareFootage: 1500,
      bedrooms: 3,
      baths: 1,
      year: 1910,
      img: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
    })
  ]

  jobs = [
    new Job({
      salary: 70000,
      title: 'GIS Specialist',
      duties: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda deleniti dignissimos ex veritatis harum minima vel ipsa expedita recusandae? Aliquid, delectus quibusdam! Ut cumque veritatis dolorum quisquam velit nostrum minima?',
      education: 'Bachelor of Science',
      company: 'State of Idaho'
    })
  ]
}

export const ProxyState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
