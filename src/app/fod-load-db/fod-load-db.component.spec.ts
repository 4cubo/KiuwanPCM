import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FodLoadDbComponent } from './fod-load-db.component';

describe('FodLoadDbComponent', () => {
  let component: FodLoadDbComponent;
  let fixture: ComponentFixture<FodLoadDbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FodLoadDbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FodLoadDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
