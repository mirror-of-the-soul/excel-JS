import {$} from '@core/dom';
import {Emmiter} from '@core/Emmiter';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector)
    this.components = options.components || []
    this.store = options.store
    this.emitter = new Emmiter()
  }

  getRoot() {
    const $root = $.create('div', 'excel')

    const componentOptions = {
      emitter: this.emitter,
      store: this.store
    }

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el, componentOptions)
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
  destroy() {
    this.components.forEach(component => component.destroy())
  }
}