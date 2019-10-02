import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostBusinessServiceComponent } from './post-business-service.component';

describe('PostBusinessServiceComponent', () => {
  let component: PostBusinessServiceComponent;
  let fixture: ComponentFixture<PostBusinessServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostBusinessServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostBusinessServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
