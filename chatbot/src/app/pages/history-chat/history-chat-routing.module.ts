import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoryChatPage } from './history-chat.page';

const routes: Routes = [
  {
    path: '',
    component: HistoryChatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryChatPageRoutingModule {}
