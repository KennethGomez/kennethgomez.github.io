import * as PIXI from 'pixi.js';

import { Module } from '@kennethgomez/module/module.abstract';
import { App } from '@kennethgomez/app';

import { StarCircleController } from '../controllers/star-circle-controller/star-circle-controller';
import { Star } from '../star/star';

export class LandingView extends Module {
    public static readonly MAX_CIRCLE_ANIMATION_STEP = 3;

    private readonly _leftCircle: PIXI.Container;
    private readonly _topCircle: PIXI.Container;
    private readonly _rightCircle: PIXI.Container;

    public constructor() {
        super([
            new StarCircleController(),
        ]);

        this._leftCircle = new PIXI.Container();
        this._topCircle = new PIXI.Container();
        this._rightCircle = new PIXI.Container();
    }

    protected onInit() {
        App.instance.canvas.space.addChild(this._leftCircle, this._topCircle, this._rightCircle);
    }

    public start(stars: Star[]) {
        this._startLoading(stars);
    }

    private _startLoading(stars: Star[]) {
        const { CIRCLE_SIZE, CIRCLE_OFFSET } = StarCircleController;
        const [left, top, right] = this.motionController.splitStars(stars.map((s) => s.sprite));

        this._leftCircle.addChild(...left);
        this._topCircle.addChild(...top);
        this._rightCircle.addChild(...right);

        const screenCenterX = window.innerWidth / 2;
        const screenCenterY = window.innerHeight / 2 + CIRCLE_SIZE * 2;

        this.motionController.makeCircle(this._leftCircle, screenCenterX - CIRCLE_OFFSET, screenCenterY);
        this.motionController.makeCircle(this._topCircle, screenCenterX, screenCenterY - CIRCLE_OFFSET * 1.5);
        this.motionController.makeCircle(this._rightCircle, screenCenterX + CIRCLE_OFFSET, screenCenterY)
            ?.on('finish', () => setTimeout(this._moveLoadingCircles.bind(this), 500));
    }

    private _moveLoadingCircles(step: number = 0) {
        const { CIRCLE_OFFSET } = StarCircleController;

        if (step >= LandingView.MAX_CIRCLE_ANIMATION_STEP) {
            setTimeout(() => {
                this._startLanding();
            }, 250);

            return;
        }

        const size = this.starCircles.length;

        this.motionController.moveCircle(this.starCircles[step % size], CIRCLE_OFFSET, -CIRCLE_OFFSET * 1.5);
        this.motionController.moveCircle(this.starCircles[(step + 1) % size], CIRCLE_OFFSET, CIRCLE_OFFSET * 1.5);
        this.motionController.moveCircle(this.starCircles[(step + 2) % size], -CIRCLE_OFFSET * 2, 0)
            .on('finish', () => setTimeout(() => this._moveLoadingCircles(step + 1), 200));
    }

    private _startLanding() {
        const { CIRCLE_OFFSET } = StarCircleController;

        this.motionController.moveCircle(this._leftCircle, CIRCLE_OFFSET, 0);
        this.motionController.moveCircle(this._rightCircle, -CIRCLE_OFFSET, CIRCLE_OFFSET * 1.5)
            .on('finish', () => setTimeout(this._makeNavigator.bind(this), 250));
    }

    private _makeNavigator() {
        const { CIRCLE_OFFSET } = StarCircleController;

        const target = (window.innerWidth / 2) - CIRCLE_OFFSET * 1.5;

        let animation;

        for (let i = 0; i < this.starCircles.length; i++) {
            const circle = this.starCircles[i];

            animation = this.motionController.moveCircle(circle, target, 0);
        }

        animation?.on('finish', () => setTimeout(this._openNavigator.bind(this), 250));
    }

    private _openNavigator() {
        this.motionController.addAnimationToStars(this._topCircle, 'scale', 40, {
            target: 2,
        });

        this.motionController.moveCircle(this._topCircle, 0, -(StarCircleController.CIRCLE_OFFSET * 2));
    }

    public get starCircles(): PIXI.Container[] {
        return [
            this._leftCircle,
            this._topCircle,
            this._rightCircle,
        ];
    }

    public get motionController(): StarCircleController {
        return this.getSubmodule(StarCircleController);
    }
}
