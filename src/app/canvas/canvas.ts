import * as PIXI from 'pixi.js';

import { Module } from '../api/module/module.abstract';

import { Space } from './space/space';

export class Canvas extends Module {
    private readonly _app: PIXI.Application;

    private readonly _viewContainer: HTMLCanvasElement;

    public constructor() {
        super([
            new Space(),
        ]);

        this._app = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0x060505,
        });

        this._viewContainer = this.viewContainer;
    }

    protected onInit() {
        this._viewContainer.appendChild(this._app.view);

        this._app.stage.addChild(this.space.container);
    }

    public get viewContainer(): HTMLCanvasElement {
        if (this._viewContainer) {
            return this._viewContainer;
        }

        const view = document.getElementById('background-canvas');

        if (!view) {
            throw new Error('Canvas element does not exist on document');
        }

        return view as HTMLCanvasElement;
    }

    public get space(): Space {
        return this.getSubmodule(Space);
    }

    public get app(): PIXI.Application {
        return this._app;
    }
}
