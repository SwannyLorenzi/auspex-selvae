import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CaracteristiquesComponent } from './caracteristiques';
import { characterData } from '../../demonlord-data';

describe('CaracteristiquesComponent', () => {
  let component: CaracteristiquesComponent;
  let fixture: ComponentFixture<CaracteristiquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaracteristiquesComponent],
      }).compileComponents();

    fixture = TestBed.createComponent(CaracteristiquesComponent);
    component = fixture.componentInstance;
   });

  it('should create', () => {
    expect(component).toBeTruthy();
   });

  it('should display main attributes', () => {
    component.mainAttributes = characterData.mainAttributes;
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('Force');
    expect(container.textContent).toContain('11');
    expect(container.textContent).toContain('Intellect');
    expect(container.textContent).toContain('13');
   });

  it('should display derived attributes', () => {
    component.derivedAttributes = characterData.derivedAttributes;
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('Vitesse');
    expect(container.textContent).toContain('Santé');
   });
});
