import * as PIXI from 'pixi.js';

import { App } from '@kennethgomez/app';

import { AbstractTicker } from '../ticker.abstract';

export class AnimationTicker extends AbstractTicker {
    public update(delta: number): void {
        for (const animation of App.instance.canvas.animations.get().values()) {
            const {
                object, property, duration, values, algorithm,
            } = animation.data;

            const fn = algorithm(
                animation.progress / duration,
            );

            const progressValue = (values.target - values.initial) * fn;
            const propertyValue = progressValue + values.initial;

            if (object[property] instanceof PIXI.ObservablePoint) {
                object[property].x = propertyValue;
                object[property].y = propertyValue;
            } else {
                object[property] = propertyValue;
            }

            animation.update(propertyValue);
            animation.updateProgress();
        }
    }
}
