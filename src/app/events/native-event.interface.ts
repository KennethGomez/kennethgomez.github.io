import { IEventData } from './event-data.interface';

export interface INativeEvent<T> extends IEventData {
    base: T
}
