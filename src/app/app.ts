import { AbstractModule } from '@kennethgomez/module';

import { Canvas } from './canvas';
import { Layout } from './layout';

export class App extends AbstractModule {
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
