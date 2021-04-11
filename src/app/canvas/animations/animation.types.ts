export type AnimationAlgorithm = (n: number) => number

export type AnimationValues<T> = {
    initial?: T
    target: T
}

export type Animation<T, K> = {
    object: T
    property: keyof T
    duration: number
    values: AnimationValues<K>
    algorithm: AnimationAlgorithm
}
