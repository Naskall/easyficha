import { ActivatedRoute } from "@angular/router";
import { AuthService } from "./../../../services/auth.service";
import { Component, OnInit, Input } from "@angular/core";
import { ClientService } from "./../../../services/client.service";
import {
  ToastController,
  LoadingController,
  AlertController
} from "@ionic/angular";
import { Subscription } from "rxjs";
import { Client } from "src/app/interfaces/client";

@Component({
  selector: "app-clients-list",
  templateUrl: "./clients-list.page.html",
  styleUrls: ["./clients-list.page.scss"]
})
export class ClientsListPage implements OnInit {
  private loading: any;
  public clients = new Array<Client>();
  public searchText: string = "";
  private clientId: string = null;
  private clientSubscription: Subscription;

  constructor(
    private toastCtrl: ToastController,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private clientService: ClientService,
    public alertCtrl: AlertController
  ) {
    this.clientSubscription = this.clientService
      .getClients()
      .subscribe(data => {
        this.clients = data;
      });
  }
  ngOnDestroy() {
    if (this.clientSubscription) this.clientSubscription.unsubscribe();
  }
  ngOnInit() {}

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: "Carregando..." });
    return this.loading.present();
  }
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
  filterClients(event) {
    const text = event.target.value;
    this.searchText = text;
  }
  async deleteAlertConfirm(id: string) {
    const alert = await this.alertCtrl.create({
      header: "Tem certeza?",
      message: "Você irá apagar este registro, está certo disso?",
      buttons: [
        {
          text: "Não",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            return false;
          }
        },
        {
          text: "Sim",
          handler: () => {
            try {
              this.clientService.deleteClient(id);
            } catch (error) {
              this.presentToast("Erro ao tentar apagar esta pessoa");
            }
          }
        }
      ]
    });
    await alert.present();
  }
}
