import * as PIXI from 'pixi.js';

import { Position } from '../../../api/canvas/canvas.types';
import { getBetween } from '../../../utils/numbers';

import { StarTextureGenerator } from './texture/star-texture-generator';

export class Star {
    /**
     * Star colors matrix on which every (0, y) is probability
     * and (x, 1) is color. If the probability sum is lower than
     * 100 all the rest colors will be filled by the latest color
     *
     * @member Array
     */
    public static readonly STAR_COLORS = [
        [2, 0xEFD4AB], // orange
        [2, 0xEFABAB], // red
        [10, 0xEFABE8], // purple
        [30, 0xABCDEF], // blue
        [30, 0xFFFFFF], // white
    ]
    private static readonly _starColors: number[] = Star._computeStarColorProbabilities();

    private readonly _sprite: PIXI.Sprite;

    // eslint-disable-next-line no-useless-constructor
    public constructor(
        private readonly _position: Position,
        private readonly _size: number,
        private readonly _brightness: number,
        private readonly _color: number,
    ) {
        this._sprite = this._buildSprite();
    }

    private _buildSprite(): PIXI.Sprite {
        const texture = StarTextureGenerator.base;

        const {
            position: { x, y }, size, brightness, color,
        } = this;

        const star = new PIXI.Sprite(texture);

        star.x = x - size / 2;
        star.y = y - size / 2;

        star.tint = color;
        star.alpha = brightness / 0xFF;

        return star;
    }

    public static random(): Star {
        const { innerWidth, innerHeight } = window;

        let brightness = getBetween(1, 0xFF);

        // We multiply by 0.5 so that the star brightness is its 50% at the beginning
        brightness *= 0.5;

        const colorIdx = getBetween(0, 100);
        const color = this._starColors[colorIdx];

        return new Star({
            x: getBetween(0, innerWidth),
            y: getBetween(0, innerHeight),
        }, 1, brightness, color);
    }

    private static _computeStarColorProbabilities(): number[] {
        const colorProbabilities = this.STAR_COLORS;
        const lastColor = colorProbabilities[colorProbabilities.length - 1][1];

        const colors = Array(100).fill(lastColor);

        let lastIdx = 0;

        for (const [p, c] of colorProbabilities) {
            colors.fill(c, lastIdx, p);

            lastIdx += p;
        }

        return colors;
    }

    public get position(): Position {
        return this._position;
    }

    public get size(): number {
        return this._size;
    }

    public get brightness(): number {
        return this._brightness;
    }

    public get color(): number {
        return this._color;
    }

    public get sprite(): PIXI.Sprite {
        return this._sprite;
    }
}
