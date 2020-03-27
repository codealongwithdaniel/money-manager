import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ChartComponent } from './chart/chart.component';
import { EditTransactionComponent } from './edit-transaction/edit-transaction.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { SettingsComponent } from './settings/settings.component';
import { CategoriesComponent } from './categories/categories.component';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    EditTransactionComponent,
    FeedbackComponent,
    SettingsComponent,
    CategoriesComponent,
    AddTransactionComponent,
    AboutComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
