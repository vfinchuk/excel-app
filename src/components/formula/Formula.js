import ExcelComment from '@/core/ExcelComponent'

export default class Formula extends ExcelComment {
  static className = 'excel__formula'
  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click']
    });
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `
  }

  onInput(event) {
    console.log(`Formula event onInput: ${this.$root}`, event)
  }

  onClick(event) {
    console.log(`Formula event onClick: ${this.$root}`, event)
  }
}
