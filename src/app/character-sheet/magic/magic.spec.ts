import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Magic } from './magic';

describe('Magic', () => {
  let fixture: ComponentFixture<Magic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Magic],
     }).compileComponents();

    fixture = TestBed.createComponent<Magic>(Magic);
   });

  it('should create', () => {
    expect(fixture.component).toBeTruthy();
   });
});
