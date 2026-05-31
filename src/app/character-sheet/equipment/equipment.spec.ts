import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Equipment } from './equipment';

describe('Equipment', () => {
  let fixture: ComponentFixture<Equipment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Equipment],
     }).compileComponents();

    fixture = TestBed.createComponent<Equipment>(Equipment);
   });

  it('should create', () => {
    expect(fixture.component).toBeTruthy();
   });
});
