import { CustomerRecord } from "src/app/interfaces/record";
import { CallNumber } from "@ionic-native/call-number/ngx";
import { RecordService } from "./../../../services/record.service";
import { AuthService } from "./../../../services/auth.service";
import { ActivatedRoute } from "@angular/router";
import { ClientService } from "./../../../services/client.service";
import { Component, OnInit } from "@angular/core";
import { Client } from "src/app/interfaces/client";
import {
  NavController,
  LoadingController,
  ToastController,
  AlertController
} from "@ionic/angular";
import { Subscription } from "rxjs";

@Component({
  selector: "app-client-details",
  templateUrl: "./client-details.page.html",
  styleUrls: ["./client-details.page.scss"]
})
export class ClientDetailsPage implements OnInit {
  private clientId: string = null;
  private client: Client = {};
  private customerRecord: any;
  private loading: any;
  private clientSubscription: Subscription;
  private recordSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private clientService: ClientService,
    private customRecordService: RecordService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private callNumber: CallNumber
  ) {}

  ngOnInit() {
    this.clientId = this.activatedRoute.snapshot.paramMap.get("id");
    this.loadClient();
    this.getCustomerRecords();
    console.log(this.clientId);
  }
  ngOnDestroy() {
    if (this.clientSubscription) this.clientSubscription.unsubscribe();
  }

  loadClient() {
    this.clientSubscription = this.clientService
      .getClient(this.clientId)
      .subscribe(data => {
        this.client = data;
      });
  }

  getCustomerRecords() {
    this.recordSubscription = this.customRecordService
      .getCustomerRecord(this.clientId)
      .subscribe(res => {
        this.customerRecord = res;
        console.log(this.customerRecord);
      });
  }

  contactCustomer() {
    this.callNumber
      .callNumber(this.client.phone, true)
      .then(res => console.log("Launch dialer!", res))
      .catch(err => console.log("Error launching dialer", err));
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
              this.navCtrl.navigateBack("/clients-list");
            } catch (error) {
              this.presentToast("Erro ao tentar apagar esta pessoa");
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
