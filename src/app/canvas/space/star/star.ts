import { Position } from '../../../api/canvas/canvas.types';

export class Star {
    // eslint-disable-next-line no-useless-constructor
    public constructor(
        private readonly _position: Position,
        private readonly _size: number,
        private readonly _brightness: number,
        private readonly _color: number,
    ) {
        //
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
