import { INativeEvent } from '../../../../../events/native-event.interface';
import { get2DVectorToRectDistance } from '../../../../../utils/points';
import { Module } from '../../../../../module/module.abstract';
import { Event } from '../../../../../events/event.enum';
import { Events } from '../../../../../events/events';
import { App } from '../../../../../app';

import { Star } from '../../../star/star';

import { StarPositionAnimation } from '../start-view.types';

export class FocusController extends Module {
    private _stars: Star[] | unknown;

    private readonly _starPositionAnimations: Map<Star, StarPositionAnimation>;

    private _isPositionAnimationRunning: boolean;
    private _bounds: DOMRect | undefined;

    public constructor() {
        super();

        this._starPositionAnimations = new Map();

        this._isPositionAnimationRunning = false;
    }

    public start(stars: Star[]) {
        this._stars = stars;

        // Events.on(Event.SPACE_BUTTON_HOVER, this._onSpaceButtonHover, this);
        // Events.on(Event.SPACE_BUTTON_OUT, this._onSpaceButtonOut, this);
    }

    // private _onSpaceButtonHover(event?: INativeEvent<MouseEvent>) {
    //     if (!event) {
    //         return;
    //     }
    //
    //     const btn = event.base.target;
    //
    //     if (!(btn instanceof HTMLElement)) {
    //         return;
    //     }
    //
    //     const bounds = btn.getBoundingClientRect();
    //
    //     this._bounds = bounds;
    //
    //     // If the animation has not ended yet we should use already
    //     // cloned stars instead of cloning new stars
    //     const stars = this._isPositionAnimationRunning
    //         ? Array.from(this._starPositionAnimations.keys())
    //         : this._getCloseRectChildren(bounds).map((s) => s.clone());
    //
    //     this._addStarPositionAnimations(stars);
    //     this._assignButtonAnimatingStarTargets(stars, bounds);
    // }
    //
    // private _addStarPositionAnimations(stars: Star[]) {
    //     this._addStarsToOldAnimatingStars(stars);
    //
    //     for (const star of stars) {
    //         if (button && !this._buttonAnimatingStars.has(star)) {
    //             this._buttonAnimatingStars.add(star);
    //         }
    //
    //         if (!this._animatingStars.has(star)) {
    //             this._animatingStars.add(star);
    //         }
    //     }
    // }
    //
    // private _onSpaceButtonOut() {
    //     const stars = Array.from(this._buttonAnimatingStarsTarget.keys());
    //
    //     for (const star of stars) {
    //         this._buttonAnimatingStarsTarget.set(star, {
    //             target: {
    //                 targetX: star.position.x,
    //                 targetY: star.position.y,
    //             },
    //             initial: {
    //                 initialX: star.sprite.x,
    //                 initialY: star.sprite.y,
    //             },
    //             progress: 0,
    //             persistent: false,
    //         });
    //     }
    //
    //     this._buttonAnimatingStars.clear();
    //     this._addStarsToOldAnimatingStars();
    // }
    //
    // private _getCloseRectChildren(rect: DOMRect): Star[] {
    //     const {
    //         x: rX, y: rY, width, height,
    //     } = rect;
    //
    //     return App.instance.canvas.space.stars
    //         .filter(({ sprite: { x, y } }: Star) => get2DVectorToRectDistance(x, y, rX, rY, width, height) < 40);
    // }
}
