import {capitalize} from '@core/utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided for DomListener!')
    }
    this.$root= $root
    this.listeners = listeners
  }
  initDomListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      if (!this[method]) {
        const name = this.name || ''
        throw new Error(`Method ${method} is not complimented in ${name} Component `)
      }
      this[method] = this[method].bind(this)
      // То же самое что и addEventListener
      this.$root.on(listener, this[method])
    })
  }
  removeDomListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      this.$root.off(listener, this[method])
    })
  }
}
// pure function, которая добавляет префикс on перед сщбытием listener (onInput, onClick)
function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}
