import { Content } from './content';

export class With {

    private _thing: string;
    private _created: string;
    private _content: Content;
    private _date: string;
    private _time: string;

    constructor(thing: string, created: string, content: Content, date: string, time: string) {
        this._thing = thing;
        this._created = created;
        this._content = content;
        this._date = date;
        this._time = time;
    }

    public get thing(): string {
        return this._thing;
    }
    public set thing(value: string) {
        this._thing = value;
    }

    public get created(): string {
        return this._created;
    }
    public set created(value: string) {
        this._created = value;
    }

    public get content(): Content {
        return this._content;
    }
    public set content(value: Content) {
        this._content = value;
    }

    public get date(): string {
        return this._date;
    }
    public set date(value: string) {
        this._date = value;
    }

    public get time(): string {
        return this._time;
    }
    public set time(value: string) {
        this._time = value;
    }

}