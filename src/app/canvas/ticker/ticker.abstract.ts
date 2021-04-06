export abstract class AbstractTicker {
    private _disposed: boolean;

    protected constructor() {
        this._disposed = false;
    }

    public abstract update(delta: number): void;

    protected dispose() {
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }
}
