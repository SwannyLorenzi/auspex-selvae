import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Identity } from './identity';

describe('Identity', () => {
  let fixture: ComponentFixture<Identity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Identity],
       }).compileComponents();

    fixture = TestBed.createComponent<Identity>(Identity);
    });

  it('should create', () => {
    expect(fixture.component).toBeTruthy();
    });
});
