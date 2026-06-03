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

  it('should display magic traditions', () => {
    component.traditions = characterData.magic;
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('Alchimie');
    expect(container.textContent).toContain('Enchantement');
    expect(container.textContent).toContain('Divination');
    });

  it('should display spells with levels', () => {
    component.traditions = characterData.magic;
    fixture.detectChanges();
    const container = fixture.nativeElement as HTMLElement;
    expect(container.textContent).toContain('Identification de substance');
    expect(container.textContent).toContain('Concoction de potion');
    });
});
