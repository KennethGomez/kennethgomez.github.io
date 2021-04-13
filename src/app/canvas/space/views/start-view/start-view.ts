import { Module } from '@kennethgomez/module/module.abstract';

import { FocusController } from '../../controllers/focus-controller/focus-controller';

export class StartView extends Module {
    public constructor() {
        super([
            new FocusController(),
        ]);
    }

    public start() {
        this.focusController.start();
    }

    public get focusController(): FocusController {
        return this.getSubmodule(FocusController);
    }
}
