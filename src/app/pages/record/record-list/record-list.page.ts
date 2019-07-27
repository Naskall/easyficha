import { ActivatedRoute } from "@angular/router";
import { AuthService } from "./../../../services/auth.service";
import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { RecordService } from "./../../../services/record.service";
import {
  ToastController,
  LoadingController,
  AlertController,
  IonInfiniteScroll,
  ActionSheetController
} from "@ionic/angular";
import { Subscription } from "rxjs";
import { CustomerRecord } from "src/app/interfaces/record";

@Component({
  selector: "app-record-list",
  templateUrl: "./record-list.page.html",
  styleUrls: ["./record-list.page.scss"]
})
export class RecordListPage implements OnInit {
  private loading: any;
  public records = new Array<CustomerRecord>();
  public searchText: string = "";
  private recordId: string = null;
  private recordSubscription: Subscription;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(
    private toastCtrl: ToastController,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private recordService: RecordService,
    public alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController
  ) {
    this.loadData(event);
  }
  loadData(event) {
    setTimeout(() => {
      this.getRecords();
      event.target.complete();
      console.log("Done");
      if (this.records.length == 10) {
        event.target.disabled = true;
      }
    }, 1500);
  }

  ngOnDestroy() {
    if (this.recordSubscription) this.recordSubscription.unsubscribe();
  }
  ngOnInit() {}

  getRecords() {
    this.recordSubscription = this.recordService
      .getRecords()
      .subscribe(data => {
        this.records = data;
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
              this.recordService.deleteRecord(id);
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
