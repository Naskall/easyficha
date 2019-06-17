import { AuthService } from "./../../../services/auth.service";
import { ClientService } from "./../../../services/client.service";
import { ToastController, LoadingController } from "@ionic/angular";
import { Component, OnInit, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subscription } from "rxjs";
import { Client } from "src/app/interfaces/client";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-clients-list",
  templateUrl: "./clients-list.page.html",
  styleUrls: ["./clients-list.page.scss"]
})
export class ClientsListPage implements OnInit {
  private loading: any;
  private clientId: string = null;
  private client: Client = {};
  private clientSubscription: Subscription;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private clientService: ClientService,
    private activeRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.clientId = this.activeRoute.snapshot.params["id"];
    if (this.clientId) this.loadClient();
  }

  ngOnInit() {}

  loadClient() {
    this.clientSubscription = this.clientService
      .getClient(this.clientId)
      .subscribe(data => {
        this.client = data;
      });
  }
  //https://jsonplaceholder.typicode.com/users

  // getClients() {
  //   return this.clientsCollection.snapshotChanges().pipe(
  //     map(actions => {
  //       return actions.map(a => {
  //         const data = a.payload.doc.data();
  //         const id = a.payload.doc.id;
  //         return { id, ...data };
  //       });
  //     })
  //   ); //Usa o snapshotChances por ter que pegar o ID do documento
  // }
}
