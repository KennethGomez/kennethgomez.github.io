import '../styles/index.sass';

import { App } from './app/app';

App.instance.init();

class SpaceButton extends HTMLButtonElement {
    public constructor() {
        super();

        this.addEventListener('click', this._onClick);
    }

    private _onClick() {
        console.log('asd');
    }
}

customElements.define('space-button', SpaceButton, { extends: 'button' });
