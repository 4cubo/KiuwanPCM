import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDetailGraphComponent } from './dashboard-detail-graph.component';

describe('DashboardDetailGraphComponent', () => {
  let component: DashboardDetailGraphComponent;
  let fixture: ComponentFixture<DashboardDetailGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardDetailGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDetailGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
