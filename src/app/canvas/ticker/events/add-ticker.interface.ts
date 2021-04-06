import { IEventData } from '../../../events/event-data.interface';

import { AbstractTicker } from '../ticker.abstract';

export interface IAddTicker extends IEventData{
    ticker: AbstractTicker
}
