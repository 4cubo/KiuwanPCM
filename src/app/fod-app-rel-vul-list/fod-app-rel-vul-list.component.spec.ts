import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FoDAppRelVulListComponent } from './fod-app-rel-vul-list.component';

//import { FodAppRelVulListComponent } from './fod-app-rel-vul-list.component';

describe('FodAppRelVulListComponent', () => {
  let component: FoDAppRelVulListComponent;
  let fixture: ComponentFixture<FoDAppRelVulListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoDAppRelVulListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoDAppRelVulListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
