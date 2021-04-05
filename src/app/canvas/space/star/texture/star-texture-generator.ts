import * as PIXI from 'pixi.js';

import { App } from '../../../../app';

export class StarTextureGenerator {
    private static _base: PIXI.Texture | undefined;

    private static _buildStarBaseTexture(): PIXI.Texture {
        const g = new PIXI.Graphics();

        g.beginFill(0xFFFFFF);
        g.drawCircle(0, 0, 0.75);
        g.endFill();

        return App.instance.canvas.app.renderer.generateTexture(g);
    }

    public static get base(): PIXI.Texture {
        // eslint-disable-next-line no-return-assign
        return this._base ?? (this._base = this._buildStarBaseTexture());
    }
}
