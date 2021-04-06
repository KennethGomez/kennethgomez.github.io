import { Star } from '../../../space/star/star';

import { AbstractTicker } from '../../ticker.abstract';
import { InitStarAnimation } from './init-stars.types';

export class InitStarsTicker extends AbstractTicker {
    private readonly _starAnimations: InitStarAnimation[]

    private _remainingDelay = 20 // Frame count delay until start animation

    public constructor(
        private readonly _stars: Star[],
    ) {
        super();

        this._starAnimations = this._initStarAnimations();
    }

    public update(delta: number): void {
        if (this._remainingDelay > 0) {
            this._remainingDelay--;

            return;
        }

        for (const starAnimation of this._starAnimations) {
            this._updateStarAnimation(starAnimation);
        }
    }

    private _initStarAnimations(): InitStarAnimation[] {
        return this._stars.map((star: Star) => {
            const yVelocity = (Math.random() * 50) + 10;

            return {
                star,
                yVelocity,
            };
        });
    }

    private _updateStarAnimation(starAnimation: InitStarAnimation) {
        const { star: { sprite, position: { x, y }, brightness }, yVelocity } = starAnimation;

        sprite.y -= yVelocity;

        if (sprite.y <= y) {
            sprite.y = y;
        }

        sprite.alpha += 0.01;

        const alpha = brightness / 0xFF;

        if (sprite.alpha >= alpha) {
            sprite.alpha = alpha;
        }
    }

    private _applyEaseInOutCubic(x: number) {
        return x < 0.5 ? 4 * x ** 3 : 1 - (-2 * x + 2) ** 3 / 2;
    }
}
