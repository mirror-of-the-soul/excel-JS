import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || ''
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.store = options.store
    this.unsubscribers = []

    this.prepare()
  }
  // настраиваем компонент до init
  prepare() {

  }

  // Возвращает шаблон компонента
  toHtml() {
    return ''
  }
  // уведомляем слушателей про событие
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }
  // подписка на событие event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }
  // в этот метод приходя только те изменения по тем полям, на которые мы подписались
  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  // инициализируем компонент
  // добавляем DOM слушателей
  init() {
    this.initDomListeners()
  }

  // удаляем компонент
  // чистим слушатели
  destroy() {
    this.removeDomListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}