import {$} from '@core/dom';

export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const cords = $parent.getCords()
  const type = $resizer.data.resize
  const sideProp = type === 'col' ? 'bottom' : 'right'
  let deltaX
  let deltaY

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
      deltaY = e.pageY - cords.bottom

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
      const width = cords.width + deltaX
      $parent.css({width: width + `px`})
      $root
          .findAll(`[data-col="${$parent.data.col}"]`)
          .forEach(el => el.style.width = `${width}px`)
    } else {
      const height = cords.height + deltaY
      $parent.css({height: height + `px`})
    }


    $resizer.css({
      right: 0,
      opacity: 0,
      bottom: 0
    })
  }
}
