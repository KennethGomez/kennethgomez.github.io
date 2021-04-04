import { Module } from '../../api/module/module.abstract';
import { App } from '../../app';

export class Space extends Module {
    public init(): void {
        console.log(App.instance.canvas.context);
    }
}
