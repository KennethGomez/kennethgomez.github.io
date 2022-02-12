import * as PIXI from 'pixi.js';

import { Module } from '@kennethgomez/module/module.abstract';

import { Animation, AnimationAlgorithm, AnimationValues } from './animation.types';
import { ObservableAnimation } from './observable-animation/observable-animation';
import { easeInOutQuad } from './algorithms/ease-in-out-quad';

export class Animations extends Module {
    private readonly _animations: Map<number, ObservableAnimation<any, any>>;

    private _lastId: number;

    public constructor() {
        super();

        this._animations = new Map();
        this._lastId = 0;
    }

    public addAnimation<T, K>(
        object: T,
        property: keyof T,
        duration: number,
        values: AnimationValues<K>,
        algorithm: AnimationAlgorithm = easeInOutQuad,
    ): ObservableAnimation<T, K> {
        const animations = this._getAnimationObjects(object, property, duration, values, algorithm);

        let observable;

        for (const animation of animations) {
            const id = ++this._lastId;

            observable = this._createAnimationObservable(id, animation);
        }

        return observable as ObservableAnimation<T, K>;
    }

    private _createAnimationObservable<T, K>(id: number, animation: Animation<T, K>) {
        const observable = new ObservableAnimation(id, animation)
            .on('interruption', this._removeAnimation, this)
            .on('finish', this._removeAnimation, this);

        this._animations.set(id, observable);

        return observable;
    }

    private _getAnimationObjects<T, K>(
        object: T,
        property: keyof T,
        duration: number,
        values: AnimationValues<K>,
        algorithm: AnimationAlgorithm = easeInOutQuad,
    ): Animation<T, K>[] {
        return object[property] instanceof PIXI.ObservablePoint
            ? ['x', 'y'].map((p) => ({
                object: object[property] as unknown, property: p, duration, values, algorithm,
            }) as Animation<T, K>)
            : [{
                object, property, duration, values, algorithm,
            }];
    }

    public get(): Map<number, ObservableAnimation<any, any>> {
        return this._animations;
    }

    private _removeAnimation(animation: ObservableAnimation<any, any>) {
        this._animations.delete(animation.id);
    }
}
