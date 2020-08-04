import {$} from '@core/dom';

export function resizeHandler($root, event) {
  return new Promise(resolve => {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const cords = $parent.getCords()
    const type = $resizer.data.resize
    const sideProp = type === 'col' ? 'bottom' : 'right'
    let deltaX
    let deltaY
    let value

    $resizer.css({
      opacity: 1,
      [sideProp]: '-5000px'
    })

    document.onmousemove = e => {
      if (type === 'col') {
        deltaX = e.pageX - cords.right

        $resizer.css({
          right: -deltaX + 'px'
        })
      } else {
        deltaY = e.clientY - cords.bottom

        $resizer.css({
          bottom: -deltaY + 'px',
          left: 0
        })
      }
    }

    document.onmouseup = (e) => {
      document.onmousemove = null
      document.onmouseup = null

      if (type === 'col') {
        value = cords.width + deltaX
        $parent.css({width: value + `px`})
        $root
            .findAll(`[data-col="${$parent.data.col}"]`)
            .forEach(el => el.style.width = `${value}px`)
      } else {
        value = cords.height + deltaY
        $parent.css({height: value + `px`})
      }

      resolve({
        value,
        type,
        id: $parent.data[type]
      })

      $resizer.css({
        right: 0,
        opacity: 0,
        bottom: 0
      })
    }
  })
}
