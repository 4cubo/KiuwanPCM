import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FoDAppRelListComponent } from './fod-app-rel-list.component';

//import { FodAppRelListComponent } from './fod-app-rel-list.component';

describe('FodAppRelListComponentComponent', () => {
  let component: FoDAppRelListComponent;
  let fixture: ComponentFixture<FoDAppRelListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoDAppRelListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoDAppRelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
