export class A {
    public constructor(private readonly _b: string) {
        //
        console.log('init a');
    }

    public start() {
        console.log(this._b);
    }
}
