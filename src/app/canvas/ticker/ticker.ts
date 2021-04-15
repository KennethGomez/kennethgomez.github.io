import { AbstractModule } from '@kennethgomez/module';
import { Events, Event } from '@kennethgomez/events';

import { AnimationTicker } from './animation/animation-ticker';
import { IAddTicker } from './events/add-ticker.interface';
import { AbstractTicker } from './ticker.abstract';

export class Ticker extends AbstractModule {
    private _tickers: AbstractTicker[];

    public constructor() {
        super();

        this._tickers = [
            new AnimationTicker(),
        ];
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
