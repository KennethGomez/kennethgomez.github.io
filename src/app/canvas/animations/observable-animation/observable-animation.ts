import { Animation } from '../animation.types';

type ObservableEvent = 'update' | 'finish' | 'interruption';

export class ObservableAnimation<T, K> {
    private readonly _subscriptions: Map<ObservableEvent, ((a: this) => void)[]>

    private _currentValue: K;
    private _progress: number;

    public constructor(
        private readonly _id: number,
        private readonly _data: Animation<T, K>,
    ) {
        this._subscriptions = new Map();

        const { object, property, values } = this._data;

        const current = object[property] as unknown as K;

        if (!values.initial) {
            values.initial = current;
        }

        this._currentValue = values.initial;
        this._progress = 0;
    }

    public on(event: ObservableEvent, callback: (a: this) => void, context?: any): ObservableAnimation<T, K> {
        const subscriptions = this._subscriptions.get(event);
        const bind = callback.bind(context);

        this._subscriptions.set(event, subscriptions ? [...subscriptions, bind] : [bind]);

        return this;
    }

    public updateProgress() {
        this._progress++;

        if (this._progress >= this._data.duration) {
            this._emit('finish');
        }
    }

    public update(value: K) {
        this._currentValue = value;

        this._emit('update');
    }

    public interrupt() {
        this._emit('interruption');
    }

    public finish() {
        this._emit('finish');
    }

    private _emit(event: ObservableEvent) {
        for (const subscription of this._subscriptions.get(event) ?? []) {
            subscription(this);
        }
    }

    public get id(): number {
        return this._id;
    }

    public get data(): Animation<T, K> {
        return this._data;
    }

    public get progress(): number {
        return this._progress;
    }
}
