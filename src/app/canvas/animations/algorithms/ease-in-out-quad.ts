import { AnimationAlgorithm } from '../animation.types';

export const easeInOutQuad: AnimationAlgorithm = (n: number) => (n < 0.5 ? 2 * n * n : 1 - (-2 * n + 2) ** 2 / 2);
