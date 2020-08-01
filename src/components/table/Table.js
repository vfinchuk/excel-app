import ExcelComment from '@/core/ExcelComponent'
import {$} from '@/core/dom'
import TableSelection from '@/components/table/TableSelection'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table.resize'
import {
  shouldResize,
  isCell,
  matrix,
  nextSelector
} from '@/components/table/table.functions'

export default class Table extends ExcelComment {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    });

    this.$el = $root
  }

  toHTML() {
    return createTable()
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    this.selectCell(this.$root.find('[data-id="0:0"]'))

    this.$on('formula:input', text => {
      this.selection.current.text(text)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$dispatch('table:select', $cell)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    } else if (isCell(event)) {
      const $target = $(event.target)

      if (event.shiftKey) {
        const $cells = matrix(this.selection.current, $target).map(id => {
          return this.$root.find(`[data-id="${id}"]`)
        })
        this.selection.selectGroup($cells)
      } else {
        this.selection.select($target)
        this.selectCell($target)
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown'
    ]

    const {key} = event

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))

      this.selectCell($next)
    }
  }

  onInput(event) {
    this.$dispatch('table:input', $(event.target))
  }
}
