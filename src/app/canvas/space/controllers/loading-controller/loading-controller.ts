import * as PIXI from 'pixi.js';

import { Module } from '@kennethgomez/module/module.abstract';
import { App } from '@kennethgomez/app';

import { Events } from '@kennethgomez/events/events';
import { Event } from '@kennethgomez/events/event.enum';
import { ObservableAnimation } from '../../../animations/observable-animation/observable-animation';

import { Star } from '../../star/star';

export class LoadingController extends Module {
    public static readonly CIRCLE_SIZE = 10;
    public static readonly CIRCLE_OFFSET = 25;

    public static readonly MAX_CIRCLE_ANIMATION_STEP = 6;

    private readonly _leftCircle: PIXI.Container;
    private readonly _topCircle: PIXI.Container;
    private readonly _rightCircle: PIXI.Container;

    public constructor() {
        super();

        this._leftCircle = new PIXI.Container();
        this._topCircle = new PIXI.Container();
        this._rightCircle = new PIXI.Container();
    }

    protected onInit() {
        App.instance.canvas.space.addChild(this._leftCircle, this._topCircle, this._rightCircle);
    }

    public start(stars: Star[]) {
        this._makeCircles(stars.map((s) => s.sprite));
    }

    private _makeCircles(stars: PIXI.Sprite[]) {
        const { CIRCLE_SIZE, CIRCLE_OFFSET } = LoadingController;

        const splitIdx = Math.ceil(stars.length / 3);

        const screenCenterX = window.innerWidth / 2;
        const screenCenterY = window.innerHeight / 2 + CIRCLE_SIZE * 2;

        this._leftCircle.addChild(...stars.slice(0, splitIdx));
        this._topCircle.addChild(...stars.slice(splitIdx, splitIdx * 2));
        this._rightCircle.addChild(...stars.slice(splitIdx * 2));

        this._makeCircle(this._leftCircle, screenCenterX - CIRCLE_OFFSET, screenCenterY);
        this._makeCircle(this._topCircle, screenCenterX, screenCenterY - CIRCLE_OFFSET * 1.5);
        this._makeCircle(this._rightCircle, screenCenterX + CIRCLE_OFFSET, screenCenterY)
            ?.on('finish', () => setTimeout(this._moveCircles.bind(this), 500));
    }

    private _makeCircle(
        stars: PIXI.Container, x: number, y: number,
    ): ObservableAnimation<PIXI.DisplayObject, number> | undefined {
        const n = stars.children.length;
        const increment = 360 / n;
        const startAngle = 0;

        let lastAnimation;

        for (let i = 0; i < n; i++) {
            const angle = startAngle + increment * i;
            const rads = (angle * Math.PI) / 180;

            const tx = x + LoadingController.CIRCLE_SIZE * Math.cos(rads);
            const ty = y + LoadingController.CIRCLE_SIZE * Math.sin(rads);

            const star = stars.children[i];

            star.scale.set(1);

            App.instance.canvas.animations.addAnimation(star, 'x', 50, {
                target: tx,
            });
            App.instance.canvas.animations.addAnimation(star, 'y', 50, {
                target: ty,
            });
            lastAnimation = App.instance.canvas.animations.addAnimation(star, 'alpha', 50, {
                target: 0.5,
            });
        }

        return lastAnimation;
    }

    private _moveCircles(step: number = 0) {
        const { CIRCLE_OFFSET, MAX_CIRCLE_ANIMATION_STEP } = LoadingController;

        if (step >= MAX_CIRCLE_ANIMATION_STEP) {
            Events.emit(Event.LOADING_CONTROLLER_END);

            return;
        }

        const circles = [
            this._leftCircle,
            this._topCircle,
            this._rightCircle,
        ];

        const size = circles.length;

        this._moveCircle(circles[step % size], CIRCLE_OFFSET, -CIRCLE_OFFSET * 1.5);
        this._moveCircle(circles[(step + 1) % size], CIRCLE_OFFSET, CIRCLE_OFFSET * 1.5);
        this._moveCircle(circles[(step + 2) % size], -CIRCLE_OFFSET * 2, 0)
            .on('finish', () => setTimeout(() => this._moveCircles(step + 1), 200));
    }

    private _moveCircle(
        circle: PIXI.Container, offsetX: number, offsetY: number,
    ): ObservableAnimation<PIXI.Container, number> {
        App.instance.canvas.animations.addAnimation(circle, 'alpha', 20, {
            target: 0.75,
        }).on('finish', () => {
            App.instance.canvas.animations.addAnimation(circle, 'alpha', 20, {
                target: 1,
            });
        });

        App.instance.canvas.animations.addAnimation(circle, 'x', 40, {
            target: circle.x + offsetX,
        });
        return App.instance.canvas.animations.addAnimation(circle, 'y', 40, {
            target: circle.y + offsetY,
        });
    }
}
