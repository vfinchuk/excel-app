export default class TableSelection {
  constructor() {
    this.group = []
  }

  select($el) {
    this.group.push($el)
  }

  selectGroup() {
    console.log('selectGroup')
  }
}
