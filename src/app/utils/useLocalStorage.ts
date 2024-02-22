export default (key: string) => ({
  get() {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : value
  },
  set(value: unknown) {
    return localStorage.setItem(key, JSON.stringify(value))
  }
})
