import { Module } from '@kennethgomez/module/module.abstract';

import { Star } from '../../star/star';

import { HoveringController } from './hovering-controller/hovering-controller';
import { FocusController } from './focus-controller/focus-controller';

export class StartView extends Module {
    private _stars: Star[] | unknown;

    public constructor() {
        super([
            new HoveringController(),
            new FocusController(),
        ]);
    }

    public start(stars: Star[]) {
        this._stars = stars;

        this.hoveringController.start();
        this.focusController.start();
    }

    public get hoveringController(): HoveringController {
        return this.getSubmodule(HoveringController);
    }

    public get focusController(): FocusController {
        return this.getSubmodule(FocusController);
    }
}
