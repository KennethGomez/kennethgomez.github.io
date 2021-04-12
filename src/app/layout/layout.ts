import { Module } from '@kennethgomez/module/module.abstract';
import { Event } from '@kennethgomez/events/event.enum';
import { Events } from '@kennethgomez/events/events';

export class Layout extends Module {
    public constructor() {
        super();

        Events.on(Event.SPACE_INITIALIZED, this._onSpaceInitialized.bind(this));
    }

    private _onSpaceInitialized() {
        this._displayStartButton();
        this._bindSpaceButtons();
    }

    private _displayStartButton() {
        const btn = document.getElementById('start-btn');

        if (!btn) {
            return;
        }

        btn.style.visibility = 'visible';
        btn.style.opacity = '1';
    }

    private _bindSpaceButtons() {
        for (const btn of document.querySelectorAll('button[is=space-button]')) {
            if (!(btn instanceof HTMLButtonElement)) {
                continue;
            }

            btn.addEventListener('mouseover', this._onSpaceButtonHover.bind(this));
            btn.addEventListener('touchstart', this._onSpaceButtonHover.bind(this));
            btn.addEventListener('mouseout', this._onSpaceButtonOut.bind(this));
            btn.addEventListener('touchend', this._onSpaceButtonOut.bind(this));
        }
    }

    private _onSpaceButtonHover(e: MouseEvent | TouchEvent) {
        Events.emit(Event.SPACE_BUTTON_HOVER, { base: e });
    }

    private _onSpaceButtonOut(e: MouseEvent | TouchEvent) {
        Events.emit(Event.SPACE_BUTTON_OUT, { base: e });
    }
}
