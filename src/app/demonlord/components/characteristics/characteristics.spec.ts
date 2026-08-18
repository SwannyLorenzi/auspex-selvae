import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacteristicsComponent } from './characteristics';
import { characterData } from '../../demonlord-data';

describe('CharacteristicsComponent', () => {
  let component: CharacteristicsComponent;
  let fixture: ComponentFixture<CharacteristicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacteristicsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacteristicsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput(
      'mainAttributes',
      characterData.mainAttributes
    );
    fixture.componentRef.setInput(
      'derivedAttributes',
      characterData.derivedAttributes
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display main attributes', () => {
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('Force');
    expect(container.textContent).toContain('11');
    expect(container.textContent).toContain('Intellect');
    expect(container.textContent).toContain('13');
  });

  it('should display derived attributes', () => {
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('Vitesse');
    expect(container.textContent).toContain('Santé');
  });
});
