import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopRow } from './top-row';
import { Identity } from './identity/identity';
import { Progression } from './progression/progression';
import { Professions } from './professions/professions';

describe('TopRow', () => {
  let fixture: ComponentFixture<TopRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TopRow,
        Identity,
        Progression,
        Professions,
         ],
         }).compileComponents();

    fixture = TestBed.createComponent<TopRow>(TopRow);
    });

  it('should create', () => {
    expect(fixture.component).toBeTruthy();
    });
});
