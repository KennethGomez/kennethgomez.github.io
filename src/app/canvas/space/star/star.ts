import * as PIXI from 'pixi.js';

import { Position } from '../../canvas.types';
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
            position: { x, y }, size, color,
        } = this;

        const star = new PIXI.Sprite(texture);

        star.x = x - size / 2;
        star.y = window.innerHeight;
        star.scale.set(size);

        star.tint = color;
        // Initialize alpha as 0 so that we can make use of fadeIn animations
        star.alpha = 0;

        return star;
    }

    public static random(): Star {
        const { innerWidth, innerHeight } = window;

        // We divide by 4 so that the star brightness is always lower than 50%
        const brightness = getBetween(20, 0xFF / 4);

        // Given probability get size
        const size = getBetween(1, 10) === 1 ? 2 : 1;

        const colorIdx = getBetween(0, 100);
        const color = this._starColors[colorIdx];

        return new Star({
            x: getBetween(0, innerWidth),
            y: getBetween(0, innerHeight),
        }, size, brightness, color);
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
