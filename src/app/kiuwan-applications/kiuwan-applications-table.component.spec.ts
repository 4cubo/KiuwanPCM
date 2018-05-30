import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { KiuwanApplicationTableListComponent } from './kiuwan-applications-table.component';


describe('KiuwanApplicationTableListComponent', () => {
  let component: KiuwanApplicationTableListComponent;
  let fixture: ComponentFixture<KiuwanApplicationTableListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiuwanApplicationTableListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiuwanApplicationTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
