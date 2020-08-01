import ExcelComment from '@/core/ExcelComponent'

export default class Formula extends ExcelComment {
  static className = 'excel__formula'
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    })
    this.$el = $root
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `
  }

  init() {
    super.init();
    this.formula = this.$el.find('#formula')
    this.$on('table:select', $cell => this.formula.text($cell.text()))
    this.$on('table:input', $formula => this.formula.text($formula.text()))
  }

  onInput(event) {
    const text = event.target.textContent
    console.log(text)
    this.$dispatch('formula:input', text)
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault()
      this.$dispatch('formula:done')
    }
  }
}

