import * as PIXI from 'pixi.js';

import { Module } from '../module/module.abstract';

import { Space } from './space/space';
import { Ticker } from './ticker/ticker';

export class Canvas extends Module {
    public static readonly CANVAS_BACKGROUND: number = 0x101010;

    private readonly _app: PIXI.Application;

    private readonly _viewCanvas: HTMLCanvasElement;

    public constructor() {
        super([
            new Ticker(),
            new Space(),
        ]);

        this._app = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: Canvas.CANVAS_BACKGROUND,
        });

        this._viewCanvas = this.viewCanvas;
    }

    protected onInit() {
        this._viewCanvas.appendChild(this._app.view);

        this._app.ticker.add(this.ticker.update, this.ticker);

        this._app.stage.addChild(this.space.container);
    }

    public get viewCanvas(): HTMLCanvasElement {
        if (this._viewCanvas) {
            return this._viewCanvas;
        }

        const view = document.getElementById('background-canvas');

        if (!view) {
            throw new Error('Canvas element does not exist on document');
        }

        return view as HTMLCanvasElement;
    }

    public get ticker(): Ticker {
        return this.getSubmodule(Ticker);
    }

    public get space(): Space {
        return this.getSubmodule(Space);
    }

    public get app(): PIXI.Application {
        return this._app;
    }
}
