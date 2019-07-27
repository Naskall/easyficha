import { Client } from "./../interfaces/client";

import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filtro"
})
export class FiltersPipe implements PipeTransform {
  transform(clients: Client[], text: string, column: string): any[] {
    if (text.length === 0) {
      return clients;
    }
    text = text.toLowerCase();
    return clients.filter(client => {
      return client[column].toLowerCase().includes(text);
      // client.logradouro.toLowerCase().includes(text) ||
      // client.cidade.toLowerCase().includes(text) ||
      // client.bairro.toLowerCase().includes(text) ||
      // client.cep.includes(text) ||
      // client.cpf.includes(text)
    });
  }
}
