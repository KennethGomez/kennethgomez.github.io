import { Module } from '../module/module.abstract';
import { Event } from '../events/event.enum';
import { Events } from '../events/events';

export class Layout extends Module {
    public constructor() {
        super();

        Events.on(Event.SPACE_INITIALIZED, this._onSpaceInitialized.bind(this));
    }

    private _onSpaceInitialized() {
        for (const btn of document.querySelectorAll('button[is=space-button]')) {
            if (!(btn instanceof HTMLButtonElement)) {
                continue;
            }

            btn.addEventListener('mouseover', this._onSpaceButtonHover.bind(this));
            btn.addEventListener('mouseout', this._onSpaceButtonOut.bind(this));
        }
    }

    private _onSpaceButtonHover(e: MouseEvent) {
        Events.emit(Event.SPACE_BUTTON_HOVER, { base: e });
    }

    private _onSpaceButtonOut(e: MouseEvent) {
        Events.emit(Event.SPACE_BUTTON_OUT, { base: e });
    }
}
