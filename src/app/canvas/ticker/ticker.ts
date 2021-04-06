import { Module } from '../../module/module.abstract';
import { Event } from '../../events/event.enum';
import { Events } from '../../events/events';

import { AbstractTicker } from './ticker.abstract';
import { IAddTicker } from './events/add-ticker.interface';

export class Ticker extends Module {
    private readonly _tickers: AbstractTicker[];

    public constructor() {
        super();

        this._tickers = [];
    }

    protected onInit() {
        Events.on(Event.ADD_TICKER, this._addTicker, this);
    }

    public update(delta: number) {
        this._removeDisposedTickers();

        for (const ticker of this._tickers) {
            ticker.update(delta);
        }
    }

    private _removeDisposedTickers() {
        const tickers = [...this._tickers];

        for (const ticker of tickers) {
            if (ticker.disposed) {
                const idx = this._tickers.indexOf(ticker);

                this._tickers.splice(idx);
            }
        }
    }

    private _addTicker(data?: IAddTicker) {
        if (data) {
            this._tickers.push(data.ticker);
        }
    }
}
