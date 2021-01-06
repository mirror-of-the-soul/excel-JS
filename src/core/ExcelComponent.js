import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || ''
    this.emitter = options.emitter
    this.store = options.store
    this.unsubscribers = []
    this.storeSub = null

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

  $subscribe(fn) {
    this.storeSub = this.store.subscribe(fn)
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
    this.storeSub.unsubscribers()
  }
}