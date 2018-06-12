import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FodAppListMsgPanelComponent } from './fod-app-list-msg-panel.component';

describe('FodAppListMsgPanelComponent', () => {
  let component: FodAppListMsgPanelComponent;
  let fixture: ComponentFixture<FodAppListMsgPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FodAppListMsgPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FodAppListMsgPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
