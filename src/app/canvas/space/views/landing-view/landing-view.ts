import * as PIXI from 'pixi.js';

import { AbstractModule } from '@kennethgomez/module';
import { App } from '@kennethgomez/app';

import { CircleMotionController } from '../../controllers/circle-motion-controller';
import { Star } from '../../star/star';

export class LandingView extends AbstractModule {
    public static readonly MAX_CIRCLE_ANIMATION_STEP = 6;

    private readonly _leftCircle: PIXI.Container;
    private readonly _topCircle: PIXI.Container;
    private readonly _rightCircle: PIXI.Container;

    public constructor() {
        super([
            new CircleMotionController(),
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
        const { CIRCLE_SIZE, CIRCLE_OFFSET } = CircleMotionController;
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
        const { CIRCLE_OFFSET } = CircleMotionController;

        const circles = [
            this._leftCircle,
            this._topCircle,
            this._rightCircle,
        ];

        if (step >= LandingView.MAX_CIRCLE_ANIMATION_STEP) {
            this._startLanding();

            return;
        }

        const size = circles.length;

        this.motionController.moveCircle(circles[step % size], CIRCLE_OFFSET, -CIRCLE_OFFSET * 1.5);
        this.motionController.moveCircle(circles[(step + 1) % size], CIRCLE_OFFSET, CIRCLE_OFFSET * 1.5);
        this.motionController.moveCircle(circles[(step + 2) % size], -CIRCLE_OFFSET * 2, 0)
            .on('finish', () => setTimeout(() => this._moveLoadingCircles(step + 1), 200));
    }

    private _startLanding() {
        console.log('landing');
    }

    public get motionController(): CircleMotionController {
        return this.getSubmodule(CircleMotionController);
    }
}
