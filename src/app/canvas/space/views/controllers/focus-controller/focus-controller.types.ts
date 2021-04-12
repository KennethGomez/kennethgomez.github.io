import * as PIXI from 'pixi.js';

import { ObservableAnimation } from '../../../../animations/observable-animation/observable-animation';

export type StarFocusAnimation = {
    alpha: ObservableAnimation<PIXI.Sprite, number>
    x: ObservableAnimation<PIXI.ObservablePoint, number>
    y: ObservableAnimation<PIXI.ObservablePoint, number>
}
