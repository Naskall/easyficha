import { NgModule } from "@angular/core";

import { FiltersPipe } from "./filters.pipe";

@NgModule({
  declarations: [FiltersPipe],
  exports: [FiltersPipe]
})
export class PipesModule {}
