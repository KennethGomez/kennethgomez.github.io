import * as PIXI from 'pixi.js';

import { INativeEvent } from '../../../../../events/native-event.interface';
import { Events } from '../../../../../events/events';
import { Event } from '../../../../../events/event.enum';
import { App } from '../../../../../app';

import { Star } from '../../../../space/star/star';

import { AbstractTicker } from '../../../ticker.abstract';

export class StarInteractionTicker extends AbstractTicker {
    private readonly _oldAnimatingStars: Set<Star>;
    private readonly _animatingStars: Set<Star>;

    public constructor() {
        super();

        this._oldAnimatingStars = new Set();
        this._animatingStars = new Set();

        Events.on(Event.SPACE_POINTER_MOVE, this._onSpacePointerOver, this);
        Events.on(Event.SPACE_POINTER_OUT, this._onSpacePointerOut, this);
    }

    public update(delta: number): void {
        for (const animatingStar of this._oldAnimatingStars.values()) {
            animatingStar.sprite.alpha -= 0.05;

            const targetAlpha = animatingStar.brightness / 0xFF;

            if (animatingStar.sprite.alpha <= targetAlpha) {
                animatingStar.sprite.alpha = targetAlpha;

                this._oldAnimatingStars.delete(animatingStar);
            }
        }

        for (const animatingStar of this._animatingStars.values()) {
            animatingStar.sprite.alpha += 0.1;

            if (animatingStar.sprite.alpha >= 1) {
                animatingStar.sprite.alpha = 1;
            }
        }
    }

    private _onSpacePointerOver(event?: INativeEvent<PIXI.InteractionEvent>) {
        if (!event) {
            return;
        }

        const { base } = event;

        this._addAnimatingStars(this._getClosePointChildren(base));
    }

    private _onSpacePointerOut() {
        this._addStarsToOldAnimatingStars();
    }

    private _getClosePointChildren(event: PIXI.InteractionEvent): Star[] {
        const { x: pX, y: pY } = event.data.global;

        return App.instance.canvas.space.stars.filter(({ sprite: { x, y } }: Star) => {
            const distance = Math.sqrt(Math.abs(x - pX) ** 2 + Math.abs(y - pY) ** 2);

            return distance < 40;
        });
    }

    private _addAnimatingStars(stars: Star[]) {
        this._addStarsToOldAnimatingStars(stars);

        for (const star of stars) {
            if (!this._animatingStars.has(star)) {
                this._animatingStars.add(star);
            }
        }
    }

    private _addStarsToOldAnimatingStars(newStars?: Star[]) {
        for (const oldStar of this._animatingStars) {
            if (newStars && newStars.includes(oldStar)) {
                continue;
            }

            this._animatingStars.delete(oldStar);

            if (!this._oldAnimatingStars.has(oldStar)) {
                this._oldAnimatingStars.add(oldStar);
            }
        }
    }
}
