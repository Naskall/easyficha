import { Injectable } from "@angular/core";
import { CustomerRecord } from "../interfaces/record";
import {
  AngularFirestoreCollection,
  AngularFirestore
} from "@Angular/fire/firestore";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { TouchSequence } from "selenium-webdriver";
@Injectable({
  providedIn: "root"
})
export class RecordService {
  private records: Observable<CustomerRecord[]>;
  private recordsCollection: AngularFirestoreCollection<CustomerRecord>;

  constructor(private afs: AngularFirestore) {
    this.recordsCollection = this.afs.collection<CustomerRecord>("Records");
  }
  getRecords() {
    //Pega todas as fichas do banco
    return this.recordsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  addRecord(record: CustomerRecord) {
    // Faz o Insert no banco
    return this.recordsCollection.add(record);
  }

  getRecord(id: string) {
    return this.recordsCollection.doc<CustomerRecord>(id).valueChanges();
  }

  getCustomerRecord(clientId: string) {
    return this.afs
      .collection("Records", ref => ref.where("clientId", "==", clientId))
      .snapshotChanges();
    // return this.afs
    //   .collection<CustomerRecord>("Records", ref => {
    //     return ref.where("clientId", "==", clientId);
    //   })
    //   .snapshotChanges();
  }

  updateRecord(id: string, record: CustomerRecord) {
    return this.recordsCollection.doc<CustomerRecord>(id).update(record);
  }
  deleteRecord(id: string) {
    return this.recordsCollection.doc(id).delete();
  }
}
