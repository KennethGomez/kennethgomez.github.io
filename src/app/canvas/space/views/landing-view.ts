import { Module } from '@kennethgomez/module/module.abstract';
import { Event } from '@kennethgomez/events/event.enum';
import { Events } from '@kennethgomez/events/events';

import { LoadingController } from '../controllers/loading-controller/loading-controller';
import { Star } from '../star/star';

export class LandingView extends Module {
    public constructor() {
        super([
            new LoadingController(),
        ]);
    }

    public start(stars: Star[]) {
        this.loadingController.start(stars);

        Events.on(Event.LOADING_CONTROLLER_END, this._onLoadingControllerEnd, this);
    }

    private _onLoadingControllerEnd() {
        console.log('end');
    }

    public get loadingController(): LoadingController {
        return this.getSubmodule(LoadingController);
    }
}
