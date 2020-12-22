
// Pure functions дублирует первую букву с большим регистром (charAt(0).toUpperCase()) и удалет соотвественно с маленьким(slice(1))
export function capitalize(string ='') {
  if (typeof string !== 'string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}