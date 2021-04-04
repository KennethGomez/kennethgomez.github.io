import { Module } from '../api/module/module.abstract';

import { Space } from './space/space';

export class Canvas extends Module {
    private readonly _view: HTMLCanvasElement;
    private readonly _context: CanvasRenderingContext2D;

    public constructor() {
        super([
            new Space(),
        ]);

        this._view = this.view;
        this._context = this.context;
    }

    public init() {
        this.space.init();
    }

    public get view(): HTMLCanvasElement {
        if (this._view) {
            return this._view;
        }

        const view = document.getElementById('background-canvas');

        if (!view) {
            throw new Error('Canvas element does not exist on document');
        }

        return view as HTMLCanvasElement;
    }

    public get context(): CanvasRenderingContext2D {
        if (this._context) {
            return this._context;
        }

        const context = this._view.getContext('2d');

        if (!context) {
            throw new Error('Cannot retrieve 2d context on canvas');
        }

        return context;
    }

    public get space(): Space {
        return this.getSubmodule(Space);
    }
}
