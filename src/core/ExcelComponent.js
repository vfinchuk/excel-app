import DomListener from '@core/Domlistener'

export default class ExcelComponent extends DomListener {
  constructor($root, options = []) {
    super($root, options.listeners);

    this.name = options.name || ''
  }

  ToHTML() {
    return ''
  }

  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
  }
}
