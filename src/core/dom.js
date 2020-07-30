class Dom {
  constructor(selector) {
    this.$nativeEvent = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$nativeEvent.innerHTML = html
      return this
    }
  }

  clear() {
    this.html('')
    return this
  }

  off(eventType, callback) {
    this.$nativeEvent.removeEventListener(eventType, callback)
  }

  on(eventType, callback) {
    this.$nativeEvent.addEventListener(eventType, callback)
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$nativeEvent
    }
    if (Element.prototype.append) {
      this.$nativeEvent.append(node)
    } else {
      this.$nativeEvent.appendChild(node)
    }
    return this
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
