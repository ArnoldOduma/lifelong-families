import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBusinessesComponent } from './view-businesses.component';

describe('ViewBusinessesComponent', () => {
  let component: ViewBusinessesComponent;
  let fixture: ComponentFixture<ViewBusinessesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBusinessesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBusinessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
