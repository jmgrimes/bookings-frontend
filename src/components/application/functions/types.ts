export type AsyncConsumer<T> = (value: T) => Promise<void>
export type AsyncMapper<T, R> = (value: T) => Promise<R>
export type AsyncProvider<T> = () => Promise<T>
export type Consumer<T> = (value: T) => void
export type Mapper<T, R> = (value: T) => R
export type Provider<T> = () => T
