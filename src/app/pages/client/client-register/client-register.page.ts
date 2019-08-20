import { map } from "rxjs/operators";

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
import { Http } from "@angular/http";

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";

@Component({
  selector: "app-client-register",
  templateUrl: "./client-register.page.html",
  styleUrls: ["./client-register.page.scss"]
})
export class ClientRegisterPage implements OnInit {
  private loading: any;
  private clientSubscription: Subscription;
  public client: Client = {};
  public customerData: Client[];
  private clientId: string = null;
  public fGroupClient: FormGroup;

  constructor(
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    public http: Http,
    public fBuilderClient: FormBuilder
  ) {
    if (this.clientId) {
      this.fGroupClient = this.fBuilderClient.group({
        fullName: [null, Validators.compose([Validators.required])],
        cpf: [
          null,
          Validators.compose([Validators.required, Validators.minLength(3)])
        ],
        cep: [
          null,
          Validators.compose([Validators.required, Validators.minLength(8)])
        ],
        rua: [null],
        numero: [null],
        bairro: [null],
        cidade: [null],
        uf: [null],
        phone: [null, Validators.compose([Validators.required])],
        maxValue: [null, Validators.compose([Validators.required])],
        maxPaymentDay: [null, Validators.compose([Validators.required])],
        timeToPush: [null, Validators.compose([Validators.required])],
        pushType: [null, Validators.compose([Validators.required])]
      });
    } else {
      this.fGroupClient = this.fBuilderClient.group({
        fullName: [null, Validators.compose([Validators.required])],
        cpf: [
          null,
          Validators.compose([Validators.required, Validators.minLength(3)])
        ],
        cep: [
          null,
          Validators.compose([Validators.required, Validators.minLength(8)])
        ],
        rua: [null],
        numero: [null],
        bairro: [null],
        cidade: [null],
        uf: [null],
        phone: [null, Validators.compose([Validators.required])],
        maxValue: [null, Validators.compose([Validators.required])],
        maxPaymentDay: [null, Validators.compose([Validators.required])],
        timeToPush: [null, Validators.compose([Validators.required])],
        pushType: [null, Validators.compose([Validators.required])]
      });
    }
  }

  createForm(client: Client) {
    this.fGroupClient = new FormGroup({
      fullName: new FormControl(client.fullName),
      cpf: new FormControl(client.cpf),
      cep: new FormControl(client.cep),
      rua: new FormControl({ value: client.logradouro, disabled: true }),
      bairro: new FormControl({ value: client.bairro, disabled: true }),
      numero: new FormControl(client.numero),
      cidade: new FormControl({ value: client.cidade, disabled: true }),
      uf: new FormControl({ value: client.uf, disabled: true }),
      phone: new FormControl(client.phone),
      maxValue: new FormControl(client.maxValue),
      maxPaymentDay: new FormControl(client.maxPaymentDay),
      timeToPush: new FormControl(client.timeToPush),
      pushType: new FormControl(client.pushType)
    });
  }

  ngOnInit() {
    this.clientId = this.activatedRoute.snapshot.paramMap.get("id");
    this.getCustomerById();
    this.fillFields();
    console.log(this.clientId);
  }

  ngOnDestroy() {
    if (this.clientSubscription) this.clientSubscription.unsubscribe();
  }

  // loadClient() {
  //   this.clientSubscription = this.clientService
  //     .getCustomer(this.client.id)
  //     .subscribe(data => {
  //       this.customer = data;
  //       console.log("Customer Id:" + this.clientId);
  //       console.log("Dados do cliente:" + this.customer);
  //     });
  // }

  getCustomerById() {
    this.clientSubscription = this.clientService
      .getCustomerData(this.clientId)
      .subscribe(async data => {
        this.customerData = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Client;
        });
        console.log(this.customerData);
      });
  }

  fillFields() {
    if (this.clientId) {
      this.fGroupClient.get("fullName").setValue(this.client.fullName);
      this.fGroupClient.get("cpf").setValue(this.client.cpf);
      this.fGroupClient.get("cep").setValue(this.client.cep);
      this.fGroupClient.get("rua").setValue(this.client.logradouro);
      this.fGroupClient.get("numero").setValue(this.client.numero);
      this.fGroupClient.get("bairro").setValue(this.client.bairro);
      this.fGroupClient.get("cidade").setValue(this.client.cidade);
      this.fGroupClient.get("uf").setValue(this.client.uf);
      this.fGroupClient.get("phone").setValue(this.client.phone);
      this.fGroupClient.get("maxValue").setValue(this.client.maxValue);
      this.fGroupClient
        .get("maxPaymentDay")
        .setValue(this.client.maxPaymentDay);
      this.fGroupClient.get("timeToPush").setValue(this.client.timeToPush);
      this.fGroupClient.get("pushType").setValue(this.client.pushType);
      console.log(this.client.fullName);
    } else {
      console.log("Falha ao preencher campos");
    }
  }

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
        await this.clientService.addClient(this.fGroupClient.value);
        await this.loading.dismiss();
        this.navCtrl.navigateBack("/clients-list");
        this.presentToast("Pronto, novo cliente registrado!");
        console.log(this.client);
      } catch (error) {
        this.presentToast("Erro ao tentar salvar");
        this.loading.dismiss();
      }
    }
  }

  /*Faz a busca do endereço pelo CEP*/
  searchCep() {
    const cepValue = this.fGroupClient.controls["cep"].value;
    const isValid = this.fGroupClient.controls["cep"].valid;
    if (isValid) {
      this.http
        .get(`https://viacep.com.br/ws/${cepValue}/json/`)
        .pipe(map(res => res.json()))
        .subscribe(data => {
          this.fillAddress(data);
        });
    }
    // this.viacep.callService(this.cep).subscribe(data => {
    //   this.client = data;
    //   this.fillAddress(this.client.logradouro);
    //   console.log(data);
    //});
  }
  fillAddress(dados) {
    this.fGroupClient.controls["rua"].setValue(dados.logradouro);
    this.fGroupClient.controls["bairro"].setValue(dados.bairro);
    this.fGroupClient.controls["cidade"].setValue(dados.localidade);
    this.fGroupClient.controls["uf"].setValue(dados.uf);
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
