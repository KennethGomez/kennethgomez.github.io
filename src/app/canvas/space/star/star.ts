import { Position } from '../../../api/canvas/canvas.types';
import { getBetween } from '../../../utils/numbers';
import { App } from '../../../app';

export class Star {
    /**
     * Star colors matrix on which every (0, y) is probability
     * and (x, 1) is color. If the probability sum is lower than
     * 100 all the rest colors will be filled by the latest color
     *
     * @member Array
     */
    public static readonly STAR_COLORS = [
        [2, 0x695314],
        [30, 0xABCDEF],
        [30, 0xFFFFFF],
    ]

    private static readonly _starColors: number[] = Star._computeStarColorProbabilities();

    // eslint-disable-next-line no-useless-constructor
    public constructor(
        private readonly _position: Position,
        private readonly _size: number,
        private readonly _brightness: number,
        private readonly _color: number,
    ) {
        //
    }

    public static random(): Star {
        const w = App.instance.canvas.view.width;
        const h = App.instance.canvas.view.height;

        const brightness = getBetween(1, 0xFF);

        const colorIdx = getBetween(0, 100);
        const color = this._starColors[colorIdx];

        return new Star({
            x: getBetween(0, w),
            y: getBetween(0, h),
        }, 1, brightness, color);
    }

    private static _computeStarColorProbabilities(): number[] {
        const colorProbabilities = Star.STAR_COLORS;
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
}
