import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FortifyOnDemandComponent } from './fortify-on-demand.component';

describe('FortifyOnDemandComponent', () => {
  let component: FortifyOnDemandComponent;
  let fixture: ComponentFixture<FortifyOnDemandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FortifyOnDemandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FortifyOnDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
