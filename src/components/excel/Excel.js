import {$} from '@core/dom';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector)
    this.components = options.components || []
  }

  getRoot() {
    const $root = $.create('div', 'excel')

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el)
      // // ---DEBUG
      // if (component.name) {
      //   window['c' + component.name] = component
      // }
      // // ---
      $el.html(component.toHtml())
      $root.append($el)
      return component
    })

    return $root
  }


  render() {
    // 4 типа статических строк,который может принимать метод insertAdjacentHTML:'afterbegin','afterend', 'beforeend', 'beforebegin'
    // this.$el.insertAdjacentHTML('afterbegin', `<h1>Test</h1>`)
    // 2 способ через node
    this.$el.append(this.getRoot())

    this.components.forEach(component => component.init())
  }
}