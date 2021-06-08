const storage = {
  read (key) {
    return JSON.parse(localStorage.getItem(key))
  },
  write (key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  remove (key) {
    localStorage.removeItem(key)
  }
}

module.exports = storage
