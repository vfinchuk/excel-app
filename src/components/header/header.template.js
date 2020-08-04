function toButton(button) {
  return `
    <div class="button">
      <i class="material-icons">${button.icon}</i>
    </div>
  `
}

export function createHeader(state) {
  const buttons = [
    {icon: 'delete'},
    {icon: 'exit_to_app'}
  ]
  return `
    <input type="text" class="input" value="${state.title}" />
      <div>
        ${buttons.map(toButton)}
      </div>
  `
}
