import { Star } from '../../../space/star/star';

import { AbstractTicker } from '../../ticker.abstract';

export class InitStarsTicker extends AbstractTicker {
    public constructor(
        private readonly _stars: Star[],
    ) {
        super();
    }

    public update(delta: number): void {
        //
    }
}
