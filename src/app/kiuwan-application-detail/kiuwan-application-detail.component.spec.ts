import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { KiuwanApplicationDetailComponent } from './kiuwan-application-detail.component';


describe('ApplicationDetailComponent', () => {
  let component: KiuwanApplicationDetailComponent;
  let fixture: ComponentFixture<KiuwanApplicationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiuwanApplicationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiuwanApplicationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
