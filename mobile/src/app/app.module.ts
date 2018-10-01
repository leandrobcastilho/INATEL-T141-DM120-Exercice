import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ChartModule } from 'angular2-highcharts';
import * as highcharts from 'Highcharts';
import { MyApp } from './app.component';
import { Home } from '../pages/home/home';
import { TemperaturaPage } from '../pages/temperatura/temperatura';
import { LuminosidadePage } from '../pages/luminosidade/luminosidade'
import { DweetServiceProvider } from '../providers/dweet-service/dweet-service';
import { HttpClientModule } from '../../node_modules/@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    Home,
    TemperaturaPage,
    LuminosidadePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule,
    ChartModule.forRoot(highcharts),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    TemperaturaPage,
    LuminosidadePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DweetServiceProvider
  ]
})
export class AppModule { };
