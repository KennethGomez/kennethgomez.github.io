import { Module } from '../../api/module/module.abstract';
import { toHex } from '../../utils/color';
import { App } from '../../app';

import { Star } from './star/star';

export class Space extends Module {
    /**
     * Amount of stars per pixel²
     */
    public static readonly STAR_RATIO = 0.005;

    private readonly _stars: Star[];

    public constructor() {
        super();

        this._stars = [];
    }

    protected onInit(): void {
        this._populateStars();
        this._drawSpace();
    }

    private _populateStars() {
        const { width, height } = App.instance.canvas.view;

        // We multiply by devicePixelRatio to keep the same ratio even with screen zoom
        const spaceSize = width * height * Space.STAR_RATIO * window.devicePixelRatio;

        for (let i = 0; i < spaceSize; i++) {
            const star = Star.random();

            this._stars.push(star);
        }
    }

    private _drawSpace() {
        const ctx = App.instance.canvas.context;

        for (const {
            position: { x, y }, size, brightness, color,
        } of this._stars) {
            ctx.fillStyle = toHex(color, brightness);

            ctx.beginPath();
            ctx.arc(x - size / 2, y - size / 2, size, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
}
