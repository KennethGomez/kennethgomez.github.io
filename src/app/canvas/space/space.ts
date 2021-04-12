import * as PIXI from 'pixi.js';

import { Module } from '@kennethgomez/module/module.abstract';
import { Event } from '@kennethgomez/events/event.enum';
import { Events } from '@kennethgomez/events/events';

import { App } from '@kennethgomez/app';
import { InitStarsTicker } from '../ticker/space/star/init-stars/init-stars-ticker';
import { IAddDisplayObject } from '../events/add-display-object.interface';

import { HoveringController } from './views/controllers/hovering-controller/hovering-controller';
import { StartView } from './views/start-view/start-view';
import { Star } from './star/star';

export class Space extends Module {
    /**
     * Amount of star per pixel²
     */
    public static readonly STAR_RATIO = 0.008;

    private readonly _stars: Star[];
    private readonly _container: PIXI.Container;

    public constructor() {
        super([
            new StartView(),
            new HoveringController(),
        ]);

        this._stars = [];
        this._container = new PIXI.Container();

        this._container.interactive = true;
        this._container.interactiveChildren = false;
        this._container.on('pointermove', (e) => Events.emit(Event.SPACE_POINTER_MOVE, { base: e }));

        window.addEventListener('mouseout', this._onMouseOut);
        window.addEventListener('touchend', this._onMouseOut);
    }

    protected onInit(): void {
        this._populateStars();
        this._drawSpace();

        Events.emit(Event.ADD_TICKER, { ticker: new InitStarsTicker(this._stars) });

        Events.on(Event.SPACE_INITIALIZED, this._onSpaceInitialized, this);
        Events.on(Event.ADD_DISPLAY_OBJECT, this._onAddDisplayObject, this);
        Events.on(Event.START_BUTTON_CLICK, this._onStart, this);
    }

    protected onDispose() {
        this._container.destroy({ children: true });

        window.removeEventListener('mouseout', this._onMouseOut);
        window.removeEventListener('touchend', this._onMouseOut);
    }

    private _onSpaceInitialized() {
        this.startView.start();
        this.hoveringController.start();
    }

    private _onAddDisplayObject(e?: IAddDisplayObject) {
        if (!e) {
            return;
        }

        this._container.addChild(e.object);
    }

    private _onStart() {
        const stars = this.startView.focusController.nearStartButtonStars;

        this.startView.dispose();

        Events.removeListener(Event.START_BUTTON_CLICK, this._onStart, this);

        const n = stars.length;
        const increment = 360 / n;
        const startAngle = 0;
        for (let i = 0; i < n; i++) {
            const angle = startAngle + increment * i;
            const rads = (angle * Math.PI) / 180;

            const tx = 500 + 10 * Math.cos(rads);
            const ty = 500 + 10 * Math.sin(rads);

            const star = stars[i];

            App.instance.canvas.animations.addAnimation(star.sprite, 'x', 50, {
                target: tx,
            });
            App.instance.canvas.animations.addAnimation(star.sprite, 'y', 50, {
                target: ty,
            });
        }
    }

    private _onMouseOut(e: MouseEvent | PIXI.InteractionEvent | TouchEvent) {
        Events.emit(Event.SPACE_POINTER_OUT, { base: e });
    }

    private _populateStars() {
        const { innerWidth, innerHeight } = window;

        // We multiply by devicePixelRatio to keep the same ratio even with screen zoom
        const spaceSize = innerWidth * innerHeight * Space.STAR_RATIO * window.devicePixelRatio;

        for (let i = 0; i < spaceSize; i++) {
            const star = Star.random();

            this._stars.push(star);
        }
    }

    private _drawSpace() {
        this._container.addChild(...this._stars.map((s: Star) => s.sprite));
    }

    public get startView(): StartView {
        return this.getSubmodule(StartView);
    }

    public get hoveringController(): HoveringController {
        return this.getSubmodule(HoveringController);
    }

    public get container(): PIXI.Container {
        return this._container;
    }

    public get stars(): Star[] {
        return this._stars;
    }
}
