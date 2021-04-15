import * as PIXI from 'pixi.js';

import { INativeEvent } from '@kennethgomez/events/native-event.interface';
import { get2DVectorDistance } from '@kennethgomez/utils/points';
import { Module } from '@kennethgomez/module/module.abstract';
import { Event } from '@kennethgomez/events/event.enum';
import { Events } from '@kennethgomez/events/events';
import { App } from '@kennethgomez/app';

import { ObservableAnimation } from '../../../animations/observable-animation/observable-animation';

import { Star } from '../../star/star';

export class HoveringController extends Module {
    private readonly _starsFadeInAnimations: Map<Star, ObservableAnimation<PIXI.Sprite, number>>;
    private readonly _starsFadeOutAnimations: Map<Star, ObservableAnimation<PIXI.Sprite, number>>;

    public constructor() {
        super();

        this._starsFadeInAnimations = new Map();
        this._starsFadeOutAnimations = new Map();
    }

    public start() {
        Events.on(Event.SPACE_POINTER_MOVE, this._onSpacePointerOver, this);
        Events.on(Event.SPACE_POINTER_OUT, this._onSpacePointerOut, this);
    }

    private _onSpacePointerOver(event?: INativeEvent<PIXI.InteractionEvent>) {
        if (!event) {
            return;
        }

        const { base } = event;

        const stars = this._getClosePointChildren(base);

        this._removeStarHoveringAnimations(stars);
        this._addStarHoveringAnimations(stars);
    }

    private _onSpacePointerOut() {
        this._removeStarHoveringAnimations();
    }

    private _getClosePointChildren(event: PIXI.InteractionEvent): Star[] {
        const { x: pX, y: pY } = event.data.global;

        return App.instance.canvas.space.stars
            .filter(({ sprite: { x, y } }: Star) => get2DVectorDistance(pX, pY, x, y) < 40);
    }

    private _removeStarHoveringAnimations(except?: Star[]) {
        for (const [star, animation] of this._starsFadeInAnimations) {
            if (except && except.includes(star)) {
                continue;
            }

            animation.interrupt();

            this._starsFadeInAnimations.delete(star);
        }
    }

    private _addStarHoveringAnimations(stars: Star[]) {
        const { animations } = App.instance.canvas;

        for (const star of stars) {
            if (this._starsFadeInAnimations.has(star)) {
                continue;
            }

            if (this._starsFadeOutAnimations.has(star)) {
                this._starsFadeOutAnimations.get(star)?.interrupt();
            }

            const observable = animations.addAnimation(star.sprite, 'alpha', 5, {
                target: 1,
            });

            observable.on('interruption', () => this._applyFadeOut(star));

            this._starsFadeInAnimations.set(star, observable);
        }
    }

    private _applyFadeOut(star: Star) {
        const observable = App.instance.canvas.animations.addAnimation(star.sprite, 'alpha', 15, {
            target: star.brightness / 0xFF,
        });

        observable.on('interruption', () => this._starsFadeOutAnimations.delete(star));
        observable.on('finish', () => this._starsFadeOutAnimations.delete(star));

        this._starsFadeOutAnimations.set(star, observable);
    }
}
