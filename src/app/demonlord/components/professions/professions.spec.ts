import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfessionsComponent } from './professions';
import { characterData } from '../../demonlord-data';

describe('ProfessionsComponent', () => {
  let component: ProfessionsComponent;
  let fixture: ComponentFixture<ProfessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfessionsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all professions', () => {
    component.professions = characterData.professions;
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('Science');
    expect(container.textContent).toContain('Alchimiste');
  });
});
