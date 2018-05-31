import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoDAppListComponent } from './fod-app-list.component';

describe('FortifyOnDemandComponent', () => {
  let component: FoDAppListComponent;
  let fixture: ComponentFixture<FoDAppListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoDAppListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoDAppListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
