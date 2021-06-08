export function saveToken () {
  const reg = new RegExp('(^|)' + 'token' + '=([^;]*)(;|$)')
  const arr = document.cookie.match(reg)
  if (arr) {
    localStorage.setItem('token', arr[2])
  }
}

export function getToken () {
  return localStorage.getItem('token') || ''
}
