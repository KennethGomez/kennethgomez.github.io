export abstract class Module {
    private readonly _submodules: Map<string, Module>;

    protected constructor(
        submodules: Module[] = [],
    ) {
        this._submodules = new Map();

        for (const submodule of submodules) {
            this._submodules.set(submodule.constructor.name, submodule);
        }
    }

    public abstract init(): void;

    protected getSubmodule<T extends Module>(submodule: typeof Module): T {
        return this._submodules.get(submodule.name) as T;
    }

    protected onDispose() {
        // To be implemented by module
    }

    public dispose(): void {
        this.onDispose();

        for (const submodule of this._submodules.values()) {
            submodule.dispose();
        }
    }
}
