import { AuthService } from "./../../../services/auth.service";
import { Component, OnInit, Input } from "@angular/core";
import { ClientService } from "./../../../services/client.service";
import { ToastController, LoadingController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { Client } from "src/app/interfaces/client";

@Component({
  selector: "app-clients-list",
  templateUrl: "./clients-list.page.html",
  styleUrls: ["./clients-list.page.scss"]
})
export class ClientsListPage implements OnInit {
  private loading: any;
  public client = new Array<Client>();
  private clientSubscription: Subscription;

  constructor(
    private toastCtrl: ToastController,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private clientService: ClientService
  ) {
    this.clientSubscription = this.clientService
      .getClients()
      .subscribe(data => {
        this.client = data;
      });
  }
  ngOnDestroy() {
    this.clientSubscription.unsubscribe();
  }
  ngOnInit() {
    console.log(this.client);
  }

  async deleteClient(id: string) {
    try {
      await this.clientService.deleteClient(id);
    } catch (error) {
      this.presentToast("Erro ao tentar apagar esta pessoa");
    }
  }
  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: "Carregando..." });
    return this.loading.present();
  }
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
}
