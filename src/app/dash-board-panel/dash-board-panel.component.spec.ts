import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBoardPanelComponent } from './dash-board-panel.component';

describe('DashBoardPanelComponent', () => {
  let component: DashBoardPanelComponent;
  let fixture: ComponentFixture<DashBoardPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashBoardPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashBoardPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
