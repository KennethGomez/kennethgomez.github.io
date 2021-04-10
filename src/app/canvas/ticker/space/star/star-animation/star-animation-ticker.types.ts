export type ButtonAnimatingStarTarget = {
    targetX: number
    targetY: number
}

export type ButtonAnimatingStarInitial = {
    initialX: number
    initialY: number
}

export type ButtonAnimatingStar = {
    target: ButtonAnimatingStarTarget
    initial: ButtonAnimatingStarInitial
    progress: number
    persistent: boolean
}
