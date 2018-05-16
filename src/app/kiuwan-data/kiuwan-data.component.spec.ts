import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiuwanDataComponent } from './kiuwan-data.component';

describe('KiuwanDataComponent', () => {
  let component: KiuwanDataComponent;
  let fixture: ComponentFixture<KiuwanDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiuwanDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiuwanDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
