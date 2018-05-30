import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewSastlightClientRequestComponent } from './new-sastlight-client-request.component';

describe('NewSastlightClientRequestComponent', () => {
  let component: NewSastlightClientRequestComponent;
  let fixture: ComponentFixture<NewSastlightClientRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSastlightClientRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSastlightClientRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
