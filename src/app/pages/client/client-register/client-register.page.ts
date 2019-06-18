import { AuthService } from "./../../../services/auth.service";
import {
  ToastController,
  LoadingController,
  NavController
} from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";
import { ClientService } from "./../../../services/client.service";
import { Subscription } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { Client } from "src/app/interfaces/client";

@Component({
  selector: "app-client-register",
  templateUrl: "./client-register.page.html",
  styleUrls: ["./client-register.page.scss"]
})
export class ClientRegisterPage implements OnInit {
  private loading: any;
  private clientSubscription: Subscription;
  public client: Client = {};
  private clientId: string = null;
  constructor(
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  async saveClient() {
    await this.presentLoading();
    this.client.userId = this.authService.getAuth().currentUser.uid;

    if (this.clientId) {
      try {
        await this.clientService.updateClient(this.clientId, this.client);
        await this.loading.dismiss();
        this.navCtrl.navigateBack("/clients-list");
        this.presentToast("Pronto, cliente atualizado!");
      } catch (error) {
        this.presentToast("Erro ao tentar atualizar dados");
      }
    } else {
      this.client.createdAt = new Date().getTime();
      try {
        await this.clientService.addClient(this.client);
        await this.loading.dismiss();
        this.navCtrl.navigateBack("/clients-list");
        this.presentToast("Pronto, novo cliente registrado!");
      } catch (error) {
        this.presentToast("Erro ao tentar salvar");
        this.loading.dismiss();
      }
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: "Estou salvando, só um momento..."
    });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
