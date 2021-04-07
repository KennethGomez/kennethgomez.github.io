export abstract class AbstractTicker {
    private _disposed: boolean;

    protected constructor() {
        this._disposed = false;
    }

    public abstract update(delta: number): void;

    protected onDispose() {
        // To be implemented by tickers
    }

    protected dispose() {
        this.onDispose();

        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }
}
