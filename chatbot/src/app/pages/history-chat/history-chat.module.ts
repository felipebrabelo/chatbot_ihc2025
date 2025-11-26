import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryChatPageRoutingModule } from './history-chat-routing.module';

import { HistoryChatPage } from './history-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryChatPageRoutingModule
  ],
  declarations: [HistoryChatPage]
})
export class HistoryChatPageModule {}
