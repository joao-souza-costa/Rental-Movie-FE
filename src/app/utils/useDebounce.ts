let timerId: ReturnType<typeof setTimeout>

export default function useDebounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number = 500
): (...args: Parameters<T>) => void {
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const context = this

    clearTimeout(timerId)
    timerId = setTimeout(() => {
      func.apply(context, args)
    }, delay)
  }
}
