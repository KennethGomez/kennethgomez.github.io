import { Module } from '../../api/module/module.abstract';
import { Position } from '../../api/canvas/canvas.types';
import { getBetween } from '../../utils/numbers';
import { toHex } from '../../utils/color';
import { App } from '../../app';

import { Star } from './star/star';

export class Space extends Module {
    public static readonly STAR_COUNT = 2500;

    private readonly _stars: Star[];

    public constructor() {
        super();

        this._stars = [];
    }

    public init(): void {
        this._populateStars();
        this._drawSpace();
    }

    private _populateStars() {
        for (let i = 0; i < Space.STAR_COUNT; i++) {
            const position = this._getStarPosition();
            const brightness = getBetween(0, 0xFF);

            const star = new Star(position, 1, brightness, 0xABCDEF);

            this._stars.push(star);
        }
    }

    private _getStarPosition(): Position {
        const w = App.instance.canvas.view.width;
        const h = App.instance.canvas.view.height;

        return {
            x: getBetween(0, w),
            y: getBetween(0, h),
        };
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
