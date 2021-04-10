import * as PIXI from 'pixi.js';

import { get2DVectorDistance, get2DVectorToRectDistance } from '../../../../../utils/points';
import { INativeEvent } from '../../../../../events/native-event.interface';
import { Event } from '../../../../../events/event.enum';
import { isPhone } from '../../../../../utils/window';
import { Events } from '../../../../../events/events';
import { App } from '../../../../../app';

import { Star } from '../../../../space/star/star';

import { AbstractTicker } from '../../../ticker.abstract';

import { ButtonAnimatingStar, ButtonAnimatingStarTarget } from './star-interaction-ticker.types';

export class StarInteractionTicker extends AbstractTicker {
    private static readonly ANIMATION_DURATION = 50;

    private readonly _oldAnimatingStars: Set<Star>;
    private readonly _animatingStars: Set<Star>;

    private readonly _buttonAnimatingStars: Set<Star>;
    private readonly _buttonAnimatingStarsTarget: Map<Star, ButtonAnimatingStar>;

    private _buttonBounds: DOMRect | undefined;
    private _runningButtonAnimation: boolean;

    public constructor() {
        super();

        this._oldAnimatingStars = new Set();
        this._animatingStars = new Set();

        this._buttonAnimatingStars = new Set();
        this._buttonAnimatingStarsTarget = new Map();

        this._runningButtonAnimation = false;

        Events.on(Event.SPACE_POINTER_MOVE, this._onSpacePointerOver, this);
        Events.on(Event.SPACE_POINTER_OUT, this._onSpacePointerOut, this);

        Events.on(Event.SPACE_BUTTON_HOVER, this._onSpaceButtonHover, this);
        Events.on(Event.SPACE_BUTTON_OUT, this._onSpaceButtonOut, this);
    }

    public update(delta: number): void {
        for (const animatingStar of this._oldAnimatingStars) {
            animatingStar.sprite.alpha -= 0.05;

            const targetAlpha = animatingStar.brightness / 0xFF;

            if (animatingStar.sprite.alpha <= targetAlpha) {
                animatingStar.sprite.alpha = targetAlpha;

                this._oldAnimatingStars.delete(animatingStar);
            }
        }

        for (const animatingStar of this._animatingStars) {
            const newAlpha = this._buttonAnimatingStars.has(animatingStar) ? 0.025 : 0.1;

            animatingStar.sprite.alpha += newAlpha;

            if (animatingStar.sprite.alpha >= 1) {
                animatingStar.sprite.alpha = 1;
            }
        }

        let runningButtonAnimation = false;

        for (const [star, animation] of this._buttonAnimatingStarsTarget) {
            if (animation.progress === StarInteractionTicker.ANIMATION_DURATION) {
                if (!animation.persistent) {
                    this._deleteStar(star);
                }

                continue;
            }

            runningButtonAnimation = true;

            const { target: { targetX, targetY }, initial: { initialX, initialY } } = animation;

            const fn = this._applyEaseInOutQuad(
                animation.progress / StarInteractionTicker.ANIMATION_DURATION,
            );

            const progressX = (targetX - initialX) * fn;
            const progressY = (targetY - initialY) * fn;

            star.sprite.x = progressX + initialX;
            star.sprite.y = progressY + initialY;

            animation.progress++;
        }

        this._runningButtonAnimation = runningButtonAnimation;
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

        // If the animation has not ended yet we should use already
        // cloned stars instead of cloning new stars
        const stars = this._runningButtonAnimation
            ? Array.from(this._buttonAnimatingStarsTarget.keys())
            : this._getCloseRectChildren(bounds).map((s) => s.clone());

        this._addAnimatingStars(stars, true);
        this._assignButtonAnimatingStarTargets(stars, bounds);
    }

    private _deleteStar(star: Star) {
        star.sprite.destroy();

        this._oldAnimatingStars.delete(star);
        this._animatingStars.delete(star);

        this._buttonAnimatingStars.delete(star);
        this._buttonAnimatingStarsTarget.delete(star);
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

            this._buttonAnimatingStarsTarget.set(star, {
                target: bestTarget.target,
                initial: {
                    initialX: star.sprite.x,
                    initialY: star.sprite.y,
                },
                progress: 0,
                persistent: true,
            });
        }
    }

    private _onSpaceButtonOut() {
        const stars = Array.from(this._buttonAnimatingStarsTarget.keys());

        for (const star of stars) {
            this._buttonAnimatingStarsTarget.set(star, {
                target: {
                    targetX: star.position.x,
                    targetY: star.position.y,
                },
                initial: {
                    initialX: star.sprite.x,
                    initialY: star.sprite.y,
                },
                progress: 0,
                persistent: false,
            });
        }

        this._buttonAnimatingStars.clear();
        this._addStarsToOldAnimatingStars();
    }

    private _getCloseRectChildren(rect: DOMRect): Star[] {
        const {
            x: rX, y: rY, width, height,
        } = rect;

        return App.instance.canvas.space.stars
            .filter(({ sprite: { x, y } }: Star) => get2DVectorToRectDistance(x, y, rX, rY, width, height) < 40);
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

            let sub = 0;
            if (isPhone()) {
                sub = 5;
            }

            targetX += Math.random() * 10 - sub;
            targetY += Math.random() * 10 - sub;

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

    private _applyEaseInOutQuad(n: number) {
        return n < 0.5 ? 2 * n * n : 1 - (-2 * n + 2) ** 2 / 2;
    }
}
