export interface IEventData {}

export type EventCallback = <T extends IEventData>(data?: T) => void
