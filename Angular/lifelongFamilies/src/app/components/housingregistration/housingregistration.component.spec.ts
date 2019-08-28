import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingregistrationComponent } from './housingregistration.component';

describe('HousingregistrationComponent', () => {
  let component: HousingregistrationComponent;
  let fixture: ComponentFixture<HousingregistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HousingregistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousingregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
