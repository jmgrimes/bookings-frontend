type AsyncConsumer<T> = (value: T) => Promise<void>
type AsyncMapper<T, R> = (value: T) => Promise<R>
type AsyncProvider<T> = () => Promise<T>
type SyncConsumer<T> = (value: T) => void
type SyncMapper<T, R> = (value: T) => R
type SyncProvider<T> = () => T

export type Consumer<T> = AsyncConsumer<T> | SyncConsumer<T>
export type Mapper<T, R> = AsyncMapper<T, R> | SyncMapper<T, R>
export type Provider<T> = AsyncProvider<T> | SyncProvider<T>
