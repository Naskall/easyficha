import { AuthService } from "./auth.service";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@Angular/fire/firestore";
import { Injectable } from "@angular/core";
import { Client } from "../interfaces/client";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ClientService {
  private clientsCollection: AngularFirestoreCollection<Client>;
  private client: Client = {};
  private loading: any;
  authService: any;
  constructor(private afs: AngularFirestore) {
    this.clientsCollection = this.afs.collection<Client>("Clients");
  }

  getClients() {
    return this.clientsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    ); //Usa o snapshotChances por ter que pegar o ID do documento
  }
  addClient(client: Client) {
    return this.clientsCollection.add(client);
  }
  updateClient(id: string, client: Client) {
    return this.clientsCollection.doc<Client>(id).update(client);
  }
  getClient(id: string) {
    return this.clientsCollection.doc<Client>(id).valueChanges();
  }
  deleteClient(id: string) {
    return this.clientsCollection.doc(id).delete();
  }
}
