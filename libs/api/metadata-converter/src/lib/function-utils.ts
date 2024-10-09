export type ChainableFunction<T, U> = (input: T) => U

export function pipe(): ChainableFunction<void, void>
export function pipe<U, V>(
  fn1: ChainableFunction<U, V>
): ChainableFunction<U, V>
export function pipe<U, V, W>(
  fn1: ChainableFunction<U, V>,
  fn2: ChainableFunction<V, W>
): ChainableFunction<U, W>
export function pipe<U, V, W, X>(
  fn1: ChainableFunction<U, V>,
  fn2: ChainableFunction<V, W>,
  fn3: ChainableFunction<W, X>
): ChainableFunction<U, X>
export function pipe<U, V, W, X, Y>(
  fn1: ChainableFunction<U, V>,
  fn2: ChainableFunction<V, W>,
  fn3: ChainableFunction<W, X>,
  fn4: ChainableFunction<X, Y>
): ChainableFunction<U, Y>
export function pipe<U, V, W, X, Y, Z>(
  fn1: ChainableFunction<U, V>,
  fn2: ChainableFunction<V, W>,
  fn3: ChainableFunction<W, X>,
  fn4: ChainableFunction<X, Y>,
  fn5: ChainableFunction<Y, Z>
): ChainableFunction<U, Z>
export function pipe<U, V, W, X, Y, Z, A>(
  fn1: ChainableFunction<U, V>,
  fn2: ChainableFunction<V, W>,
  fn3: ChainableFunction<W, X>,
  fn4: ChainableFunction<X, Y>,
  fn5: ChainableFunction<Y, Z>,
  fn6: ChainableFunction<Z, A>
): ChainableFunction<U, A>
export function pipe<U, V, W, X, Y, Z, A, B>(
  fn1: ChainableFunction<U, V>,
  fn2: ChainableFunction<V, W>,
  fn3: ChainableFunction<W, X>,
  fn4: ChainableFunction<X, Y>,
  fn5: ChainableFunction<Y, Z>,
  fn6: ChainableFunction<Z, A>,
  fn7: ChainableFunction<A, B>
): ChainableFunction<U, B>
export function pipe<U, V, W, X, Y, Z, A, B, C>(
  fn1: ChainableFunction<U, V>,
  fn2: ChainableFunction<V, W>,
  fn3: ChainableFunction<W, X>,
  fn4: ChainableFunction<X, Y>,
  fn5: ChainableFunction<Y, Z>,
  fn6: ChainableFunction<Z, A>,
  fn7: ChainableFunction<A, B>,
  fn8: ChainableFunction<B, C>
): ChainableFunction<U, C>
export function pipe<U, V, W, X, Y, Z, A, B, C, D>(
  fn1: ChainableFunction<U, V>,
  fn2: ChainableFunction<V, W>,
  fn3: ChainableFunction<W, X>,
  fn4: ChainableFunction<X, Y>,
  fn5: ChainableFunction<Y, Z>,
  fn6: ChainableFunction<Z, A>,
  fn7: ChainableFunction<A, B>,
  fn8: ChainableFunction<B, C>,
  fn9: ChainableFunction<C, D>
): ChainableFunction<U, D>
export function pipe<U, V, W, X, Y, Z, A, B, C, D, E>(
  fn1: ChainableFunction<U, V>,
  fn2: ChainableFunction<V, W>,
  fn3: ChainableFunction<W, X>,
  fn4: ChainableFunction<X, Y>,
  fn5: ChainableFunction<Y, Z>,
  fn6: ChainableFunction<Z, A>,
  fn7: ChainableFunction<A, B>,
  fn8: ChainableFunction<B, C>,
  fn9: ChainableFunction<C, D>,
  fn10: ChainableFunction<D, E>
): ChainableFunction<U, E>
export function pipe(
  ...fns: Array<ChainableFunction<unknown, unknown>>
): ChainableFunction<unknown, unknown> {
  return (value) => fns.reduce((prev, curr) => curr(prev), value)
}

export function map<U, V>(mapper: (el: U) => V) {
  return (input: U) => mapper(input)
}

export function mapArray<U, V>(mapper: (el: U, index: number) => V) {
  return (input: Array<U>) => input.map(mapper)
}

export function filterArray<U>(filter: (el: U) => boolean) {
  return (input: Array<U>) => input.filter(filter)
}

export function flattenArray<U>() {
  return (input: Array<U>) => input.flat()
}

export function getAtIndex<U>(index: number) {
  return (input: Array<U>) => (input.length > index ? input[index] : null)
}

export function fallback<U, V>(
  ...fns: Array<ChainableFunction<U, V>>
): ChainableFunction<U, V> {
  return (value: U) => {
    for (let i = 0; i < fns.length; i++) {
      const result = fns[i](value)
      if (result !== null) {
        return result
      }
    }
    return null
  }
}

export function combine<U, V, W>(
  fn1: ChainableFunction<U, V>,
  fn2: ChainableFunction<U, W>
): ChainableFunction<U, [V, W]>
export function combine<U, V, W, X>(
  fn1: ChainableFunction<U, V>,
  fn2: ChainableFunction<U, W>,
  fn3: ChainableFunction<U, X>
): ChainableFunction<U, [V, W, X]>
export function combine<U, V, W, X, Y>(
  fn1: ChainableFunction<U, V>,
  fn2: ChainableFunction<U, W>,
  fn3: ChainableFunction<U, X>,
  fn4: ChainableFunction<U, Y>
): ChainableFunction<U, [V, W, X, Y]>
export function combine<U, V, W, X, Y, Z>(
  fn1: ChainableFunction<U, V>,
  fn2: ChainableFunction<U, W>,
  fn3: ChainableFunction<U, X>,
  fn4: ChainableFunction<U, Y>,
  fn5: ChainableFunction<U, Z>
): ChainableFunction<U, [V, W, X, Y, Z]>
export function combine<U, V, W, X, Y, Z, A>(
  fn1: ChainableFunction<U, V>,
  fn2: ChainableFunction<U, W>,
  fn3: ChainableFunction<U, X>,
  fn4: ChainableFunction<U, Y>,
  fn5: ChainableFunction<U, Z>,
  fn6: ChainableFunction<U, A>
): ChainableFunction<U, [V, W, X, Y, Z, A]>
export function combine<U, V, W, X, Y, Z, A, B>(
  fn1: ChainableFunction<U, V>,
  fn2: ChainableFunction<U, W>,
  fn3: ChainableFunction<U, X>,
  fn4: ChainableFunction<U, Y>,
  fn5: ChainableFunction<U, Z>,
  fn6: ChainableFunction<U, A>,
  fn7: ChainableFunction<U, B>
): ChainableFunction<U, [V, W, X, Y, Z, A, B]>
export function combine(
  ...fns: Array<ChainableFunction<unknown, unknown>>
): ChainableFunction<unknown, Array<unknown>> {
  return (value) => fns.map((fn) => fn(value))
}

export function tap<U>(fn: (value: U) => void) {
  return (value: U) => {
    fn(value)
    return value
  }
}

export const noop = (value) => value
