import * as PIXI from 'pixi.js';

import { INativeEvent } from '../../../../../events/native-event.interface';
import { Event } from '../../../../../events/event.enum';
import { Events } from '../../../../../events/events';
import { App } from '../../../../../app';

import { Star } from '../../../../space/star/star';

import { AbstractTicker } from '../../../ticker.abstract';

import { ButtonAnimatingStarTarget } from './star-interaction-ticker.types';
import { get2DVectorDistance, get2DVectorToRectDistance } from '../../../../../utils/points';

export class StarInteractionTicker extends AbstractTicker {
    private readonly _oldAnimatingStars: Set<Star>;
    private readonly _animatingStars: Set<Star>;

    private readonly _buttonAnimatingStars: Set<Star>;
    private _buttonAnimatingStarsTarget: Map<Star, ButtonAnimatingStarTarget>;
    private _buttonBounds: DOMRect | undefined;

    public constructor() {
        super();

        this._oldAnimatingStars = new Set();
        this._animatingStars = new Set();

        this._buttonAnimatingStars = new Set();
        this._buttonAnimatingStarsTarget = new Map();

        Events.on(Event.SPACE_POINTER_MOVE, this._onSpacePointerOver, this);
        Events.on(Event.SPACE_POINTER_OUT, this._onSpacePointerOut, this);

        Events.on(Event.SPACE_BUTTON_HOVER, this._onSpaceButtonHover, this);
        Events.on(Event.SPACE_BUTTON_OUT, this._onSpaceButtonOut, this);
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

        for (const [star, { targetX, targetY }] of this._buttonAnimatingStarsTarget.entries()) {
            star.sprite.x = targetX;
            star.sprite.y = targetY;
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

    private _onSpaceButtonHover(event?: INativeEvent<MouseEvent>) {
        if (!event) {
            return;
        }

        const btn = event.base.target;

        if (!(btn instanceof HTMLButtonElement)) {
            return;
        }

        const bounds = btn.getBoundingClientRect();

        this._buttonBounds = bounds;

        const stars = this._getCloseRectChildren(bounds);

        this._addAnimatingStars(stars, true);
        this._assignButtonAnimatingStarTargets(stars, bounds);
    }

    private _assignButtonAnimatingStarTargets(stars: Star[], bounds: DOMRect) {
        const targets = this._getButtonAnimatingStarTargets(stars.length, bounds);

        for (const star of stars) {
            const { x, y } = star.position;

            let bestTarget = {
                target: targets[0],
                distance: Infinity,
                index: -1,
            };

            for (let i = 0; i < targets.length; i++) {
                const target = targets[i];

                const distance = get2DVectorDistance(x, y, target.targetX, target.targetY);

                if (distance < bestTarget.distance) {
                    bestTarget = {
                        target,
                        distance,
                        index: i,
                    };
                }
            }

            targets.splice(bestTarget.index, 1);

            this._buttonAnimatingStarsTarget.set(star, bestTarget.target);
        }
    }

    private _onSpaceButtonOut() {
        this._restoreStarPositions(Array.from(this._buttonAnimatingStars.values()));

        this._buttonAnimatingStars.clear();
        this._buttonAnimatingStarsTarget.clear();
        this._buttonBounds = undefined;

        this._addStarsToOldAnimatingStars();
    }

    private _restoreStarPositions(stars: Star[]) {
        for (const star of stars) {
            star.sprite.position.copyFrom(star.position);
        }
    }

    private _getCloseRectChildren(rect: DOMRect): Star[] {
        const {
            x: rX, y: rY, width, height,
        } = rect;

        return App.instance.canvas.space.stars
            .filter(({ sprite: { x, y } }: Star) => get2DVectorToRectDistance(x, y, rX, rY, width, height));
    }

    private _getClosePointChildren(event: PIXI.InteractionEvent): Star[] {
        const { x: pX, y: pY } = event.data.global;

        return App.instance.canvas.space.stars
            .filter(({ sprite: { x, y } }: Star) => get2DVectorDistance(pX, pY, x, y) < 40);
    }

    private _addAnimatingStars(stars: Star[], button: boolean = false) {
        this._addStarsToOldAnimatingStars(stars);

        for (const star of stars) {
            if (button && !this._buttonAnimatingStars.has(star)) {
                this._buttonAnimatingStars.add(star);
            }

            if (!this._animatingStars.has(star)) {
                this._animatingStars.add(star);
            }
        }
    }

    private _getButtonAnimatingStarTargets(size: number, bounds: DOMRect): ButtonAnimatingStarTarget[] {
        const targets = [];
        const {
            x, y, width, height,
        } = bounds;

        const maxX = x + width;
        const maxY = y + height;

        const a = width * 2 + height * 2;
        const step = a / size;

        for (let i = 0; i < size; i++) {
            let current = step * i;

            let targetX = x + current;
            let targetY = y;

            if (targetX > maxX) {
                current -= width;

                targetX = maxX;
                targetY = y + current;
            }

            if (targetY > maxY) {
                current -= height;

                targetY = y + height;
                targetX = maxX - current;
            }

            if (targetX < x) {
                current -= width;

                targetX = x;
                targetY = maxY - current;
            }

            targetX += Math.random() * 10;
            targetY += Math.random() * 10;

            targets.push({ targetX, targetY });
        }

        return targets;
    }

    private _addStarsToOldAnimatingStars(newStars?: Star[]) {
        for (const oldStar of this._animatingStars) {
            if (newStars && newStars.includes(oldStar)) {
                continue;
            }

            if (this._buttonAnimatingStars.has(oldStar)) {
                continue;
            }

            this._animatingStars.delete(oldStar);

            if (!this._oldAnimatingStars.has(oldStar)) {
                this._oldAnimatingStars.add(oldStar);
            }
        }
    }
}
