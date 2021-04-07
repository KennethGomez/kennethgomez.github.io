import * as PIXI from 'pixi.js';

import { INativeEvent } from '../../../../../events/native-event.interface';
import { Events } from '../../../../../events/events';
import { Event } from '../../../../../events/event.enum';
import { App } from '../../../../../app';

import { Star } from '../../../../space/star/star';

import { AbstractTicker } from '../../../ticker.abstract';

export class StarInteractionTicker extends AbstractTicker {
    public constructor() {
        super();

        Events.on(Event.SPACE_POINTER_MOVE, this._onSpacePointerOver, this);
    }

    public update(delta: number): void {
    }

    private _onSpacePointerOver(event?: INativeEvent<PIXI.InteractionEvent>) {
        if (!event) {
            return;
        }

        const { base } = event;

        for (const star of this._getClosePointChilds(base)) {
            star.sprite.alpha = 1;
        }
    }

    private _getClosePointChilds(event: PIXI.InteractionEvent): Star[] {
        const { x: pX, y: pY } = event.data.global;

        return App.instance.canvas.space.stars.filter(({ sprite: { x, y } }: Star) => {
            const distance = Math.sqrt(Math.abs(x - pX) ** 2 + Math.abs(y - pY) ** 2);

            return distance < 30;
        });
    }
}
