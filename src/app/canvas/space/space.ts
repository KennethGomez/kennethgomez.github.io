import * as PIXI from 'pixi.js';

import { AbstractModule } from '@kennethgomez/module';
import { Events, Event } from '@kennethgomez/events';

import { InitStarsTicker } from '../ticker/space/star/init-stars';

import { HoveringController } from './controllers/hovering-controller';
import { LandingView } from './views/landing-view';
import { StartView } from './views/start-view';
import { Star } from './star/star';

export class Space extends AbstractModule {
    /**
     * Amount of star per pixel²
     */
    public static readonly STAR_RATIO = 0.008;

    private readonly _stars: Star[];
    private readonly _container: PIXI.Container;

    public constructor() {
        super([
            new StartView(),
            new LandingView(),
            new HoveringController(),
        ]);

        this._stars = [];
        this._container = new PIXI.Container();

        this._container.interactive = true;
        this._container.interactiveChildren = false;
        this._container.on('pointermove', (e) => Events.emit(Event.SPACE_POINTER_MOVE, { base: e }));

        window.addEventListener('mouseout', this._onMouseOut);
        window.addEventListener('touchend', this._onMouseOut);
    }

    protected onInit(): void {
        this._populateStars();
        this._drawSpace();

        Events.emit(Event.ADD_TICKER, { ticker: new InitStarsTicker(this._stars) });

        Events.on(Event.SPACE_INITIALIZED, this._onSpaceInitialized, this);
        Events.on(Event.START_BUTTON_CLICK, this._onStart, this);
    }

    protected onDispose() {
        this._container.destroy({ children: true });

        window.removeEventListener('mouseout', this._onMouseOut);
        window.removeEventListener('touchend', this._onMouseOut);
    }

    public addChild(...objects: PIXI.DisplayObject[]) {
        this._container.addChild(...objects);
    }

    private _onSpaceInitialized() {
        this.startView.start();
        this.hoveringController.start();
    }

    private _onStart() {
        const stars = this.startView.focusController.nearStartButtonStars;

        this.startView.dispose();

        Events.removeListener(Event.START_BUTTON_CLICK, this._onStart, this);

        this.landingView.start(stars);
    }

    private _onMouseOut(e: MouseEvent | PIXI.InteractionEvent | TouchEvent) {
        Events.emit(Event.SPACE_POINTER_OUT, { base: e });
    }

    private _populateStars() {
        const { innerWidth, innerHeight } = window;

        // We multiply by devicePixelRatio to keep the same ratio even with screen zoom
        const spaceSize = innerWidth * innerHeight * Space.STAR_RATIO * window.devicePixelRatio;

        for (let i = 0; i < spaceSize; i++) {
            const star = Star.random();

            this._stars.push(star);
        }
    }

    private _drawSpace() {
        this._container.addChild(...this._stars.map((s: Star) => s.sprite));
    }

    public get startView(): StartView {
        return this.getSubmodule(StartView);
    }

    public get landingView(): LandingView {
        return this.getSubmodule(LandingView);
    }

    public get hoveringController(): HoveringController {
        return this.getSubmodule(HoveringController);
    }

    public get container(): PIXI.Container {
        return this._container;
    }

    public get stars(): Star[] {
        return this._stars;
    }
}
