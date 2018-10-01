import { With } from './with';

export class Dweet {

    private _this: string;
    private _by: string;
    private _the: string;
    private _with: Array<With>;

    constructor(thisValue: string, byValue: string, theValue: string, withValues: Array<With>) {
        this._this = thisValue;
        this._by = byValue;
        this._the = theValue;
        this._with = withValues;
    }

    public get this(): string {
        return this._this;
    }
    public set this(value: string) {
        this._this = value;
    }

    public get by(): string {
        return this._by;
    }
    public set by(value: string) {
        this._by = value;
    }

    public get the(): string {
        return this._the;
    }
    public set the(value: string) {
        this._the = value;
    }

    public get with(): Array<With> {
        return this._with;
    }
    public set with(value: Array<With>) {
        this._with = value;
    }

}