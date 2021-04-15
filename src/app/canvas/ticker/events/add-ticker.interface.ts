import { IEventData } from '@kennethgomez/events';

import { AbstractTicker } from '../ticker.abstract';

export interface IAddTicker extends IEventData{
    ticker: AbstractTicker
}
