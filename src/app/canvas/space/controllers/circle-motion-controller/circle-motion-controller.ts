import * as PIXI from 'pixi.js';

import { Module } from '@kennethgomez/module/module.abstract';
import { App } from '@kennethgomez/app';

import { ObservableAnimation } from '../../../animations/observable-animation/observable-animation';

export class CircleMotionController extends Module {
    public static readonly CIRCLE_SIZE = 10;
    public static readonly CIRCLE_OFFSET = 25;

    public splitStars(stars: PIXI.Sprite[]): PIXI.Sprite[][] {
        const splitIdx = Math.ceil(stars.length / 3);

        const circles = [];

        circles.push(stars.slice(0, splitIdx));
        circles.push(stars.slice(splitIdx, splitIdx * 2));
        circles.push(stars.slice(splitIdx * 2));

        return circles;
    }

    public makeCircle(
        stars: PIXI.Container, x: number, y: number,
    ): ObservableAnimation<PIXI.DisplayObject, number> | undefined {
        const n = stars.children.length;
        const increment = 360 / n;
        const startAngle = 0;

        let lastAnimation;

        for (let i = 0; i < n; i++) {
            const angle = startAngle + increment * i;
            const rads = (angle * Math.PI) / 180;

            const tx = x + CircleMotionController.CIRCLE_SIZE * Math.cos(rads);
            const ty = y + CircleMotionController.CIRCLE_SIZE * Math.sin(rads);

            const star = stars.children[i];

            star.scale.set(1);

            App.instance.canvas.animations.addAnimation(star, 'x', 50, {
                target: tx,
            });
            App.instance.canvas.animations.addAnimation(star, 'y', 50, {
                target: ty,
            });
            lastAnimation = App.instance.canvas.animations.addAnimation(star, 'alpha', 50, {
                target: 0.5,
            });
        }

        return lastAnimation;
    }

    public moveCircle(
        circle: PIXI.Container, offsetX: number, offsetY: number,
    ): ObservableAnimation<PIXI.Container, number> {
        App.instance.canvas.animations.addAnimation(circle, 'alpha', 20, {
            target: 0.75,
        }).on('finish', () => {
            App.instance.canvas.animations.addAnimation(circle, 'alpha', 20, {
                target: 1,
            });
        });

        App.instance.canvas.animations.addAnimation(circle, 'x', 40, {
            target: circle.x + offsetX,
        });
        return App.instance.canvas.animations.addAnimation(circle, 'y', 40, {
            target: circle.y + offsetY,
        });
    }
}
