import {rootReducer} from '@/redux/rootReducer'

export default class Store {
  constructor(rootReducer, initialState = {}) {
    this.state = rootReducer({...initialState}, {type: '__INIT__'})
    this.subscribers = []
  }

  subscribe(fn) {
    this.subscribers.push(fn)
    return {
      unsubscribe() {
        if (this.subscribers) {
          this.subscribers = this.subscribers
              .filter(subscribe => {
                return subscribe !== fn
              })
        }
      }
    }
  }

  dispatch(action) {
    this.state = rootReducer(this.state, action)
    this.subscribers.forEach(subscribe => subscribe(this.state))
  }

  getState() {
    return JSON.parse(JSON.stringify(this.state))
  }
}

