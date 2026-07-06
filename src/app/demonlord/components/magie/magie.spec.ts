import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MagieComponent } from './magie';
import { characterData } from '../../demonlord-data';

describe('MagieComponent', () => {
  let component: MagieComponent;
  let fixture: ComponentFixture<MagieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagieComponent],
      }).compileComponents();

    fixture = TestBed.createComponent(MagieComponent);
    component = fixture.componentInstance;
    });

  it('should create', () => {
    expect(component).toBeTruthy();
    });

  it('should display all spells', () => {
    fixture.componentRef.setInput('spells', characterData.magic.spells);
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('Identification de substance');
    expect(container.textContent).toContain('Concoction de potion');
    expect(container.textContent).toContain('Perception de la magie');
    });

  it('should not group spells by tradition sections', () => {
    fixture.componentRef.setInput('spells', characterData.magic.spells);
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    const sections = container.querySelectorAll('.tradition-section');
    expect(sections.length).toBe(0);
     });
});
