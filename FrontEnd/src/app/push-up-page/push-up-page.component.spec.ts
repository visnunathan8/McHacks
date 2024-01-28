import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PushUpPageComponent } from './push-up-page.component';

describe('PushUpPageComponent', () => {
  let component: PushUpPageComponent;
  let fixture: ComponentFixture<PushUpPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PushUpPageComponent]
    });
    fixture = TestBed.createComponent(PushUpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
