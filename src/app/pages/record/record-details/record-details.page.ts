import { ClientService } from "./../../../services/client.service";
import { Client } from "src/app/interfaces/client";
import { RecordService } from "./../../../services/record.service";
import { AuthService } from "./../../../services/auth.service";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { CustomerRecord } from "src/app/interfaces/record";
import {
  NavController,
  LoadingController,
  ToastController,
  AlertController
} from "@ionic/angular";
import { Subscription } from "rxjs";

@Component({
  selector: "app-record-details",
  templateUrl: "./record-details.page.html",
  styleUrls: ["./record-details.page.scss"]
})
export class RecordDetailsPage implements OnInit {
  private recordId: string = null;
  private clientId: string = null;
  private client: Client = {};
  private customerRecord: CustomerRecord = {};
  private loading: any;
  private recordSubscription: Subscription;
  private clientSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private recordService: RecordService,
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.recordId = this.activatedRoute.snapshot.paramMap.get("id");
    this.loadRecord();

    console.log(this.recordId);
  }
  ngOnDestroy() {
    if (this.recordSubscription) this.recordSubscription.unsubscribe();
  }
  loadRecord() {
    this.recordSubscription = this.recordService
      .getRecord(this.recordId)
      .subscribe(data => {
        this.customerRecord = data;
      });
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
              this.recordService.deleteRecord(id);
              this.navCtrl.navigateBack("/record-list");
            } catch (error) {
              this.presentToast("Erro ao tentar apagar esta ficha");
            }
          }
        }
      ]
    });
    await alert.present();
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
