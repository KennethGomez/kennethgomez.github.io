import { AbstractModule } from '@kennethgomez/module';

import { FocusController } from '../../controllers/focus-controller';

export class StartView extends AbstractModule {
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
