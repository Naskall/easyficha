import { CallNumber } from "@ionic-native/call-number/ngx";
import { PipesModule } from "./pipes/pipes.module";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { AngularFireModule } from "@angular/fire";
import { environment } from "src/environments/environment";
import { AngularFireAuthModule } from "@Angular/fire/auth";
import { AngularFirestoreModule } from "@Angular/fire/firestore";
import { BrMaskerModule } from "br-mask";
import { Http, HttpModule } from "@angular/http";
import { ViacepProvider } from "src/providers/viacep/viacep.provider";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    PipesModule,
    BrMaskerModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    StatusBar,
    CallNumber,
    ViacepProvider,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
