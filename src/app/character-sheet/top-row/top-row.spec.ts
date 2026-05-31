import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopRow } from './top-row';

describe('TopRow', () => {
  let fixture: ComponentFixture<TopRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopRow],
    }).compileComponents();

    fixture = TestBed.createComponent<TopRow>(TopRow);
  });

  it('should create', () => {
    expect(fixture.component).toBeTruthy();
  });
});
