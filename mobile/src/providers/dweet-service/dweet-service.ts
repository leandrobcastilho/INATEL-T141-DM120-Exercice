import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DweetSettingsEnum } from './../../enum/DweetSettingsEnum';
import { Content } from './../../models/content';
import { With } from './../../models/with';
import { Dweet } from './../../models/dweet';

/*
  Generated class for the DweetServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class DweetServiceProvider {

  private dweetioApiUrlGet = DweetSettingsEnum.DWEET_URL_GET_ALL;
  private dweetioApiUrlPut = DweetSettingsEnum.DWEET_URL_PUT_ALARM;
  private dweetioApiUrlGetLatest = DweetSettingsEnum.DWEET_URL_GET_ALL_LATEST;

  constructor(public http: HttpClient) {
    console.log("["+Date.now()+"] Hello DweetServiceProvider Provider");
  }

  loadDweets(thingName: string) {
    //console.log("["+Date.now()+"] DweetServiceProvider - loadDweets [IN]");
    var urlGet = this.dweetioApiUrlGet + thingName;
    console.log("["+Date.now()+"] DweetServiceProvider - loadDweets - get ");
    return this.http.get(urlGet);
    //console.log("["+Date.now()+"] DweetServiceProvider - loadDweets [OUT]");
  }

  loadLatestDweets(thingName: string) {
    //console.log("["+Date.now()+"] DweetServiceProvider - loadLatestDweets [IN]");
    var urlGet = this.dweetioApiUrlGetLatest + thingName;
    console.log("["+Date.now()+"] DweetServiceProvider - loadLatestDweets - get ");
    return this.http.get(urlGet);
    //console.log("["+Date.now()+"] DweetServiceProvider - loadLatestDweets [OUT]");
  }

  sendDweetAlarm(thingName: string, value: string) {
    //console.log("["+Date.now()+"] DweetServiceProvider - sendDweetAlarm [IN]");
    var urlPost = this.dweetioApiUrlPut + thingName;
    var body = {
      alarmeActiveted: value
    };
    console.log("["+Date.now()+"] DweetServiceProvider - sendDweetAlarm - post ");
    this.http.post(urlPost, body)
      .subscribe(
        data => {
          console.log("["+Date.now()+"] DweetServiceProvider - sendDweetAlarm - OK ");
        },
        err => console.log()
      );
    //console.log("["+Date.now()+"] DweetServiceProvider - sendDweetAlarm [OUT]");
  }

  preencherDweet(data: any) {
    //console.log("["+Date.now()+"] DweetServiceProvider - preencherDweet [IN]");
    var serviceDweet: Dweet;
    var serviceWiths: Array<With>;
    var serviceDate: string;
    var serviceTime: string;

    serviceWiths = new Array<With>();

    for (var serviceWith of data.with) {
      let dataContent: Content;
      dataContent = new Content(serviceWith.content.temperatureCelsius, serviceWith.content.luminosityLux, serviceWith.content.touchPress, serviceWith.content.alarmeActiveted, serviceWith.content.status);

      serviceDate = this.formatDate(serviceWith.created);
      serviceTime = this.formatTime(serviceWith.created);

      var objWith: With;
      objWith = new With(serviceWith.thing, serviceWith.created, dataContent, serviceDate, serviceTime);

      serviceWiths.push(objWith);
    }

    serviceDweet = new Dweet(data.this, data.by, data.the, serviceWiths);
    //console.log("["+Date.now()+"] DweetServiceProvider - preencherDweet [OUT]");
    return serviceDweet;
  }


  private formatDate(date: any): string {
    //console.log("["+Date.now()+"] DweetServiceProvider - formatDate [IN]");
    let originalDate: string = date;
    var dateParse = originalDate.slice(0, 10);
    //console.log("["+Date.now()+"] DweetServiceProvider - formatDate [OUT]");
    return dateParse;
  }

  private formatTime(date: any): string {
    //console.log("["+Date.now()+"] DweetServiceProvider - formatTime [IN]");
    let originalDate: string = date;
    var timeParse = originalDate.slice(11, 19);
    //console.log("["+Date.now()+"] DweetServiceProvider - formatTime [OUT]");
    return timeParse;
  }

}
