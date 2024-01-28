import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeditationPageComponent } from './meditation-page.component';

describe('MeditationPageComponent', () => {
  let component: MeditationPageComponent;
  let fixture: ComponentFixture<MeditationPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeditationPageComponent]
    });
    fixture = TestBed.createComponent(MeditationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
