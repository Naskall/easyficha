import { RecordService } from "./../../../services/record.service";
import { AuthService } from "./../../../services/auth.service";
import { ActivatedRoute } from "@angular/router";
import { ClientService } from "./../../../services/client.service";
import { Component, OnInit } from "@angular/core";
import { Client } from "src/app/interfaces/client";
import { CustomerRecord } from "src/app/interfaces/record";
import {
  NavController,
  LoadingController,
  ToastController
} from "@ionic/angular";
import { Subscription } from "rxjs";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";

@Component({
  selector: "app-record-register",
  templateUrl: "./record-register.page.html",
  styleUrls: ["./record-register.page.scss"]
})
export class RecordRegisterPage implements OnInit {
  private loading: any;
  private clientId: string = null;
  private client: Client = {};
  private record: CustomerRecord = {};
  private recordId: string = null;
  private recordSubscription: Subscription;
  public fGroupRecord: FormGroup;

  constructor(
    private RecordService: RecordService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private clientService: ClientService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public fBuilderRecord: FormBuilder
  ) {
    if (!this.clientId) {
      this.fGroupRecord = this.fBuilderRecord.group({
        clientId: [Validators.compose([Validators.required])],
        recordCode: [null],
        recordDate: [Validators.compose([Validators.required])],
        recordValue: [Validators.compose([Validators.required])],
        maxPaymentDay: [Validators.compose([Validators.required])],
        recordDescription: [Validators.compose([Validators.required])],
        recordPaid: ["Não"]
      });
    }
  }

  ngOnInit() {
    this.clientId = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.clientId) this.loadClient();
    this.fillFields();
    console.log(this.clientId);
  }
  ngOnDestroy() {
    if (this.recordSubscription) this.recordSubscription.unsubscribe();
  }
  loadClient() {
    this.recordSubscription = this.clientService
      .getClient(this.clientId)
      .subscribe(data => {
        this.client = data;
      });
  }

  loadRecord() {
    this.recordSubscription = this.RecordService.getRecord(
      this.recordId
    ).subscribe(data => {
      this.record = data;
    });
  }

  createForm(record: CustomerRecord) {
    this.fGroupRecord = new FormGroup({
      clientId: new FormControl(this.clientId),
      recordCode: new FormControl(record.recordCode),
      maxPaymentDay: new FormControl(record.maxPaymentDay),
      recordValue: new FormControl(record.recordValue),
      sellDate: new FormControl(record.sellDate),
      description: new FormControl(record.description)
    });
  }
  fillFields() {
    this.fGroupRecord.controls["recordCode"].setValue(
      Math.floor(Math.random() * 65536)
    );
    this.fGroupRecord.controls["clientId"].setValue(this.clientId);
  }

  async saveRecord() {
    await this.presentLoading();
    if (this.recordId) {
      try {
        await this.RecordService.updateRecord(this.recordId, this.record);
        await this.loading.dismiss();
        this.navCtrl.navigateBack("/client-details/" + this.clientId);
        this.presentToast("Ficha atualizada.");
      } catch (error) {
        this.presentToast("Erro ao tentar atualizar ficha");
      }
    } else {
      this.record.createdAt = new Date().getTime();
      try {
        await this.RecordService.addRecord(this.fGroupRecord.value);
        await this.loading.dismiss();
        this.navCtrl.navigateBack("/client-details/" + this.clientId);
        this.presentToast("Uma nova ficha foi inclusa!");
      } catch (error) {
        this.presentToast("Erro ao incluir nova ficha");
        this.loading.dismiss();
      }
    }
  }
  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: "Estou carregando, só um momento..."
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
