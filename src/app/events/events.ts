import { IEventData } from './event-data.interface';
import { EventCallback } from './event.types';
import { Event } from './event.enum';

export class Events {
    private static readonly _subscriptions: Map<Event, EventCallback<any>[]> = new Map();

    public static on<T extends IEventData>(event: Event, callback: EventCallback<T>, context?: any) {
        const subscriptions = this._subscriptions.get(event);
        const bind = callback.bind(context);

        this._subscriptions.set(event, subscriptions ? [...subscriptions, bind] : [bind]);
    }

    public static emit<T extends IEventData>(event: Event, data?: T) {
        for (const subscription of this._subscriptions.get(event) ?? []) {
            subscription(data);
        }
    }
}
