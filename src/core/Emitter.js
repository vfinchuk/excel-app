export default class Emitter {
  constructor() {
    this.listeners = {}
  }

  /**
   * (emit, fire, trigger)
   * @param {string} event
   * @param {args} args
   * @return {boolean}emit
   */
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }

    this.listeners[event].forEach(listener => {
      listener(...args)
    })
    return true
  }

  /**
   * on, listen
   * @param {string} event
   * @param {function} fn
   * @return {function}
   * formula.subscribe('table:select', () => {})
   */
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] = this.listeners[event]
          .filter(listener => listener !== fn)
    }
  }
}

// const emitter = new Emmiter()
// const unsubMyFunction = emitter.
// subscribe('myFunction', data => console.log('MyFunction: ', data))
//
// emitter.emit('myFunction', 'myFunction data') // event not subscribe
//
// emitter
// .emit('myFunction_NOT', 'myFunction data NOT') // event not subscribe
//
// setTimeout(() => {
//   emitter.emit('myFunction', 'myFunction data after 2 sec')
// }, 2000)
//
// setTimeout(() => {
//   unsubMyFunction()
// }, 3000)
//
// setTimeout(() => {
//   emitter.emit('myFunction', 'myFunction data after 6 sec')
// }, 6000)

