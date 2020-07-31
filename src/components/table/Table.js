import ExcelComment from '@/core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table.resize'
import {shouldResize} from '@/components/table/table.functions'
import TableSelection from '@/components/table/TableSelection'

export default class Table extends ExcelComment {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown']
    });

    this.$el = $root
  }

  toHTML() {
    return createTable()
  }

  init() {
    super.init()

    this.selection = new TableSelection()
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    }
  }
}
