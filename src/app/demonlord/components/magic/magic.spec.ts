import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MagicComponent } from './magic';
import { characterData } from '../../demonlord-data';

describe('MagicComponent', () => {
  let component: MagicComponent;
  let fixture: ComponentFixture<MagicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagicComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MagicComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('magic', characterData.magic);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all spells', () => {
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('Identification de substance');
    expect(container.textContent).toContain('Concoction de potion');
    expect(container.textContent).toContain('Perception de la magie');
  });

  it('should not group spells by tradition sections', () => {
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    const sections = container.querySelectorAll('.tradition-section');
    expect(sections.length).toBe(0);
  });
});
