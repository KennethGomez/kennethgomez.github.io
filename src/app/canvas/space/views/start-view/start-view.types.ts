import * as PIXI from 'pixi.js';

import { ObservableAnimation } from '../../../animations/observable-animation/observable-animation';

export type StarPositionAnimation = {
    alpha: ObservableAnimation<PIXI.Sprite, number>
    x: ObservableAnimation<PIXI.Sprite, number>
    y: ObservableAnimation<PIXI.Sprite, number>
}
