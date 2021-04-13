import * as PIXI from 'pixi.js';

import { get2DVectorDistance, get2DVectorToRectDistance } from '@kennethgomez/utils/points';
import { INativeEvent } from '@kennethgomez/events/native-event.interface';
import { Module } from '@kennethgomez/module/module.abstract';
import { Event } from '@kennethgomez/events/event.enum';
import { Events } from '@kennethgomez/events/events';
import { isPhone } from '@kennethgomez/utils/window';
import { App } from '@kennethgomez/app';

import { Star } from '../../star/star';

import { StarFocusAnimation } from './focus-controller.types';

export class FocusController extends Module {
    private readonly _clonedStars: Set<Star>;

    private readonly _enterAnimations: Map<Star, StarFocusAnimation>;
    private readonly _exitAnimations: Map<Star, StarFocusAnimation>;

    private _isFocusAnimationRunning: boolean;

    public constructor() {
        super();

        this._clonedStars = new Set();

        this._enterAnimations = new Map();
        this._exitAnimations = new Map();

        this._isFocusAnimationRunning = false;
    }

    public start() {
        Events.on(Event.SPACE_BUTTON_HOVER, this._onSpaceButtonHover, this);
        Events.on(Event.SPACE_BUTTON_OUT, this._onSpaceButtonOut, this);
    }

    protected onDispose() {
        this._interruptAnimations(this._exitAnimations);
        this._exitAnimations.clear();

        this._interruptAnimations(this._enterAnimations);
        this._enterAnimations.clear();

        this._clonedStars.clear();

        Events.removeListener(Event.SPACE_BUTTON_HOVER, this._onSpaceButtonHover, this);
        Events.removeListener(Event.SPACE_BUTTON_OUT, this._onSpaceButtonOut, this);
    }

    private _onSpaceButtonHover(event?: INativeEvent<MouseEvent>) {
        if (!event) {
            return;
        }

        const btn = event.base.target;

        if (!(btn instanceof HTMLElement)) {
            return;
        }

        const bounds = btn.getBoundingClientRect();

        // If the animation has not ended yet we should use already
        // cloned stars instead of cloning new stars
        const stars = this._getOrCloneStars(bounds);

        const targets = this._getStarPositionTargetsFor(stars, bounds);

        this._addStarEnterAnimations(stars, targets);
        this._isFocusAnimationRunning = true;
    }

    private _onSpaceButtonOut() {
        const stars = Array.from(this._enterAnimations.keys());

        this._interruptAnimations(this._enterAnimations);

        for (const star of stars) {
            if (this._exitAnimations.has(star)) {
                continue;
            }

            this._addExitAnimation(star, 40);
        }
    }

    private _getStarPositionTargetsFor(stars: Star[], bounds: DOMRect): PIXI.IPointData[] {
        const targets = [];
        const {
            x, y, width, height,
        } = bounds;

        const maxX = x + width;
        const maxY = y + height;

        const a = width * 2 + height * 2;
        const step = a / stars.length;

        for (let i = 0; i < stars.length; i++) {
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

            let sub = 2.5;
            if (isPhone()) {
                sub = 5;
            }

            targetX += Math.random() * 10 - sub;
            targetY += Math.random() * 10 - sub;

            targets.push({ x: targetX, y: targetY });
        }

        return targets;
    }

    private _addStarEnterAnimations(stars: Star[], targets: PIXI.IPointData[]) {
        this._interruptAnimations(this._exitAnimations);

        for (const star of stars) {
            if (this._enterAnimations.has(star)) {
                continue;
            }

            const { x, y } = star.position;

            let bestTarget = {
                target: targets[0],
                distance: Infinity,
                index: -1,
            };

            for (let i = 0; i < targets.length; i++) {
                const target = targets[i];

                const distance = get2DVectorDistance(x, y, target.x, target.y);

                if (distance < bestTarget.distance) {
                    bestTarget = {
                        target,
                        distance,
                        index: i,
                    };
                }
            }

            targets.splice(bestTarget.index, 1);

            this._addEnterAnimation(star, bestTarget.target, 1, 30);
        }
    }

    private _getCloseRectChildren(rect: DOMRect): Star[] {
        const {
            x: rX, y: rY, width, height,
        } = rect;

        return App.instance.canvas.space.stars
            .filter(({ sprite: { x, y } }: Star) => get2DVectorToRectDistance(x, y, rX, rY, width, height) < 40);
    }

    private _addEnterAnimation(star: Star, target: PIXI.IPointData, alpha: number, duration: number) {
        const { x, y } = target;

        const animations: StarFocusAnimation = this._getAnimation(star, x, y, alpha, duration);

        this._enterAnimations.set(star, animations);
    }

    private _addExitAnimation(star: Star, duration: number) {
        const { x, y } = star.position;

        const animations: StarFocusAnimation = this._getAnimation(star, x, y, 0, duration);

        this._exitAnimations.set(star, animations);

        // Just track one of them as all they have the same duration
        animations.alpha
            .on('finish', () => {
                this._exitAnimations.delete(star);
                this._clonedStars.delete(star);

                star.destroy();

                // Whenever any of the animation ends means all of them finished
                // since all they have the same duration
                this._isFocusAnimationRunning = false;
            });
    }

    private _getAnimation(star: Star, x: number, y: number, alpha: number, duration: number) {
        const { animations } = App.instance.canvas;

        return {
            alpha: animations.addAnimation(star.sprite, 'alpha', duration, {
                target: alpha,
            }),
            x: animations.addAnimation(star.sprite.position, 'x', duration, {
                target: x,
            }),
            y: animations.addAnimation(star.sprite.position, 'y', duration, {
                target: y,
            }),
        };
    }

    private _interruptAnimations(animations: Map<Star, StarFocusAnimation>) {
        for (const animation of animations.values()) {
            animation.alpha.interrupt();
            animation.x.interrupt();
            animation.y.interrupt();
        }

        animations.clear();
    }

    private _getOrCloneStars(bounds: DOMRect): Star[] {
        if (this._clonedStars.size === 0) {
            for (const star of this._getCloseRectChildren(bounds).map((s) => s.clone())) {
                this._clonedStars.add(star);
            }
        }

        return Array.from(this._clonedStars);
    }

    public get nearStartButtonStars(): Star[] {
        const btn = document.getElementById('start-btn');

        if (!btn) {
            return [];
        }

        const bounds = btn.getBoundingClientRect();

        // If the animation has not ended yet we should use already
        // cloned stars instead of cloning new stars
        return this._getOrCloneStars(bounds);
    }
}
