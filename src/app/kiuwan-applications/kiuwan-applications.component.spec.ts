import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { KiuwanApplicationListComponent } from './kiuwan-applications.component';

//import { ApplicationsComponent } from './applications.component';

describe('ApplicationListComponent', () => {
  let component: KiuwanApplicationListComponent;
  let fixture: ComponentFixture<KiuwanApplicationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiuwanApplicationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiuwanApplicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
