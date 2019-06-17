// Verificar push mesmo com o app fechado

import { AuthService } from "./../../services/auth.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSlides, ToastController, LoadingController } from "@ionic/angular";
import { User } from "src/app/interfaces/user";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;

  public userLogin: User = {};
  public userRegister: User = {};
  private loading: any;

  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  segmentChanged(event: any) {
    if (event.detail.value === "login") {
      this.slides.slidePrev();
    } else this.slides.slideNext();
  }
  async login() {
    await this.presentLoading();

    try {
      await this.authService.login(this.userLogin);
      this.loading.dismiss();
    } catch (error) {
      let message: string;
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
    }
  }

  async register() {
    await this.presentLoading();

    try {
      await this.authService.register(this.userRegister);
      this.loading.dismiss();
    } catch (error) {
      let message: string;

      switch (error.code) {
        case "auth/email-already-in-use":
          message = "Este e-mail já foi utilizado.";
          break;
        case "auth/invalid-email":
          message = "Você tem que digitar um e-mail válido.";
      }
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: "Só um instante..."
    });
    return this.loading.present();

    const { role, data } = await this.loading.onDidDismiss();

    console.log("Loading dismissed!");
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
