export type AsyncConsumer<T> = (value: T) => Promise<void>
export type AsyncMapper<T, R> = (value: T) => Promise<R>
export type AsyncProvider<T> = () => Promise<T>
export type SyncConsumer<T> = (value: T) => void
export type SyncMapper<T, R> = (value: T) => R
export type SyncProvider<T> = () => T
export type Consumer<T> = AsyncConsumer<T> | SyncConsumer<T>
export type Mapper<T, R> = AsyncMapper<T, R> | SyncMapper<T, R>
export type Provider<T> = AsyncProvider<T> | SyncProvider<T>
