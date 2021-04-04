import * as PIXI from 'pixi.js';

import { Module } from '../../api/module/module.abstract';
import { App } from '../../app';

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
        const texture = this._getStarTexture();

        for (const {
            position: { x, y }, size, brightness, color,
        } of this._stars) {
            const star = new PIXI.Sprite(texture);

            star.x = x - size / 2;
            star.y = y - size / 2;

            star.tint = color;
            star.alpha = brightness / 0xFF;

            this._container.addChild(star);
        }
    }

    private _getStarTexture(): PIXI.Texture {
        const g = new PIXI.Graphics();

        g.beginFill(0xFFFFFF);
        g.drawCircle(0, 0, 0.75);
        g.endFill();

        return App.instance.canvas.app.renderer.generateTexture(g);
    }

    public get container(): PIXI.Container {
        return this._container;
    }
}
