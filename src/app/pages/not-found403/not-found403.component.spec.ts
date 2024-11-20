import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFound403Component } from './not-found403.component';

describe('NotFound403Component', () => {
  let component: NotFound403Component;
  let fixture: ComponentFixture<NotFound403Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFound403Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotFound403Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
