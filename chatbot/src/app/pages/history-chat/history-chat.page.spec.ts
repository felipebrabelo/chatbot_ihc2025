import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryChatPage } from './history-chat.page';

describe('HistoryChatPage', () => {
  let component: HistoryChatPage;
  let fixture: ComponentFixture<HistoryChatPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
