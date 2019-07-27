import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class ViacepProvider {
  constructor(public http: Http) {
    console.log("Se você está lendo isso, você ganhou... um grande nada! :)");
  }

  callService(cep: string): any {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json`);
  }
}
