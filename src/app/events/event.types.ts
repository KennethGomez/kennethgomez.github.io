import { IEventData } from './event-data.interface';

export type EventCallback<T extends IEventData> = (data?: T) => void
