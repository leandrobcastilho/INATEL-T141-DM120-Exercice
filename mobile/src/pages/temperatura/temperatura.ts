import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DweetSettingsEnum } from './../../enum/DweetSettingsEnum';
import { DweetServiceProvider } from './../../providers/dweet-service/dweet-service';
import { Dweet } from './../../models/dweet';

/**
 * Generated class for the TemperaturaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-temperatura',
  templateUrl: 'temperatura.html'
})

export class TemperaturaPage {

  private thingName: any;
  private dweet: Dweet;
  private isLoading: boolean = true;
  private time: any;
  private dataPlot: Array<any>;

  options: Object;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dweetService: DweetServiceProvider) {
    this.time = setInterval(() => { this.getLastDweets() }, 3000);
  }

  ionViewDidLoad() {
    console.log("["+Date.now()+"] Welcome to the temperature page");
  }

  ngOnInit() {
    //console.log("["+Date.now()+"] TemperaturaPage - ngOnInit [IN]");
    this.thingName = DweetSettingsEnum.DWEET_THING_NAME;
    this.getLastDweets();
    //console.log("["+Date.now()+"] TemperaturaPage - ngOnInit [OUT]");
  }

  ngOnDestroy() {
    //console.log("["+Date.now()+"] TemperaturaPage - ngOnDestroy [IN]");
    clearInterval(this.time);
    //console.log("["+Date.now()+"] TemperaturaPage - ngOnDestroy [OUT]");
  }

  private getLastDweets() {
    //console.log("["+Date.now()+"] TemperaturaPage - getLastDweets [IN]");
    this.dataPlot = [];
    this.dweetService.loadDweets(this.thingName).subscribe(
      data => {
        this.preencherDweet(data);
      },
      err => console.log(),
      () => this.isLoading = false
    );
    //console.log("["+Date.now()+"] TemperaturaPage - getLastDweets [OUT]");
  }

  private preencherDweet(data: any) {
    //console.log("["+Date.now()+"] TemperaturaPage - preencherDweet [IN]");
    this.dweet = this.dweetService.preencherDweet(data);
    this.loadDataForPlot(this.dweet);
    this.plotChart();
    //console.log("["+Date.now()+"] TemperaturaPage - preencherDweet [OUT]");
  }

  private loadDataForPlot(dweet: Dweet) {
    //console.log("["+Date.now()+"] TemperaturaPage - loadDataForPlot [IN]");
    //console.log("["+Date.now()+"] TemperaturaPage - loadDataForPlot - dweet " + dweet);
    for (let _with of dweet.with) {
      let epoch = new Date(_with.created).getTime();
      this.dataPlot.push([epoch, _with.content.temperatureCelsius]);
      console.log("["+Date.now()+"] temperatura: " + _with.content.temperatureCelsius);
    }
    //console.log(this.dataPlot);
    //console.log("["+Date.now()+"] TemperaturaPage - loadDataForPlot [OUT]");
  }

  private plotChart() {
    //console.log("["+Date.now()+"] TemperaturaPage - plotChart [IN]");
    this.options = {
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        labels: {
          formatter: function () {
            return this.value + " °C";
          }
        },
      },
      title: { text: 'Temperature ' },
      series: [{
        name: 'Temperature',
        data: this.dataPlot.reverse(),
        pointInteval: 60 * 60
      }]
    };
    //console.log("["+Date.now()+"] TemperaturaPage - plotChart [OUT]");
  }

}
