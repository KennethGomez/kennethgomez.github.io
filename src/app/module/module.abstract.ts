export abstract class AbstractModule {
    private readonly _submodules: Map<string, AbstractModule>;

    protected constructor(
        submodules: AbstractModule[] = [],
    ) {
        this._submodules = new Map();

        for (const submodule of submodules) {
            this._submodules.set(submodule.constructor.name, submodule);
        }
    }

    protected onInit() {
        // To be implemented by module
    }

    public init(): void {
        this.onInit();

        for (const submodule of this._submodules.values()) {
            submodule.init();
        }
    }

    protected getSubmodule<T extends AbstractModule>(submodule: typeof AbstractModule): T {
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
