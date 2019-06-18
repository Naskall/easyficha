import { Client } from "./../interfaces/client";

import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filtro"
})
export class FiltersPipe implements PipeTransform {
  transform(clients: Client[], text: string): Client[] {
    if (text.length === 0) {
      return clients;
    }
    text = text.toLocaleLowerCase();
    return clients.filter(Client => {
      console.log(clients);
    });
  }
}
