import { AuthService } from "./../../../services/auth.service";
import { ActivatedRoute } from "@angular/router";
import { ClientService } from "./../../../services/client.service";
import { Component, OnInit } from "@angular/core";
import { Client } from "src/app/interfaces/client";
import {
  NavController,
  LoadingController,
  ToastController
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
  private loading: any;
  private clientSubscription: Subscription;
  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private clientService: ClientService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    this.clientId = this.activatedRoute.snapshot.params["id"];
    if (this.clientId) this.loadClient();
  }

  ngOnInit() {}
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
}
