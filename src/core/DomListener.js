import {capitalize} from '@core/utils'

export default class DomListener {
  constructor($root, listeners = []) {
    this.listeners = listeners;
    if (!$root) {
      throw new Error('$root is required')
    }
    this.$root = $root
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      if (!this[method]) {
        throw new Error(
            `Method ${method} is not implemented in ${this.name} Component`
        )
      }
      this[method] = this[method].bind(this)
      this.$root.on(listener, this[method])
    })
  }

  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      this.$root.off(listener, this[method])
    })
  }
}

function getMethodName(eventName) {
  return `on${capitalize(eventName)}`
}
