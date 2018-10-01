import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TemperaturaPage } from '../temperatura/temperatura';
import { LuminosidadePage } from '../luminosidade/luminosidade';
import { DweetSettingsEnum } from '../../enum/DweetSettingsEnum';
import { DweetServiceProvider } from '../../providers/dweet-service/dweet-service';
import { Dweet } from '../../models/dweet';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class Home {

  private thingName: any;
  private alarmeActiveted: string = "false";
  private status: string = '';
  private touchPress: string = '';

  constructor(public navCtrl: NavController, private dweetService: DweetServiceProvider) {
    this.thingName = DweetSettingsEnum.DWEET_THING_NAME;
    setInterval(() => { this.getUpdate() }, 1000);
  }

  goToTemperaturaPage() {
    //console.log("["+Date.now()+"] Home - goToTemperaturaPage [IN]");
    this.navCtrl.push(TemperaturaPage);
    //console.log("["+Date.now()+"] Home - goToTemperaturaPage [OUT]");
  }

  goToLuminosidadePage() {
    //console.log("["+Date.now()+"] Home - goToLuminosidadePage [IN]");
    this.navCtrl.push(LuminosidadePage);
    //console.log("["+Date.now()+"] Home - goToLuminosidadePage [OUT]");
  }

  activateAlarm($event) {
    //console.log("["+Date.now()+"] Home - activateAlarm [IN]");
    this.dweetService.sendDweetAlarm(this.thingName, $event.value);
    //console.log("["+Date.now()+"] Home - activateAlarm [OUT]");
  }

  getUpdate() {
    //console.log("["+Date.now()+"] Home - getUpdate [IN]");
    this.dweetService.loadLatestDweets(this.thingName).subscribe(
      data => {
        console.log("["+Date.now()+"] Home - getUpdate - data: " + data);
        this.getDweet(data);
      },
      err => console.log()
    );
    //console.log("["+Date.now()+"] Home - getUpdate [OUT]");
  }

  private getDweet(data: any) {
    //console.log("["+Date.now()+"] Home - getDweet [IN]");
    let dweetHome: Dweet;
    dweetHome = this.dweetService.preencherDweet(data);
    console.log("["+Date.now()+"] Home - getDweet - dweetHome " + dweetHome);
    this.status = dweetHome.with[0].content.status;
    this.touchPress = dweetHome.with[0].content.touchPress;
    this.alarmeActiveted = dweetHome.with[0].content.alarmeActiveted;
    //console.log("["+Date.now()+"] Home - getDweet - status " + this.status);
    //console.log("["+Date.now()+"] Home - getDweet - touchPress " + this.touchPress);
    //console.log("["+Date.now()+"] Home - getDweet - alarmeActiveted " + this.alarmeActiveted);
    //console.log("["+Date.now()+"] Home - getDweet [OUT]");
  }

}
