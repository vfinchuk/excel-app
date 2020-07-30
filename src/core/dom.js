class Dom {
  /**
   * Class for manipulate DOM nodes
   * @param {string|node} selector
   */
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }

  /**
   * Dataset array getter
   * @return {DOMStringMap}
   */
  get data() {
    return this.$el.dataset
  }

  /**
   * Inner html
   * @param {string} html
   * @return {Dom}
   */
  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
  }

  /**
   * Clear node
   * @return {Dom}
   */
  clear() {
    this.html('')
    return this
  }

  /**
   * Remove event listener
   * @param {event} eventType
   * @param {callback} callback
   */
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  /**
   * Add event listener
   * @param {event} eventType
   * @param {callback} callback
   */
  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  /**
   * Append node
   * @param  {node} node
   * @return {Dom}
   */
  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    return this
  }

  /**
   * Return closet node by selector
   * @param {string} selector
   * @return {Dom}
   */
  closest(selector) {
    return $(this.$el.closest(selector))
  }

  /**
   * Element coordinates object
   * @param {Dom} node
   * @return {DOMRect}
   */
  getCords() {
    return this.$el.getBoundingClientRect()
  }

  /**
   * Selectors collection
   * @param {selector} selector
   * @return {NodeList}
   */
  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  /**
   * Find node item
   * @param {selector} selector
   * @return {node}
   */
  find(selector) {
    return this.$el.querySelector(selector)
  }

  /**
   * Add inline styles
   * @param {Object} styles
   */
  css(styles = {}) {
    Object
        .keys(styles)
        .forEach(key => this.$el.style[key] = styles[key])
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
