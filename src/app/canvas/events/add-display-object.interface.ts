import * as PIXI from 'pixi.js';

import { IEventData } from '../../events/event-data.interface';

export interface IAddDisplayObject extends IEventData {
    object: PIXI.DisplayObject
}
