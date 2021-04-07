import * as PIXI from 'pixi.js';

import { Module } from '../../module/module.abstract';
import { Event } from '../../events/event.enum';
import { Events } from '../../events/events';

import { InitStarsTicker } from '../ticker/space/star/init-stars/init-stars-ticker';

import { Star } from './star/star';

export class Space extends Module {
    /**
     * Amount of star per pixel²
     */
    public static readonly STAR_RATIO = 0.005;

    private readonly _stars: Star[];
    private readonly _container: PIXI.Container;

    public constructor() {
        super();

        this._stars = [];
        this._container = new PIXI.Container();

        this._container.interactive = true;
        this._container.interactiveChildren = false;
        this._container.on('pointermove', (e) => Events.emit(Event.SPACE_POINTER_MOVE, { base: e }));

        this._container.on('pointerleave', this._onMouseOut);
        this._container.on('pointerout', this._onMouseOut);

        window.addEventListener('mouseout', this._onMouseOut);
    }

    protected onInit(): void {
        this._populateStars();
        this._drawSpace();

        Events.emit(Event.ADD_TICKER, { ticker: new InitStarsTicker(this._stars) });
    }

    protected onDispose() {
        this._container.destroy({ children: true });

        window.removeEventListener('mouseout', this._onMouseOut);
    }

    private _onMouseOut(e: MouseEvent | PIXI.InteractionEvent) {
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

    public get container(): PIXI.Container {
        return this._container;
    }

    public get stars(): Star[] {
        return this._stars;
    }
}
