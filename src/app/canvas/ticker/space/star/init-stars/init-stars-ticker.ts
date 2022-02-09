import { Event } from '@kennethgomez/events/event.enum';
import { Events } from '@kennethgomez/events/events';

import { Star } from '../../../../space/star/star';

import { AbstractTicker } from '../../../ticker.abstract';

import { InitStarAnimation } from './init-stars.types';

export class InitStarsTicker extends AbstractTicker {
    private readonly _starAnimations: InitStarAnimation[];

    private _remainingDelay: number;

    public constructor(
        private readonly _stars: Star[],
    ) {
        super();

        this._starAnimations = this._initStarAnimations();

        this._remainingDelay = 20; // Frame count delay until start animation
    }

    public update(delta: number): void {
        if (this._remainingDelay > 0) {
            this._remainingDelay--;

            return;
        }

        let updated = false;

        for (const starAnimation of this._starAnimations) {
            if (starAnimation.ended) {
                continue;
            }

            // If we update at least one star animation don't dispose the ticker
            updated = true;

            starAnimation.ended = this._updateStarAnimation(starAnimation);
        }

        if (!updated) {
            this.dispose();
        }
    }

    protected onDispose() {
        Events.emit(Event.SPACE_INITIALIZED);
    }

    private _initStarAnimations(): InitStarAnimation[] {
        return this._stars.map((star: Star) => {
            const yVelocity = (Math.random() * 75) + 10;

            return {
                star,
                yVelocity,
                ended: false,
            };
        });
    }

    private _updateStarAnimation(starAnimation: InitStarAnimation): boolean {
        const { sprite, position: { y: targetY }, brightness } = starAnimation.star;

        sprite.y -= starAnimation.yVelocity;

        if (sprite.y <= targetY) {
            sprite.y = targetY;
        }

        sprite.alpha += this._getSpriteAlphaStep(targetY);

        const targetAlpha = brightness / 0xFF;

        if (sprite.alpha >= targetAlpha) {
            sprite.alpha = targetAlpha;
        }

        return sprite.alpha === targetAlpha && sprite.y === targetY;
    }

    private _getSpriteAlphaStep(targetY: number): number {
        const highAlpha = 0.01;
        const lowAlpha = 0.0025;

        const alphaDiff = lowAlpha - highAlpha;
        const stepPerHeightPixelAlpha = alphaDiff / window.innerHeight;

        return lowAlpha - (stepPerHeightPixelAlpha * targetY);
    }
}
