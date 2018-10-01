export class Content {

    private _temperatureCelsius: string = "0";
    private _luminosityLux: string = "0";
    private _touchPress: string = "false";
    private _alarmeActiveted: string = "false";
    private _status: string = "";

    constructor(temperatureCelsius: string, luminosityLux: string, touchPress: string, alarmeActiveted: string, status: string) {
        this._temperatureCelsius = temperatureCelsius;
        this._luminosityLux = luminosityLux;
        this._touchPress = touchPress;
        this._alarmeActiveted = alarmeActiveted;
        this._status = status;
    }

    public get temperatureCelsius(): string {
        return this._temperatureCelsius;
    }
    public set temperatureCelsius(value: string) {
        this._temperatureCelsius = value;
    }

    public get luminosityLux(): string {
        return this._luminosityLux;
    }
    public set luminosityLux(value: string) {
        this._luminosityLux = value;
    }

    public get touchPress(): string {
        return this._touchPress;
    }
    public set touchPress(value: string) {
        this._touchPress = value;
    }

    public get alarmeActiveted(): string {
        return this._alarmeActiveted;
    }
    public set alarmeActiveted(value: string) {
        this._alarmeActiveted = value;
    }

    public get status(): string {
        return this._status;
    }
    public set status(value: string) {
        this._status = value;
    }

}