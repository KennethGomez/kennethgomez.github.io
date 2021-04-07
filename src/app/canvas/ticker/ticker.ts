import { Module } from '../../module/module.abstract';
import { Event } from '../../events/event.enum';
import { Events } from '../../events/events';

import { AbstractTicker } from './ticker.abstract';
import { IAddTicker } from './events/add-ticker.interface';

export class Ticker extends Module {
    private _tickers: AbstractTicker[];

    public constructor() {
        super();

        this._tickers = [];
    }

    protected onInit() {
        Events.on(Event.ADD_TICKER, this._addTicker, this);
    }

    protected onDispose() {
        for (const ticker of this._tickers) {
            ticker.dispose();
        }
    }

    public update(delta: number) {
        this._tickers = this._tickers.filter((t: AbstractTicker) => !t.disposed);

        for (const ticker of this._tickers) {
            ticker.update(delta);
        }
    }

    private _addTicker(data?: IAddTicker) {
        if (data) {
            this._tickers.push(data.ticker);
        }
    }
}
