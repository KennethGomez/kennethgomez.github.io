import * as PIXI from 'pixi.js';

import { Module } from '../../api/module/module.abstract';
import { Event } from '../../events/event.enum';
import { Events } from '../../events/events';

import { Star } from './star/star';

export class Space extends Module {
    /**
     * Amount of stars per pixel²
     */
    public static readonly STAR_RATIO = 0.005;

    private readonly _stars: Star[];
    private readonly _container: PIXI.Container;

    public constructor() {
        super();

        this._stars = [];
        this._container = new PIXI.Container();
    }

    protected onInit(): void {
        this._populateStars();
        this._drawSpace();

        Events.emit(Event.INIT_SPACE);
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
}
