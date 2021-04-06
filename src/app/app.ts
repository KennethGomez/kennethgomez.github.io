import { Module } from './module/module.abstract';
import { Canvas } from './canvas/canvas';

export class App extends Module {
    public static _instance: App = new App();

    public static get instance() {
        return this._instance;
    }

    public constructor() {
        super([
            new Canvas(),
        ]);
    }

    public get canvas(): Canvas {
        return this.getSubmodule(Canvas);
    }
}
