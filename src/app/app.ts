import { Module } from './module/module.abstract';
import { Canvas } from './canvas/canvas';
import { Layout } from './layout/layout';

export class App extends Module {
    public static _instance: App = new App();

    public static get instance() {
        return this._instance;
    }

    public constructor() {
        super([
            new Canvas(),
            new Layout(),
        ]);
    }

    public get canvas(): Canvas {
        return this.getSubmodule(Canvas);
    }
}
