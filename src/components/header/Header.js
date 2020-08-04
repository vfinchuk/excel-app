import {$} from '@core/dom'
import ExcelComment from '@core/ExcelComponent'
import {createHeader} from '@/components/header/header.template'
import * as actions from '@/redux/actions'

export default class Header extends ExcelComment {
  static className = 'excel__header'
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    })
    this.$el = $root
    this.store = options.store
  }

  toHTML() {
    return createHeader(this.store.getState())
  }

  onInput(event) {
    this.$dispatch(actions.changeTitle($(event.target).text()))
  }
}
