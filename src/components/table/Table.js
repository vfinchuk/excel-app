import ExcelComment from '@/core/ExcelComponent'
import {createTable} from './table.template'

export default class Table extends ExcelComment {
  static className = 'excel__table'
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['click', 'input']
    });
  }
  toHTML() {
    return createTable()
  }

  onClick(event) {
    console.log(event);
  }

  onInput(event) {
    console.log(event);
  }
}
