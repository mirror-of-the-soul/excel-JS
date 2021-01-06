export class Emmiter {
  constructor() {
    this.listeners= {}
  }

  // dispatch, fire, trigger
  // уведомляем слушателей если они есть
  // table.emit('table:select', {a: 1})
  emit(event, ...args) {
    if (!Array.isArray( this.listeners[event])) {
      return false
    }
    this.listeners[event].forEach(listener => {
      listener(...args)
    })
    return true
  }
  // on, listen
  // подписываемся на уведомления литбо добавляем нового слушателя
  // formula.subscribe('table:select', () => {} )
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] =
        this.listeners[event].filter(listener => listener !== fn)
    }
  }
}


// Example
// const emitter = new Emmiter()
//
// const unsub = emitter.subscribe('evgeny', data => console.log('Sub:', data))
// emitter.emit('123', 42)
//
// setTimeout(() => {
//   emitter.emit('evgeny', 'after 2 seconds')
// }, 2000)
//
// setTimeout(() => {
//   unsub()
// }, 3000)
//
// setTimeout(() => {
//   emitter.emit('evgeny', 'after 4 seconds')
// }, 4000)
