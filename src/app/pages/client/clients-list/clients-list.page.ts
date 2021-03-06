import { ActivatedRoute } from "@angular/router";
import { AuthService } from "./../../../services/auth.service";
import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { ClientService } from "./../../../services/client.service";
import {
  ToastController,
  LoadingController,
  AlertController,
  IonInfiniteScroll,
  ActionSheetController
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
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  constructor(
    private toastCtrl: ToastController,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private clientService: ClientService,
    public alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController
  ) {
    this.loadData(event);
  }
  loadData(event) {
    setTimeout(() => {
      this.getClients();
      event.target.complete();
      console.log("Done");
      if (this.clients.length == 10) {
        event.target.disabled = true;
      }
    }, 1500);
  }

  ngOnDestroy() {
    if (this.clientSubscription) this.clientSubscription.unsubscribe();
  }
  ngOnInit() {}

  getClients() {
    this.clientSubscription = this.clientService
      .getClients()
      .subscribe(data => {
        this.clients = data;
      });
  }
  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: "Carregando..." });
    return this.loading.present();
  }
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: "Filtrar Por",
      mode: "ios",
      buttons: [
        {
          text: "Cliente"
        },
        {
          text: "Data de Cadastro"
        },
        {
          text: "Cancelar",

          role: "cancel"
        }
      ]
    });
    await actionSheet.present();
  }
  filterClients(event) {
    let text = event.target.value;
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
