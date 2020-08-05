import {$} from '@core/dom'
import ExcelComment from '@core/ExcelComponent'
import * as actions from '@/redux/actions'
import ActiveRoute from '@core/routes/ActiveRoute'

export default class Header extends ExcelComment {
  static className = 'excel__header'
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    })
    this.$el = $root
    this.store = options.store
  }

  toHTML() {
    return `
      <input type="text" class="input" value="${this.store.getState().title}" />
        <div>
           <div class="button" data-button="delete">
            <i class="material-icons" data-button="delete">delete</i>
          </div>
          <div class="button" data-button="exit">
            <i class="material-icons" data-button="exit">exit_to_app</i>
          </div>
      </div>
    `
  }

  onInput(event) {
    this.$dispatch(actions.changeTitle($(event.target).text()))
  }

  onClick(event) {
    const $target = $(event.target)

    if ($target.data.button === 'delete') {
      const decision = confirm('Вы действительно хотите удалить эту таблицу?')

      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param)
        ActiveRoute.navigate('#dashboard')
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('')
    }
  }
}
