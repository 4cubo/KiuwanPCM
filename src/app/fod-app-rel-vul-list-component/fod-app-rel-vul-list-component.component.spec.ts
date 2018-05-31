import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FodAppRelVulListComponentComponent } from './fod-app-rel-vul-list-component.component';

describe('FodAppRelVulListComponentComponent', () => {
  let component: FodAppRelVulListComponentComponent;
  let fixture: ComponentFixture<FodAppRelVulListComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FodAppRelVulListComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FodAppRelVulListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
