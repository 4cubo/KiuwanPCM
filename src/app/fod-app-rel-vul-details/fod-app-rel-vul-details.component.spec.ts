import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FoDAppRelVulDetailsComponent } from './fod-app-rel-vul-details.component';

//import { FodAppRelVulListComponent } from './fod-app-rel-vul-list.component';

describe('FodAppRelVulDetailsComponent', () => {
  let component: FoDAppRelVulDetailsComponent;
  let fixture: ComponentFixture<FoDAppRelVulDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoDAppRelVulDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoDAppRelVulDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
